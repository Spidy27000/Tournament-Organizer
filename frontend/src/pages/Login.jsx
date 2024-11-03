import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Google_authentication from "../component/Google_authentication";
import visible from "../res/visibility_24dp_5F6368_FILL0_wght100_GRAD0_opsz24.svg";
import invisible from "../res/visibility_off_24dp_5F6368_FILL0_wght100_GRAD0_opsz24.svg";

const Login = ({ setUser }) => {
  const [IsAuthorized, setIsAuthorized] = useState(false);
  const navigate_page_to = useNavigate();
  const [apiError, setApiError] = useState("")
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });

  //checking localStorage
  useEffect(() => {
    const checkLocalStorage = () => {
      const storedCredentials = localStorage.getItem("userData");
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

  //handling google data
  const handleGoogleLogin = (GoogleCredentials) => {
    const google_data = GoogleCredentials;
    localStorage.setItem("userData", JSON.stringify(google_data));
    setUser(google_data);
    console.log(google_data);
    setIsAuthorized(true);
  };

  //If authorized, go to dashboard
  useEffect(() => {
    if (IsAuthorized) {
      console.log("navigating to dashboard");
      navigate_page_to("/dashboard");
    }
  }, [IsAuthorized, navigate_page_to]);

  //handling form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = Validate(formData);
    setError(validate);
    if (Object.keys(validate).length === 0) {
      console.log("ok");
      console.log(formData);
      try {
        const response = await fetch("http://localhost/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        console.log(data)
        if (data.status === "Failed")
        {
          console.log("No account matched")
        }
        else
        {
          setIsAuthorized(true);
        }
      } 
      catch (err) 
      {
        console.log("kuch to gadbad hai")
        console.log(JSON.stringify(err));
      }
      
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
      <div className="w-[62rem] h-[37rem]  bg-[#f0eae6] shadow-xl border-solid border-2 border-[#dadada] rounded-[1rem] flex items-center flex-row">
        <div className=" h-full flex-1 flex justify-center items-center">
          <div className=" w-[68%] flex flex-col justify-center gap-1 h-[90%] ">
            <div className=" leading-[2.8rem] text-[2.9rem] font-extrabold items-start pt-6 font-ArchivoBlack">
              <h1>Welcome Back!</h1>
            </div>
            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col justify-center gap-2 h-full"
            >
              <label className=" font-Inter text-[#696969] text-[0.95rem]">
                Email
              </label>
              <input
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5 transition-all"
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span className="text-[0.9rem] text-red-400 h-6">
                {error.email && error.email}
              </span>

              <label className=" font-Inter text-[#696969] text-[0.95rem]">
                Password
              </label>
              <div className=" flex relative">
                <input
                  className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5 transition-all"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <img
                  onClick={togglePassword}
                  className=" h-7 absolute right-3 top-[0.4rem] w-7 hover:bg-[#ededed] p-[0.15rem] cursor-pointer rounded-md transition-all"
                  src={visible}
                  id="password_image"
                  alt=""
                ></img>
              </div>
              <span className="text-[0.9rem] text-red-400 h-6">
                {error.password && error.password}
              </span>
              <button
                type="submit"
                className="bg-[#d97757] h-10 w-full rounded-md text-white font-bold cursor-pointer transition duration-75 active:scale-[0.95] active:duration-75 "
              >
                Login
              </button>
              <Google_authentication onSuccess={handleGoogleLogin} />
              <p className=" text-center text-sm font-Inter pt-2 ">
                Don't have an account?
                <Link to="/Signup" className="text-[#d97757]">
                  {" "}
                  Create account{" "}
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-[#e27b52e5] rounded-[0.65rem] h-[95%] m-4 flex items-center justify-center font-archivo text-xl">
          <h1 className=" font-lot text-[3rem] text-[#1f201f]">nexus</h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
