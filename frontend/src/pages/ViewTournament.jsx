import React from 'react'
import LadderTournament from '../component/LadderTournament'
import Brackets from '../component/Brackets'
import { useParams } from 'react-router'
import { Button } from "@/components/ui/button";

const ViewTournament = () => {
  const param = useParams();
  const tournament_Id = param.tournamentId;
  // fetch tournament details from the id provided in the parameter
  console.log(tournament_Id)
  const tournamentData =
  {
    tournament_type: "single_elimination",  
  }

  return (
    <div className=' w-full p-9'>
    <h1 id="heading" className=" font-extrabold text-[3.5rem]">
          Tournament_Name
        </h1>
    { tournamentData.tournament_type == "ladder" && (
      <LadderTournament/>
    )}
    {(tournamentData.tournament_type == "single_elimination" || tournamentData.tournament_type == "double_elimination") && (
      <Brackets/>
    )}
    </div>
  )
}

export default ViewTournament