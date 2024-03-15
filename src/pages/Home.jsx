import { useEffect , useState } from "react";
import appwriteService from "../appwrite/config";
import { Container} from "../components";
import { useSelector , useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addpost } from "../store/postSlice";
import { Loadingbar } from "../components/LoadingBar";
import Notification from "../components/notification/Notification";
import PostCard from "../components/postCard/PostCard"
import {Input } from "../components";
import { FcSearch } from "react-icons/fc";
import { TypeEffect } from "../components/TypeEffect";

function Home() {
  const authStatus = useSelector((state) => state.auth.status);
  const userDetails = useSelector((state) => state.auth.userData);
  const userName = userDetails?.name.split(" ")[0]
  const postData = useSelector((state) => state.post.postData);



  const dispatch = useDispatch();

  const [showNotification, setShowNotification] = useState(false);
  const { register, handleSubmit } = useForm();
  const [posts, setposts] = useState([]);
  const [searched, setSearched] = useState(false);

  const fetchSearch = (data) => {
    const searchTerm = data.searchpost.toLowerCase();
    const filteredPosts = postData.filter((post) =>
      post.title.toLowerCase().includes(searchTerm)
    );
    setposts(filteredPosts);
    setSearched(true);
    // console.log("filtered posts:", filteredPosts);
  };

  useEffect(() => {
    const hasVisitedBefore = sessionStorage.getItem("visitedHomePage");
    if (!hasVisitedBefore) {
      setShowNotification(true);
      sessionStorage.setItem("visitedHomePage", true);
    }
  }, []);


  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        dispatch(addpost(posts.documents));
      }
    });
  }, [dispatch]);

  if (!postData && authStatus) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold text-gray-50">
                please wait while we fetch the posts...
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  } else if (authStatus === false) {
    return (
      <div className="my-24  space-y-4 ">
        <Loadingbar />
        <h1 className=" md:text-3xl font-bold text-white text-center text-2xl xl:text-5xl lg:text-4xl ">
          Welcome to{" "}
          <span className="text-teal-500 hover:text-teal-600 hover:cursor-pointer">
            {" "}
            BlogSphere
          </span>
        </h1>
        <TypeEffect />

        <h1 className="md:text-2xl text-xl text-white text-center font-bold xl:text-5xl lg:text-4xl">
          <Link
            to="/login"
            className=" md:text-3xl text-2xl hover:border-b-2 border-b-white transition ease-in-out xl:text-5xl lg:text-4xl"
          >
            Login
          </Link>{" "}
          to view blogs
        </h1>
      </div>
    );
  } else if (searched && posts.length === 0) {
    return (
      <div className="w-full py-8">
        <Loadingbar />
        <TypeEffect />

        <Container>
          <form
            onSubmit={handleSubmit(fetchSearch)}
            className="m-6 p-2 mx-auto w-[70%] md:w-[50%] flex  items-center justify-center rounded-xl outline-none border-none"
          >
            <Input
              className=" w-2/3 rounded-tr-none rounded-br-none px-2 md:text-2xl border-0 focus:bg-slate-200 bg-slate-200 text-slate-800 h-12 min-h-8 md:h-16"
              placeholder="Search Any Post"
              {...register("searchpost")}
            />
            <button className=" border-cyan-500  bg-cyan-500 rounded-tr-2xl rounded-br-2xl  py-0 rounded-none md:w-20 cursor-pointer md:h-16 w-1/5  min-h-8 h-12 flex items-center justify-center">
              <FcSearch className="md:h-12 h-8 w-9/12" />
            </button>
          </form>
        </Container>
        <Container>
          <h1 className="text-2xl font-bold text-center text-gray-50 my-12">
            No results found for your search.
          </h1>
        </Container>
      </div>
    );
  } else if (searched && posts.length > 0) {
    return (
      <div className="w-full py-8">
        <Loadingbar />
        <TypeEffect />

        <Container>
          <form
            onSubmit={handleSubmit(fetchSearch)}
            className="m-6 p-2 mx-auto w-[70%] md:w-[50%] flex  items-center justify-center rounded-xl outline-none border-none"
          >
            <Input
              className=" w-2/3 rounded-tr-none rounded-br-none px-2 md:text-2xl border-0 focus:bg-slate-200 bg-slate-200 text-slate-800 h-12 min-h-8 md:h-16"
              placeholder="Search Any Post"
              {...register("searchpost")}
            />
            <button className=" border-cyan-500  bg-cyan-500 rounded-tr-2xl rounded-br-2xl  py-0 rounded-none md:w-20 cursor-pointer md:h-16 w-1/5  min-h-8 h-12 flex items-center justify-center">
              <FcSearch className="md:h-12 h-8 w-9/12" />
            </button>
          </form>
        </Container>
        <Container>
          <div className="md:flex md:flex-wrap md:gap-x-5 md:gap-y-5 gap-y-3 md:justify-center grid grid-cols-1">
            {posts?.map((post) => (
              <div
                key={post.$id}
                className="p-2 md:w-1/3 md:mx-0 w-4/5 sm:w-1/2 mx-auto"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      {showNotification && (
        <Notification message={`Welcome back, ${userName}`} />
      )}
      
      <TypeEffect />
      <div className="w-full py-8">
        <Loadingbar />
        <Container>
          <form
            onSubmit={handleSubmit(fetchSearch)}
            className="m-6 p-2 mx-auto w-[70%] md:w-[50%] flex  items-center justify-center rounded-xl outline-none border-none"
          >
            <Input
              className=" w-2/3 rounded-tr-none rounded-br-none px-2 md:text-2xl border-0 focus:bg-slate-200 bg-slate-200 text-slate-800 h-12 min-h-8 md:h-16"
              placeholder="Search Any Post"
              {...register("searchpost")}
            />
            <button className=" border-cyan-500  bg-cyan-500 rounded-tr-2xl rounded-br-2xl  py-0 rounded-none md:w-20 cursor-pointer md:h-16 w-1/5  min-h-8 h-12 flex items-center justify-center">
              <FcSearch className="md:h-12 h-8 w-9/12" />
            </button>
          </form>
        </Container>
        <Container>
          <div className="md:flex md:flex-wrap md:gap-x-5 md:gap-y-5 gap-y-3 md:justify-center grid grid-cols-1">
            {postData.map((post) => (
              <div
                key={post.$id}
                className="p-2 md:w-1/3 md:mx-0 w-4/5 sm:w-1/2 mx-auto"
              >
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
export default Home;









 


