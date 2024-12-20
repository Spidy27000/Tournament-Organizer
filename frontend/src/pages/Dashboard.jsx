  import React, { useState } from "react";
  import { useEffect } from "react";
  import NavBar from "../component/NavBar";
  import { Button } from "../components/ui/button";
  import TournamentsCard from "../component/TournamentsCards";
  import LadderTournament from "../component/LadderTournament";
  import LadderTournamentCard from "../component/LadderTournamentCard";

  const Dashboard = () => {

    const userData = JSON.parse(localStorage.getItem("userData"))
    console.log(userData)

    const [allTournaments, setAllTournaments] = useState([{}])

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

    useEffect(()=>{
      const getAllTournament = async () => {
        try {
          const response = await fetch(
            `http://localhost/view/allTournaments`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
  
          const data = await response.json();
          setAllTournaments(data)
          console.log(allTournaments)
        } catch (error) {
          console.log("not having teamData from database", error.message);
        }
      }

      getAllTournament()
    },[])
      

    
    //TODO: Api for all public tournament
    const tournamentsData = [
      {
        id: 1,
        tournamentName: "Summer Championship 2024",
        team1_name: "Thunder Hawks",
        team2_name: "Lightning Dragons",
        team1_score: 3,
        team2_score: 2,
        status: 'completed',
        type: "single_elimination"
      },
      {
        id: 2,
        tournamentName: "Regional Playoffs",
        team1_name: "Storm Raiders",
        team2_name: "Desert Eagles",
        team1_score: 5,
        team2_score: 5,
        status: 'completed',
        type: "single_elimination"
      },
      {
        id: 3,
        tournamentName: "Pro League Finals",
        team1_name: "Crimson Knights",
        team2_name: "Azure Warriors",
        team1_score: 0,
        team2_score: 0,
        status: 'upcoming',
        type: "single_elimination"
      },
      {
        id: 4,
        tournamentName: "Winter Cup 2024",
        team1_name: "Frost Giants",
        team2_name: "Fire Phoenix",
        team1_score: 4,
        team2_score: 2,
        status: 'completed',
        type: "double_elimination"
      },
      {
        id: 5,
        tournamentName: "City League Championship",
        team1_name: "Urban Legends",
        team2_name: "Metro Stars",
        team1_score: 1,
        team2_score: 3,
        status: 'completed',
        type: "singe_elimination"
      },
      {
        id: 6,
        tournamentName: "International Showdown",
        team1_name: "Global Elite",
        team2_name: "World Warriors",
        team1_score: 0,
        team2_score: 0,
        status: 'upcoming',
        type: "single_elimination"
      },
      {
        id: 7,
        tournamentName: "Community Cup",
        team1_name: "Local Heroes",
        team2_name: "Neighborhood Kings",
        team1_score: 6,
        team2_score: 3,
        status: 'completed',
        type: "single_elimination"
      },
      {
        id: 8,
        tournamentName: "Elite Tournament",
        team1_name: "Pro Gamers",
        team2_name: "Elite Squad",
        team1_score: 2,
        team2_score: 2,
        status: 'on going',
        type: "single_elimination"
      },
      {
        id: 9,
        tournamentName: "Champions League",
        team1_name: "Victory Legion",
        team2_name: "Trophy Hunters",
        team1_score: 0,
        team2_score: 0,
        status: 'upcoming',
        type: "single_elimination"
      },
      {
        id: 10,
        tournamentName: "Chess International",
        first_rank: "Player",
        type: "ladder",
        status: "on going"
      }
    ];

    localStorage.setItem("dummyTournament", JSON.stringify(tournamentsData))

    const renderCards = (tournament) =>
    {
      if (tournament.type == "ladder")
      {
        return <LadderTournamentCard key={tournament.id} data={tournament}/>
      }
      else
      {
        return <TournamentsCard key={tournament.id} data={tournament}/>
      }
    }

    const renderLadderTournament = (tournament) =>
      {
        if (tournament.visibility == "Public")
        {
          return <LadderTournamentCard key={tournament.id} data={tournament}/>
        }
      }
  

    return (
      <div className=" w-full p-9 scroll-smooth">
        <div className="">
          <h1 id="heading" className=" font-extrabold text-[3.5rem]">Hello, {userData.username}</h1>
          <div className=" pt-10 flex flex-wrap gap-6">
            {allTournaments.map(renderLadderTournament)}
            {tournamentsData.map(renderCards)}
          </div>
        </div>
      </div>
    );
  };

  export default Dashboard;
