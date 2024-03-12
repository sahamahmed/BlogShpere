import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { MdDeleteOutline } from "react-icons/md";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { MdOutlineEdit } from "react-icons/md";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const backtoPosts = ()=>{
    navigate("/all-posts")
  }
  return post ? (
    <div className="py-8 text-white">
      <div className=" flex flex-row justify-between items-center">
        <div>
          <IoReturnUpBackOutline
            className=" text-white rounded-[50%] md:w-16 md:h-16 cursor-pointer md:ml-8 md:mb-4 ml-4 h-12 w-12"
            onClick={backtoPosts}
          />
        </div>
        {isAuthor && (
          <>
            <div className=" flex flex-row gap-3 mr-8  ">
              <Link to={`/edit-post/${post.$id}`}>
                <button
                  className="text-white rounded-[10%] md:w-28 h-full cursor-pointer font-semibold text-lg bg-cyan-500
                px-2 py-1 hidden md:block shadow-sm shadow-black hover:bg-cyan-600 "
                >
                  {" "}
                  EDIT
                </button>
              </Link>

              <button
                onClick={deletePost}
                className="text-white rounded-[10%] md:w-28 h-full cursor-pointer font-semibold text-lg bg-red-500 hover:bg-red-600
                px-2 py-1 hidden md:block shadow-sm shadow-black"
              >
                {" "}
                DELETE
              </button>
            </div>
            <div className="flex flex-row gap-4 items-center justify-center mb-1 mr-4 md:hidden">
              <Link to={`/edit-post/${post.$id}`}>
                <MdOutlineEdit className="h-12 w-12 bg-cyan-500 text-white md:hidden rounded-full p-1 text-center" />
              </Link>

              <MdDeleteOutline
                className="h-12 w-12 bg-red-500 text-white md:hidden rounded-full p-1 text-center"
                onClick={deletePost}
              />
            </div>
          </>
        )}
      </div>
      <Container>
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
          />
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="browser-css">{parse(post.content)}</div>
      </Container>
    </div>
  ) : null;
}
