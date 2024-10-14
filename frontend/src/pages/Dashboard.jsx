import React from "react";
import { useEffect } from "react";
import NavBar from "../component/NavBar";
import { Button } from "../components/ui/button";
import TournamentsCard from "../component/TournamentsCards";
const Dashboard = () => {

  const userData = JSON.parse(localStorage.getItem("userData"))
  console.log(userData)

  useEffect(()=>{
    let text = new SplitType("#heading");
    let characters = document.querySelectorAll(".char")
    for (let i = 0; i < characters.length; i++)
    {
        characters[i].classList.add('opacity-0');
    }
    gsap.to(".char",{
      opacity: 1,
      stagger: 0.08,
      delay: 0.2,
      duration: 0.5
    })
  },[])

  return (
    <div className=" w-full p-9 scroll-smooth">
      <div className="">
        <h1 id="heading" className=" font-extrabold text-[3.5rem]">Hello, {userData.name}</h1>
        <div className=" pt-10 flex flex-wrap gap-6">
          <TournamentsCard/>
          <TournamentsCard/>
          <TournamentsCard/>
          <TournamentsCard/>
          <TournamentsCard/>
          <TournamentsCard/>
          <TournamentsCard/>
          <TournamentsCard/>
          <TournamentsCard/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
