import React from "react";
import Brackets from "../component/Brackets";
import SingleElimination from "../component/SingleElimination";
import LadderTournamentCard from "../component/LadderTournamentCard";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Tournament = () => {
  const tournamentData = {
    id: 10,
    tournamentName: "Chess International",
    first_rank: "Player",
    type: "ladder",
    status: "on going",
  };

  const [tournamentCode, setTournamentCode] = useState()

  const handleAddTournament = () =>
  {
    console.log(tournamentCode)
  }

  const handleChange = (e) =>
  {
    setTournamentCode(e.target.value)
  }
  return (
    <div className=" p-9 flex flex-col gap-12">
      <div>
        <h1 className=" font-extrabold text-[3.5rem]">Public</h1>
        {/*fetch data from database for all public tournament created*/}
      </div>
      <div>
        <div className=" flex items-center justify-between">
        <h1 className=" font-extrabold text-[3.5rem]">Private</h1>
        {/*fetch data from database for all private tournament created*/}
        <div className="">
          <Dialog>
            <DialogTrigger><Button>Add</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Join Private Tournament</DialogTitle>
                <DialogDescription>
                  Enter the code of the private tournament to add to your My tournament section
                </DialogDescription>
              </DialogHeader>
              <div>
                <label className=" pt-5">Code</label>
                <input
                    type="text"
                    id="Tournament_size"
                    value={tournamentCode}
                    onChange={handleChange}
                    className=" border-solid border-2 transition-all border-[#e9e8e8] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5"
                  />
                <Button onClick={handleAddTournament} className=" mt-5">Submit</Button>
              </div>
            </DialogContent>
          </Dialog>
          </div>
        </div>
        <LadderTournamentCard data={tournamentData} />
      </div>
    </div>
  );
};

export default Tournament;
