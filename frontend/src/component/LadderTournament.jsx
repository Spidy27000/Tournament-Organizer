import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-select";

const LadderTournament = ({
  data,
  creator,
  currentMatch,
  setScore,
  isLastMatch,
}) => {
  const [scoreChange, setScoreChange] = useState(false);
  const [matchData, setMatchData] = useState([
    {
      id: 1,
      teamName: "alpha",
      points: 0,
      rank: 1,
    },
    { id: 2, teamName: "beta", points: 0, rank: 2 },
    { id: 3, teamName: "gamma", points: 0, rank: 3 },
    { id: 4, teamName: "theta", points: 0, rank: 4 },
  ]);
  const [currentId, setCurrentId] = useState(2)
  const [members,setMembers] = useState([{
    id: 1,
    value: ""
  }])

  const [isAddedTeam,setIsAddedTeam] = useState(false)

  useEffect(() => {
    setScore(matchData);
  }, [matchData]);

  const updatePosition = (teamID, increment) => {
    let newTeams = matchData.map((teams) => {
      if (teams.id === teamID) {
        return {
          ...teams,
          points: increment ? teams.points + 1 : Math.max(0, teams.points - 1),
        };
      }
      return teams;
    });

    const sortedTeams = [...newTeams].sort((a, b) => b.points - a.points);
    let rank = 1;
    sortedTeams.forEach((teams) => {
      teams.rank = rank;
      rank = rank + 1;
    });

    setMatchData(sortedTeams);
  };
  const handleInputChange = (id, value) => {
    setMembers(members.map(member => 
      member.id === id ? { ...member, value } : member
    ));
  };

  const handleAddMember = () =>
  {
    setCurrentId((prev) => prev + 1)
    setMembers(members => [...members, {id: currentId, value: ""}])
    console.log(members)
  }
  
  const handleSubmit = () =>
  {
    setIsAddedTeam(true)
    console.log(members)
  }

  return (
    <div className="p-6">
      <div className=" flex justify-between">
        <div className=" flex justify-center items-center"><h1 className="font-extrabold text-4xl mb-6">Match {currentMatch}</h1></div>
        <div className=" flex gap-2">
        {currentMatch == 1 && !creator && (
          <Dialog>
            <DialogTrigger>
              <Button>View Team</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                
                <DialogTitle className=" pb-5 flex justify-between items-center">
                <div className=" text-2xl font-bold"><p>Team {"Team_Name"}</p></div>
                  {/* Add Member to the Team{" "}
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 hover:shadow-md transition-all duration-200 active:scale-95"
                    onClick={handleAddMember}
                  >
                    <Plus className="h-4 w-4" />
                  </Button> */}

                </DialogTitle>
                <DialogDescription className=" flex flex-col gap-2">
                  {isAddedTeam && members.map(member =>
                    <div key={member.id} className=" flex bg-[#fefdfd] rounded-md border-2 p-3 hover:shadow-md transition-all">
                    <div className=" w-[10%] text-center text-[1.0rem] border-r-2 mr-5">
                      {member.id}
                    </div>
                    <div className=" flex justify-center items-center text-[1.0rem]">
                      {member.value}
                    </div>
                  </div>
                  )}
                  
                </DialogDescription>
              </DialogHeader>
              <div>
              </div>
            </DialogContent>
          </Dialog>
        )}
          {currentMatch == 1 && !creator && (
          <Dialog>
            <DialogTrigger>
              <Button>Add Member</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
              <div className=" text-2xl font-bold"><p>Team {"Team_Name"}</p></div>
                <DialogTitle className=" pb-5 flex justify-between items-center">
                
                   <p>Add Member to the Team{" "}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-2 hover:shadow-md transition-all duration-200 active:scale-95"
                    onClick={handleAddMember}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>

                </DialogTitle>
                <DialogDescription className=" flex flex-col gap-2">
                  {members.map(member =>
                    <div key={member.id} className=" flex bg-[#fefdfd] rounded-md border-2 hover:shadow-md transition-all">
                    <div className=" w-[10%] text-center text-[1.0rem] border-r-2 mr-5 flex justify-center items-center">
                      {member.id}
                    </div>
                    <div className=" flex justify-center items-center text-[1.0rem] w-[80%]">
                      <input type="text" className=" outline-none h-10 text-md w-full" onChange={(e) => handleInputChange(member.id, e.target.value)}/>
                    </div>
                  </div>
                  )}
                  
                  
                </DialogDescription>
              </DialogHeader>
              <DialogClose asChild>
              <Button className="pt-2" onClick={handleSubmit}>Submit</Button>
          </DialogClose>
            </DialogContent>
          </Dialog>
        )}
        </div>
      </div>
      <div className="rounded-lg border-2">
        <Table>
          <TableHeader>
            <TableRow className=" h-12 hover:bg-[#efebe1]">
              <TableHead className="w-24 text-center">Rank</TableHead>
              <TableHead className="text-center">Team</TableHead>
              <TableHead className="text-center">Points</TableHead>
              {creator && !isLastMatch && (
                <TableHead className="text-center">Action</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {matchData.map((team) => (
              <TableRow
                key={team.id}
                className="hover:bg-[#efebe1] text-center transition-all duration-500"
              >
                <TableCell className="font-medium text-center">
                  <div className="flex items-center space-x-2 justify-center">
                    <span>{team.rank}</span>
                    {team.rank < team.id && (
                      <span className="text-green-500 absolute pl-5">↑</span>
                    )}
                    {team.rank > team.id && (
                      <span className="text-red-500 absolute pl-5">↓</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">{team.teamName}</TableCell>
                <TableCell>
                  <span className="font-mono">{team.points}</span>
                </TableCell>
                <TableCell className="space-x-2">
                  {creator && !isLastMatch && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-2 hover:shadow-md transition-all duration-200 active:scale-95"
                        onClick={() => updatePosition(team.id, true)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-2 hover:shadow-md transition-all duration-200 active:scale-95"
                        onClick={() => updatePosition(team.id, false)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LadderTournament;
