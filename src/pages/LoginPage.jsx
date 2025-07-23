import React from "react";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import Simple from "../components/Simple";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex font-['Helvetica_Now_Display'] bg-[#191512] overflow-hidden">
      {/* Left Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 flex justify-center items-center bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('loginimg.png')" }} // replace with 'loginimg.png' if that's the one you want
      >
        <Simple />
      </motion.div>

      {/* Right Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="w-1/2 bg-[#2C2C2C] text-white px-16 py-12 flex flex-col justify-center"
      >
        <div className="mb-10">
          <h2 className="text-4xl font-bold flex items-center gap-2">
            <img
              src="https://user-gen-media-assets.s3.amazonaws.com/gpt4o_images/59167acc-cfd7-4f04-89e3-143e995c30ea.png"
              alt="logo"
              className="w-14 h-10"
            />
            Sleepy <span className="text-[#C49A6C]">OWL</span>
          </h2>
        </div>

        <h3 className="text-2xl mb-4">
          Welcome Back, Please login to your account
        </h3>

        <form className="flex flex-col gap-6">
          <div>
            <label className="block mb-1 text-sm">Email address</label>
            <input
              type="email"
              defaultValue="jubaer@gmail.com"
              className="w-full px-4 py-2 rounded bg-[#3A3A3A] text-white focus:outline-none"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-sm">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 rounded bg-[#3A3A3A] text-white focus:outline-none"
            />
            <FaEye className="absolute right-3 top-10 text-gray-400 cursor-pointer" />
          </div>

          <div className="flex justify-between text-sm">
            <label>
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-[#C49A6C]">
              Forgot password?
            </a>
          </div>

          <button className="bg-white text-[#2C2C2C] py-2 rounded text-lg font-semibold">
            Sign In
          </button>

          <button className="flex items-center justify-center gap-2 border py-2 rounded border-gray-500">
            <FaGoogle /> Sign in with Google
          </button>
        </form>

        <p className="mt-8 text-sm text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[#C49A6C] font-semibold cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
