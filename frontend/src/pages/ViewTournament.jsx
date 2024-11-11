import React from "react";
import LadderTournament from "../component/LadderTournament";
import Brackets from "../component/Brackets";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { PartyPopper } from "lucide-react";

const ViewTournament = () => {
  const param = useParams();
  const tournament_Id = param.tournamentId;
  const dummyData = JSON.parse(localStorage.getItem("dummyTournament"));
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [currentTournamentData, setCurrentTournament] = useState({})
  const [isLastMatch, setIsLastMatch] = useState(false);
  const [currentMatch, setCurrentMatch] = useState(1);
  const [isCreator, setIsCreator] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [opacityConfetti, setOpacityConfetti] = useState(1);
  const [isTeamLeader, setIsTeamLeader] = useState(true);
  // fetch tournament details from the id provided in the parameter
  useEffect(() => {
    const getCurrentTournament = async () => {
      try {
        const response = await fetch(
          `http://localhost/view/tournament/${tournament_Id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);
        setCurrentTournament(data)
        console.log(c)
      } catch (error) {
        console.log("kuch to gadbad hai");
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
      }
      
      
    };
    getCurrentTournament();
  }, []);

  const [score, setScore] = useState({});
  const [windowSize, setWindowSize] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });


  const storedTournament = JSON.parse(
    localStorage.getItem("tournament_creator")
  );

  useEffect(() => {
    const creator = () => {
      if (userId == currentTournamentData.organizer_id) {
        setIsCreator(true);
        console.log("ok");
      } else {
        setIsCreator(false);
        console.log("nope");
      }
    };
    creator();
  }, [currentTournamentData]);

  const handleSizing = () => {
    setWindowSize({
      height: window.innerHeight,
      width: window.innerWidth,
    });
    console.log(windowSize.height, windowSize.width);
  };

  const handleSubmit = () => {};

  useEffect(() => {
    window.onresize = () => handleSizing();
    const element = document.getElementById("winnerScreen");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    if (opacityConfetti > 0) {
      setInterval(() => {
        setOpacityConfetti(opacityConfetti - 0.1);
      }, 100);
    }
    setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
  }, [showConfetti]);

  const handleEndMatch = () => {
    if (currentMatch < currentTournamentData.max_size) {
      setCurrentMatch((prev) => prev + 1);
      console.log(currentMatch)
    }
    if (currentMatch == currentTournamentData.max_size) {
      setIsLastMatch(true);
      setShowConfetti(true);
    }
    console.log(currentTournamentData)
  };

  return (
    <div className=" w-full p-9">
      <h1 id="heading" className=" font-extrabold text-[3.5rem]">
        {currentTournamentData.name}
      </h1>
      {showConfetti && (
        <div className=" ">
          <Confetti
            width={windowSize.width - 10}
            height={windowSize.height - 10}
          />
        </div>
      )}
     
        
          <LadderTournament
            data={currentTournamentData}
            creator={isCreator}
            currentMatch={currentMatch}
            setScore={setScore}
            isLastMatch={isLastMatch}
          />
        

      {/* {(tournamentData.tournament_type == "single_elimination" ||
        tournamentData.tournament_type == "double_elimination") && <Brackets />} */}
      <div className="p-6">
        {isCreator && !isLastMatch && (
          <>
            <Button className=" mt-5 " onClick={handleEndMatch}>
              End Match
            </Button>
          </>
        )}
        {isLastMatch && (
          <div
            className=" pt-5 border-t-2 h-[35rem] flex flex-col"
            id="winnerScreen"
          >
            <div className="flex justify-center gap-4 items-center">
              <PartyPopper className=" h-10 w-10" />
              <h1 className=" font-extrabold text-[3.8rem] text-center">
                Winner
              </h1>
              <PartyPopper className=" h-10 w-10" />
            </div>
            <div className=" flex flex-col justify-center items-center gap-8 pt-5">
              <div className=" flex bg-[#f6f4f0] justify-center items-center w-[42%] rounded-md shadow-lg border-2 p-2">
                <div className=" font-extrabold text-[2.5rem] border-r-2 border-[#d9d5d5] pr-4">
                  1.
                </div>
                <div className=" w-[80%] flex justify-center items-center">
                  <h1 className=" font-extrabold text-[2.5rem] text-center">
                    {score[0].teamName}
                  </h1>
                </div>
              </div>
              <div className=" flex bg-[#f6f4f0] justify-center items-center w-[42%] rounded-md shadow-lg border-2 p-2">
                <div className=" font-extrabold text-[2.5rem] border-r-2 border-[#d9d5d5] pr-4">
                  2.
                </div>
                <div className=" w-[80%] flex justify-center items-center">
                  <h1 className=" font-extrabold text-[2.5rem] text-center">
                    {score[1].teamName}
                  </h1>
                </div>
              </div>
              <div className=" flex bg-[#f6f4f0] justify-center items-center w-[42%] rounded-md shadow-lg border-2 p-2">
                <div className=" font-extrabold text-[2.5rem] border-r-2 border-[#d9d5d5] pr-4">
                  3.
                </div>
                <div className=" w-[80%] flex justify-center items-center">
                  <h1 className=" font-extrabold text-[2.5rem] text-center">
                    {score[2].teamName}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTournament;
