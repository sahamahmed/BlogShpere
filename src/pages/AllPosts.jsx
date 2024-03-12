import { useEffect } from "react";
import { Container } from "../components";
import PostCard from "../components/postCard/PostCard";
import appwriteService from "../appwrite/config";
import { useSelector, useDispatch } from "react-redux";
import { addpost } from "../store/postSlice";
import { Loadingbar } from "../components/LoadingBar";
function AllPosts() {
  const dispatch = useDispatch()
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {   
        dispatch(addpost(posts.documents))
      }
    });
  }, [dispatch]);
    const postData = useSelector((state) => state.post.postData); 

  if (!Array.isArray(postData)) {
    return (
      <div className=" text-white text-center text-2xl my-48">
        Please wait while we fetch posts..
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Loadingbar />
      <Container>
        <h1 className="text-white text-2xl text-center font-normal mb-6">
          ALL POSTS
        </h1>
        <div className="md:flex flex-wrap gap-x-5 md:gap-y-5 justify-center grid grid-cols-1 gap-y-3">
          {postData.map((post) => (
            <div
              key={post.$id}
              className="p-2 md:w-1/4 md:mx-0 w-4/5 sm:w-1/2 mx-auto"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
  
}

export default AllPosts;
