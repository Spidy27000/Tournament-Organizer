import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Google_authentication from "../component/Google_authentication";
import visible from "../res/visibility_24dp_5F6368_FILL0_wght100_GRAD0_opsz24.svg";
import invisible from "../res/visibility_off_24dp_5F6368_FILL0_wght100_GRAD0_opsz24.svg";


const Signup = ({setUser}) => {
  const navigate = useNavigate();
  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
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
    };
  }, []);

  useEffect(()=>{
    
    if(isSignedUp)
    {
      navigate("/dashboard");
    }
  },[isSignedUp,navigate])

  //Handle Google Data
  const handleGoogleSignIn = (GoogleCredential) => {
    setUser(GoogleCredential)
    setisSignedUp(true);
  }

  //Handling Submit of the form
  const handleSubmit = (e) => {
    e.preventDefault();
    const validate = Validate(formData);
    setError(validate);
    if (Object.keys(validate).length === 0) {
      console.log("ok");
      console.log(formData);
      localStorage.setItem('userData', JSON.stringify(formData));
      setUser(formData)
      setisSignedUp(true)
      
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
      <div className="w-[60rem] h-[35rem]  bg-[#ffffff] shadow-xl border-solid border-2 border-[#dadada] rounded-[1rem] flex items-center flex-row">
        <div className=" h-full flex-1 flex justify-center items-center">
          <div className=" w-[68%] flex flex-col justify-center gap-2 h-[80%] ">
            <div className=" leading-[3rem] text-[2.8rem] font-extrabold items-start pt-0 pb-3">
              <h1>SignUp!</h1>
            </div>

            <form
              action=""
              onSubmit={handleSubmit}
              className="flex flex-col justify-center gap-0 h-full"
            >
              <label className=" mt-2">Name</label>

              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5"
              />
              <span className="text-[0.9rem] text-red-400 h-3">
                {error.name}
              </span>

              <label className=" mt-2">Email</label>

              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5"
              />
              <span className="text-[0.9rem] text-red-400 h-3">
                {error.email}
              </span>
              <label className=" mt-2">Password</label>
              <div className=" flex relative">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5"
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
                {error.length || error.password}
              </span>
              <button
                type="submit"
                className="bg-[#d97757] h-10 w-full rounded-md text-white mt-5 font-bold cursor-pointer transition duration-75 active:scale-[0.95] active:duration-75 "
              >
                Sign Up
              </button>
              
              
            </form>
            <Google_authentication onSuccess={handleGoogleSignIn}/>
            <p className=" text-center text-sm">
                Already have an account?
                <Link className="text-red-400" to="/Login">
                  {" "}
                  Login{" "}
                </Link>
              </p>
            
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
