import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login  } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error , setError] = useState("")
    const {register , handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center md:w-full md:mx-0 my-10 w-[90%] mx-auto">
      <div
        className={`mx-auto w-full max-w-lg bg-transparent border-2 shadow-[0px_0px_25px_cyan,0px_0px_25px_white] shadow-cyan-400/40 border-white rounded-xl bg-gray-100 rounded-xl p-10 border-2 border-white`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px] text-xl text-cyan-400 font-semibold space-y-2">
            <Logo className="rounded-full" />
            BlogSphere
          </span>
        </div>
        <h2 className="text-center sm:text-2xl text-xl font-bold leading-tight text-nowrap">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center sm:text-base text-sm text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline hover:text-cyan-400"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5 ">
            <Input
              className="focus:border-4 text-gray-800 "
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              className="focus:border-4 text-gray-800 "
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              className="focus:border-4 "
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              type="submit"
              className="w-full text-gray-700 font-semibold bg-cyan-400"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
