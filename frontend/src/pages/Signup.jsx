import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setformData] = useState({
    name: "",
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
    } else {
      console.log("Error");
      console.log(validate);
    }
  };

  const Validate = (data) => {
    const error = {};
    if (!data.name.trim()) {
      error.name = "name is required";
    } else if (!isNaN(data.name)) {
      error.name = "Please enter valid name";
    } else if (!data.email.trim()) {
      error.email = "Please enter your email";
    } else if (!data.password) {
      error.password = "Please enter password";
    } else if (data.password.length < 6) {
      error.length = "Password should be atleast 6 characters long";
    }
    return error;
  };

  return (
    <div className=" flex items-center justify-center h-screen w-screen bg-[#f1efe7]">
      <div className="w-[60rem] h-[35rem]  bg-[#f2ead6] shadow-xl border-solid border-2 border-[#dadada] rounded-[1rem] flex items-center flex-row">
        <div className=" h-full flex-1 flex justify-center items-center">
          <div className=" w-[68%] flex flex-col justify-center gap-2 h-[80%] ">
            <div className=" leading-[3rem] text-[2.8rem] font-archivo items-start pt-5">
              <h1>SignUp!</h1>
            </div>

            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col justify-center gap-2 h-full"
            >
              <label>Name</label>

              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5"
              />
              {error.name && (
                <span className="text-[0.9rem] text-red-400">{error.name}</span>
              )}

              <label>Email</label>

              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5"
              />
              {error.email && (
                <span className="text-[0.9rem] text-red-400">
                  {error.email}
                </span>
              )}

              <label>Password</label>

              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5"
              />
              {error.password && (
                <span className="text-[0.9rem] text-red-400">
                  {error.password}
                </span>
              )}
              {error.length && (
                <span className="text-[0.9rem] text-red-400">
                  {error.length}
                </span>
              )}

              <button
                type="submit"
                className="bg-[#d97757] h-10 w-full rounded-md text-white mt-5 font-archivo cursor-pointer transition duration-75 active:scale-[0.95] active:duration-75 "
              >
                Sign Up
              </button>
              <p className=" text-center text-sm">
                Already have an account?
                <Link className="text-red-400" to="/">
                  {" "}
                  Login{" "}
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

export default Signup;
