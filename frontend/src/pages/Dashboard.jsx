import React from "react";
import NavBar from "../component/NavBar";
const Dashboard = () => {

  const userData = JSON.parse(localStorage.getItem("userData"))
  console.log(userData)
  return (
    <div className=" p-9">
      <div className="">
        <h1 className=" font-extrabold text-[3.5rem]">Hello, {userData.name}</h1>
      </div>
    </div>
  );
};

export default Dashboard;
