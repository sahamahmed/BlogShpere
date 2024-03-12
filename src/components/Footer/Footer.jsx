import { Link } from "react-router-dom";
import Logo from "../Logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-gray-800 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-4 ">
        <div className="-m-6 md:grid md:grid-cols-5 grid grid-cols-2 md:text-nowrap ">
          {/* logo and title */}
          <div className=" p-6 md:w-1/2 lg:w-5/12 mr-4 md:col-span-2">
            <div className="flex h-full flex-col justify-between ">
              <div className="mb-2 inline-flex items-center">
                <Logo className=" md:w-28 md:h-28 w-16 h-16" />
              </div>
              <h1 className=" text-cyan-400 tracking-widest drop-shadow-[1px_2px_3px_rgba(0,255,255,0.5)] font-bold md:text-3xl text-xl">
                BlogSphere
              </h1>
              <div>
                <p className="text-sm text-gray-100">
                  &copy; Copyright 2023. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          {/* company */}
          <div className="w-full md:p-6 md:w-1/2 lg:w-2/12 p-4">
            <div className="h-full">
              <h3 className="tracking-px md:mb-9  text-xs font-bold uppercase text-cyan-700 mb-4">
                Company
              </h3>
              <ul>
                <li className="mb-2 md:mb-4">
                  <Link
                    className=" text-sm font-medium text-gray-100 hover:text-cyan-400"
                    to="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-2 md:mb-4">
                  <Link
                    className=" text-sm font-medium text-gray-100 hover:text-cyan-400"
                    to="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-2 md:mb-4">
                  <Link
                    className=" text-sm font-medium text-gray-100 hover:text-cyan-400"
                    to="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-sm font-medium text-gray-100 hover:text-cyan-400"
                    to="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* support */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px md:mb-9  text-xs font-bold uppercase text-cyan-700 mb-4">
                Support
              </h3>
              <ul>
                <li className="mb-2 md:mb-4">
                  <Link
                    className=" text-sm font-medium text-gray-100 hover:text-cyan-400"
                    to="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-2 md:mb-4">
                  <Link
                    className=" text-sm font-medium text-gray-100 hover:text-cyan-400"
                    to="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-2 md:mb-4">
                  <Link
                    className=" text-sm font-medium text-gray-100 hover:text-cyan-400"
                    to="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-sm font-medium text-gray-100 hover:text-cyan-400"
                    to="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* legals */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px md:mb-9  text-xs font-semibold uppercase text-cyan-700 mb-4">
                Legals
              </h3>
              <ul>
                <li className="mb-2 md:mb-4">
                  <Link
                    className=" text-sm font-medium text-gray-100 hover:text-cyan-400"
                    to="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-2 md:mb-4">
                  <Link
                    className=" text-sm font-medium text-gray-100 hover:text-cyan-400"
                    to="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-sm font-medium text-gray-100 hover:text-cyan-400"
                    to="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;




