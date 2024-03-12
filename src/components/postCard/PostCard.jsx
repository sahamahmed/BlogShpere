/* eslint-disable react/prop-types */
import { useState } from "react";
import appwriteService from "../../appwrite/config";
import { Link } from "react-router-dom";
import "./PostCard.css";

function PostCard({ $id, title, featuredImage , className=""}) {
  const [showButton, setShowButton] = useState(false);
 
  return (
    <Link to={`/post/${$id}`} className="relative">
      <div className={`w-full flex flex-col items-center text-white h-80 border-solid border-2 border-cyan-400 rounded-xl p-2 shadow-lg shadow-cyan-400/40 transition duration-1000 ease hover:scale-110 hover:bg-gradient-to-b from-cyan-400 to-transparent ${className}`}
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
        >
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-48 mb-4 rounded-xl"
        />
        <div className="w-full opacity-90 p-2">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        {showButton && (
          <button
            className={`absolute bottom-0 right-25 px-4 py-1 my-2 bg-teal-500 text-white rounded-md shadow ${
              showButton ? "opacity-100 scale-100" : "opacity-0 scale-0"
            } transition-opacity duration-300 transition-transform hover:bg-cyan-700`}
          >
            View Post
          </button>
        )}
      </div>
    </Link>
  );
}

export default PostCard;
