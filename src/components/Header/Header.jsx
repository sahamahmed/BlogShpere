import { Link } from "react-router-dom";
import { Container, Logo, LogoutBtn } from "../index";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// import { useState , useEffect } from "react";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";


function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  
 const [open, setOpen] = React.useState(false);

 const toggleDrawer = (newOpen) => () => {
   setOpen(newOpen);
 };

 

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


  const DrawerList = (
    <Box
      sx={{ width: 200 }}
      role="presentation"
      onClick={() => toggleDrawer(false)}
      className="bg-slate-500 h-full text-white font-bold"
    >
      <List>
        {navItems
          .filter((item) => item.active) // Filter only active items
          .map((item) => (
            <NavLink
              to={item.slug}
              key={item.name}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "p-3 border-cyan-400 border-b-4 rounded-lg text-cyan-400"
                    : "text-white-700"
                } px-0 py-2 tracking-wider transition rounded-lg duration-200 ease-in-out font-semibold hover:border-cyan-400 hover:border-b-4 hover:text-cyan-400`
              }
            >
              <ListItem key={item.name} disablePadding>
                <ListItemButton>
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
      </List>
      <Divider />
      <List>
        <ListItem className="flex justify-start items-start ">
          
            {authStatus && <LogoutBtn className="text-lg px-2" />}
         
        </ListItem>
      </List>
    </Box>
  );

  return (
    <header className="py-3 border-b-2 border-b-cyan-400 bg-gradient-to-r from-gray-500 to-gray-400 text-white h-20 md:h-24">
      <Container>
        <nav className="lg:flex justify-between items-center">

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
            <div className="lg:hidden">
              <Button onClick={toggleDrawer(true)}>
                <MenuIcon className="text-white font-semibold text-lg"/>
              </Button>
              <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
                {DrawerList}
              </Drawer>
            </div>
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
