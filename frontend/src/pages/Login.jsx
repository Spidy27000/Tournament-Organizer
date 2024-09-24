import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Google_authentication from "../components/Google_authentication";
import visible from "../res/visibility_24dp_5F6368_FILL0_wght100_GRAD0_opsz24.svg";
import invisible from "../res/visibility_off_24dp_5F6368_FILL0_wght100_GRAD0_opsz24.svg";
const Login = ({ setUser }) => {
  const [IsAuthorized, setIsAuthorized] = useState(false);
  const navigate_page_to = useNavigate();
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const checkLocalStorage = () => {
      const storedCredentials = localStorage.getItem("userData");
      console.log("heloo");
      if (storedCredentials && !IsAuthorized) {
        setIsAuthorized(true);
      }
    };

    checkLocalStorage();
  }, []);

  const [error, setError] = useState({});
  const handleChange = (e) => {
    const { id, value } = e.target;
    setformData({
      ...formData,
      [id]: value,
    });
  };

  const handleGoogleLogin = (GoogleCredentials) => {
    const google_data = GoogleCredentials;
    localStorage.setItem("userData", JSON.stringify(google_data));
    setUser(google_data);
    console.log(google_data);
    setIsAuthorized(true);
  };

  useEffect(() => {
    if (IsAuthorized) {
      console.log("navigating to dashboard");
      navigate_page_to("/dashboard");
    }
  }, [IsAuthorized, navigate_page_to]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = Validate(formData);
    setError(validate);
    if (Object.keys(validate).length === 0) {
      console.log("ok");
      console.log(formData);
      setIsAuthorized(true);
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

  const togglePassword = () => {
    const password = document.getElementById("password");
    const password_image = document.getElementById("password_image");

    if (password.type == "password") {
      password.type = "text";
      password_image.src = invisible;
    } else {
      password.type = "password";
      password_image.src = visible;
    }
  };

  return (
    <div className=" flex items-center justify-center h-screen w-screen bg-[#f1efe8]">
      <div className="w-[60rem] h-[35rem]  bg-[#fff] shadow-xl border-solid border-2 border-[#dadada] rounded-[1rem] flex items-center flex-row">
        <div className=" h-full flex-1 flex justify-center items-center">
          <div className=" w-[68%] flex flex-col justify-center gap-1 h-[90%] ">
            <div className=" leading-[3rem] text-[2.8rem] font-archivo items-start pt-6">
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
              <span className="text-[0.9rem] text-red-400 h-3">
                {error.email && error.email}
              </span>

              <label>Password</label>
              <div className=" flex relative">
                <input
                  className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <img
                  onClick={togglePassword}
                  className=" h-7 absolute right-3 top-[0.4rem] w-7 hover:bg-[#ededed] p-[0.15rem] cursor-pointer rounded-md "
                  src={visible}
                  id="password_image"
                  alt=""
                ></img>
              </div>
              <span className="text-[0.9rem] text-red-400 h-3">
                {error.password && error.password}
              </span>
              <button
                type="submit"
                className="bg-[#d97757] h-10 w-full rounded-md text-white mt- font-bold cursor-pointer transition duration-75 active:scale-[0.95] active:duration-75 "
              >
                Login
              </button>
              <Google_authentication onSuccess={handleGoogleLogin} />
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
