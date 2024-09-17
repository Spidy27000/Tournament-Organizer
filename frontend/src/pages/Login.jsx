import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const navigate_page_to = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const handleChange = (e) => {
    const { id, value } = e.target;
    setformData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = Validate(formData);
    setError(validate);
    if (Object.keys(validate).length === 0) {
      console.log("ok");
      console.log(formData);
      navigate_page_to('/dashboard')
    } else {
      console.log("Error uploading data");
      console.log(validate);
    }
  };

  const Validate = (data) => {
    const error = {};
    if (!data.email.trim()) {
      error.email = "Please enter email id";
    } else if (!data.password) {
      error.password = "Please enter Password";
    }
    return error;
  };

  return (
    <div className=" flex items-center justify-center h-screen w-screen bg-[#f1efe7]">
      <div className="w-[60rem] h-[35rem]  bg-[#f2ead6] shadow-xl border-solid border-2 border-[#dadada] rounded-[1rem] flex items-center flex-row">
        <div className=" h-full flex-1 flex justify-center items-center">
          <div className=" w-[68%] flex flex-col justify-center gap-2 h-[80%] ">
            <div className=" leading-[3rem] text-[2.8rem] font-archivo items-start pt-8">
              <h1>Welcome Back!</h1>
            </div>
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col justify-center gap-2 h-full"
            >
              <label className="">Email</label>
              <input
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              {error.email && (
                <span className="text-[0.9rem] text-red-400">
                  {error.email}
                </span>
              )}
              <label>Password</label>
              <input
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5"
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
              />
              {error.password && (
                <span className="text-[0.9rem] text-red-400">
                  {error.password}
                </span>
              )}
              <button
                type="submit"
                className="bg-[#d97757] h-10 w-full rounded-md text-white mt-5 font-archivo cursor-pointer transition duration-75 active:scale-[0.95] active:duration-75 "
              >
                Login
              </button>
              <p className=" text-center text-sm">
                Don't have an account?
                <Link to="/Signup" className="text-red-400">
                  {" "}
                  Create account{" "}
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-[1rem] h-[95%] m-3 flex items-center justify-center font-archivo text-xl">
          <img src="" alt="" />
          <h1>Logo</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
