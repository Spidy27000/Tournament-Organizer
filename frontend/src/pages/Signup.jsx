import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Google_authentication from "../component/Google_authentication";
import visible from "../res/visibility_24dp_5F6368_FILL0_wght100_GRAD0_opsz24.svg";
import invisible from "../res/visibility_off_24dp_5F6368_FILL0_wght100_GRAD0_opsz24.svg";
import { animated, useSpring } from "@react-spring/web";
import { useToast } from "../../hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
const Signup = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [isSignup, setIsSignup] = useState(true);
  const [ApiError, setApiError] = useState("");
  const { toast } = useToast();

  const springProps = useSpring({
    height: isSignup ? "42rem" : "37rem",
    config: {
      tension: 300,
      friction: 20,
      duration: 300,
    },
  });

  const [error, setError] = useState({});
  const [isSignedUp, setisSignedUp] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setformData({
      ...formData,
      [id]: value,
    });
  };

  //If user already signed in
  useEffect(() => {
    const storedCredentials = localStorage.getItem("userData");
    if (storedCredentials && !isSignedUp) {
      setisSignedUp(true);
    }
  }, []);

  useEffect(() => {
    if (isSignedUp) {
      navigate("/dashboard");
    }
  }, [isSignedUp, navigate]);

  const getName = (email) => {
    return email.substring(0, email.indexOf("@"))
  }

  //Handle Google Data
  const handleGoogleSignIn = async (GoogleCredential) => {
      formData.email = GoogleCredential.email,
      formData.name = GoogleCredential.name,
      formData.password = GoogleCredential.sub,
      formData.username = getName(GoogleCredential.email)
    try {
      const response = await fetch("http://localhost/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      console.log(data);

      if (data.status === "failed") {
        toast({
          variant: "destructive",
          title: data.errorCode,
        });
      } else {
        setisSignedUp(true);
        setUser(formData);
        localStorage.setItem("userId", data.id)
        localStorage.setItem("userData", JSON.stringify(formData));
      }
    } catch (error) {
      console.log("Something went wrong");
      toast({
        title: "Something went wrong",
        description: "Please try again later",
      });
    }
  }

  //Handling Submit of the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validate = Validate(formData);
    setError(validate);
    if (Object.keys(validate).length === 0) {
      console.log("ok");
      console.log(formData);
      try {
        const response = await fetch("http://localhost/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        console.log(data);

        if (data.status === "failed") {
          toast({
            variant: "destructive",
            title: data.errorCode,
          });
        } else {
          setisSignedUp(true);
          setUser(formData);
          localStorage.setItem("userId", data.id)
          localStorage.setItem("userData", JSON.stringify(formData));
        }
      } catch (error) {
        console.log("Something went wrong");
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      }
    } else {
      console.log("Error");
      console.log(validate);
    }
  };

  //Show or hide password for style
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

  //Validation for the form
  const Validate = (data) => {
    const error = {};
    if (!data.name.trim()) {
      error.name = "name is required";
    } else if (!isNaN(data.name)) {
      error.name = "Please enter valid name";
    } else if (!data.username.trim()) {
      error.username = "Please enter username";
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
      <animated.div
        style={springProps}
        className="w-[62rem] bg-[#f0eae6] shadow-xl border-solid border-2 border-[#dadada] rounded-[1rem] flex items-center flex-row"
      >
        <Toaster />
        <div className=" h-full flex-1 flex justify-center items-center">
          <div className=" w-[68%] flex flex-col justify-center h-[95%] gap-11">
            <div className=" leading-[3rem] text-[3rem] font-extrabold font-ArchivoBlack items-start pb-1">
              <h1>Sign Up!</h1>
            </div>

            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col justify-center gap-[0.2rem] h-auto"
            >
              <label className=" font-Inter text-[#696969] text-[0.95rem] pb-1">
                Name
              </label>

              <input
                type="text"
                id="name"
                onChange={handleChange}
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5 transition-all"
              />
              <span className="text-[0.8rem] text-red-400 h-4">
                {error.name}
              </span>

              <label className=" font-Inter text-[#696969] text-[0.95rem] pb-1">
                Username
              </label>

              <input
                type="text"
                id="username"
                onChange={handleChange}
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5 transition-all"
              />
              <span className="text-[0.8rem] text-red-400 h-4">
                {error.username}
              </span>

              <label className=" font-Inter text-[#696969] text-[0.95rem] pb-1">
                Email
              </label>

              <input
                type="email"
                id="email"
                onChange={handleChange}
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5 transition-all"
              />
              <span className="text-[0.8rem] text-red-400 h-4">
                {error.email}
              </span>
              <label className=" font-Inter text-[#696969] text-[0.95rem] pb-1">
                Password
              </label>
              <div className=" flex relative">
                <input
                  type="password"
                  id="password"
                  onChange={handleChange}
                  className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5 transition-all"
                />
                <img
                  onClick={togglePassword}
                  className=" h-7 absolute right-3 top-[0.4rem] w-7 hover:bg-[#ededed] p-[0.15rem] cursor-pointer rounded-md "
                  src={visible}
                  id="password_image"
                  alt=""
                ></img>
              </div>
              <span className="text-[0.8rem] text-red-400 h-4">
                {error.length || error.password}
              </span>
              <button
                type="submit"
                className="bg-[#d97757] h-10 w-full rounded-md text-white mt-5 font-bold cursor-pointer transition duration-75 active:scale-[0.95] active:duration-75 mb-2"
              >
                Sign Up
              </button>
              <Google_authentication onSuccess={handleGoogleSignIn} />
              <p className=" text-center text-sm font-Inter pt-2 ">
                Already have an account?
                <Link
                  className="text-[#d97757]"
                  to="/Login"
                  onClick={() => setIsSignup(false)}
                >
                  {" "}
                  Login{" "}
                </Link>
              </p>
            </form>
          </div>
        </div>
        <div className="flex-1 bg-[#e27b52e5] rounded-[0.65rem] h-[95%] m-4 flex items-center justify-center font-archivo text-xl">
          <h1 className=" font-lot text-[3rem] text-[#1f201f]">nexus</h1>
        </div>
      </animated.div>
    </div>
  );
};

export default Signup;
