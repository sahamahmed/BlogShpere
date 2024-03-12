/* eslint-disable react/prop-types */
import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector , useDispatch } from "react-redux";
import { addpost } from "../../store/postSlice";
import Notification from "../notification/Notification";
import { MdOutlineAttachFile } from "react-icons/md";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },     
    });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [notification , setNotification] = useState("")


  const submit = async (data) => {  
    
    if (post) {
      const file = data.image[0]                        
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        appwriteService.deleteFile(post.featuredImage);
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        dispatch(addpost(dbPost));
        setNotification("Edit succesfull");
      setTimeout(() => {
        navigate(`/all-posts`);
      }, 2000);
      }
    } else {
      const file = await appwriteService.uploadFile(data.image[0]);

      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({
          ...data,
          userId: userData.$id,
        });

        if (dbPost) {
          dispatch(addpost(dbPost));
          setNotification("Post creation succesfull");
           setTimeout(() => {
             navigate(`/all-posts`);
           }, 2000);

        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

 return (
   <>
     {notification && <Notification message={notification} />}
     <form onSubmit={handleSubmit(submit)} className="md:flex flex-wrap grid grid-cols-1 md:items-start md:justify-center">
       <div className="md:w-2/3 px-2 w-full">
         <Input
           label="Title :"
           placeholder="Title"
           className="mb-4 bg-transparent text-white"
           {...register("title", { required: true })}
         />
         <Input
           label="Slug :"
           placeholder="Slug"
           className="mb-4 bg-transparent cursor-not-allowed text-white"
           disabled={true}
           {...register("slug", { required: true })}
           onInput={(e) => {
             setValue("slug", slugTransform(e.currentTarget.value), {
               shouldValidate: true,
             });
           }}
         />
         <RTE
           label="Content :"
           name="content"
           control={control}
           defaultValue={getValues("content")}
         />    
       </div>
       <div className="md:w-1/3 px-2 w-full mt-4 md:mt-0">
         <label className=" text-white font-semibold mb-1">
           Featured Image:
           <div className="border border-cyan-400 cursor-pointer text-white w-[100%] rounded-lg py-2 mb-4 mt-2">
             <span className="  px-2 hover:text-white hover:font-sm flex flex-row items-center ">
               <span className="text-slate-200">Choose File</span>
               <MdOutlineAttachFile className=" text-white " />
             </span>
             <Input
               type="file"
               className="mb-4 hidden"
               accept="image/png, image/jpg, image/jpeg, image/gif"
               {...register("image", { required: !post })}
             />
           </div>
         </label>
         {post && (
           <div className="w-full mb-4">
             <img
               src={appwriteService.getFilePreview(post.featuredImage)}
               alt={post.title}
               className="rounded-lg"
             />
           </div>
         )}
         <Select
           options={["active", "inactive"]}
           label="Status"
           className="mb-4 bg-transparent border-cyan-400 outline-none"
           {...register("status", { required: true })}
         />
         <div className=" flex items-center justify-center">
           <Button
             type="submit"
             bgColor={post ? "bg-green-500" : "bg-cyan-400"}
             className="w-full font-semibold text-gray-700  hover:font-bold"
           >
             {post ? "Update" : "Submit"}
           </Button>
         </div>
       </div>
     </form>
   </>
 );
}
