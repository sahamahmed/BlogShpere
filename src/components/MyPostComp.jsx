import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PostCard from "./postCard/PostCard";
import Container from "./Container/Container";


function MyPostComp() {
  const userData = useSelector((state) => state.auth.userData);
  const postData = useSelector((state) => state.post.postData);
  const [myposts, setMyposts] = useState([]);

useEffect(() => {
  if (postData && userData && userData.$id) {
    const filteredPosts = postData.filter(
      (post) => post.userId === userData.$id
    );
    setMyposts(filteredPosts);
    console.log("my component ka use effect ran");
    console.log(filteredPosts);
  }
}, [postData, userData]);


  
  if (!myposts || myposts.length === 0) {
    return (
      <div className="text-white flex flex-col gap-3 justify-center items-center my-28">
        <h1 className=" text-2xl font-normal">You donot have any posts yet</h1>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-white text-2xl text-center font-normal mb-4">
          YOUR POSTS
        </h1>
        <div className="md:flex flex-wrap gap-x-5 md:gap-y-5 justify-center grid grid-cols-1 gap-y-3">
          {myposts.map((post) => (
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

export default MyPostComp;

