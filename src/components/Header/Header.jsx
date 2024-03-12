import { Link } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useState , useEffect } from "react";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  
  const [isNavOpen , setIsNavOpen ] = useState(false)
  const toggleNav = () => {
    setIsNavOpen((prevState) => !prevState);
};

 useEffect(() => {
   const handleClickOutside = (event) => {
     if (!event.target.closest(".nav-container")) {
       setIsNavOpen(false);
     }
   };

   window.addEventListener("click", handleClickOutside);
   return () => {
     window.removeEventListener("click", handleClickOutside);
   };
 }, []);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },

    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className="py-3 border-b-2 border-b-cyan-400 bg-gradient-to-r from-gray-500 to-gray-400 text-white h-20 md:h-24">
      <Container>
        <nav className="lg:flex justify-center items-center">
          {/* MOBILE DISPLAY */}
          <div className="nav-container flex flex-row justify-between items-center lg:hidden relative">
            <div className="mr-6">
              <Link
                to="/"
                className="flex flex-row items-center justify-center gap-4"
              >
                <Logo className="w-12 h-12" />
                <h1 className="text-cyan-400 tracking-widest drop-shadow-[1px_2px_3px_rgba(0,255,255,0.5)] font-bold text-lg">
                  BlogSphere
                </h1>
              </Link>
            </div>
            <button onClick={toggleNav}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {isNavOpen && (
              <ul
                className={`transition-transform ease-in-out transform ${
                  isNavOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                } flex flex-col text-lg items-center justify-center gap-3 absolute top-full right-0 bg-gray-500 p-2 rounded-md shadow-md z-10`}
                onClick={toggleNav}
              >
                {navItems.map((item) =>

                  item.active ? (
                    <li key={item.name}>
                      <NavLink
                        to={item.slug}
                        className={({ isActive }) =>
                          ` ${
                            isActive
                              ? "p-3 border-cyan-400 border-b-4 rounded-lg text-cyan-400"
                              : "text-white-700"
                          } px-0 py-2 tracking-wider transition rounded-lg duration-200 ease-in-out font-semibold hover:border-cyan-400 hover:border-b-4 hover:text-cyan-400`
                        }
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ) : null
                )}
                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* DESKTOP DISPLAY : */}

          <div className=" lg:mr-8 lg:block hidden ">
            <Link to="/" className="flex justify-center items-center gap-3">
              <Logo className="w-16 h-16" />
              <h1 className=" text-cyan-400 tracking-widest drop-shadow-[1px_2px_3px_rgba(0,255,255,0.5)]  font-bold text-2xl">
                BlogSphere
              </h1>
            </Link>
          </div>
          <ul
            className={`lg:flex ml-auto items-center justify-center gap-16 hidden `}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      ` ${
                        isActive
                          ? "p-3  border-cyan-400 border-b-4 rounded-lg text-cyan-400 "
                          : "text-white-700"
                      } px-0 py-2 tracking-wider transition rounded-lg duration-200 ease-in-out font-semibold  hover:border-cyan-400  hover:border-b-4 hover:text-cyan-400  `
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
