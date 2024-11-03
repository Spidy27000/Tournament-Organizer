import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";

const LadderTournament = () => {
  const [matchData, setMatchData] = useState([
    {id: 1, teamName: "alpha", points: 0, rank: 1},
    {id: 2, teamName: "beta", points: 0, rank: 2},
    {id: 3, teamName: "gamma", points: 0, rank: 3},
    {id: 4, teamName: "theta", points: 0, rank: 4}
  ]);

  const updatePosition = (teamID, increment) => {
    let newTeams = matchData.map(teams => {
      if (teams.id === teamID) {
        return {
          ...teams,
          points: increment ? teams.points + 1 : Math.max(0, teams.points - 1)
        };
      }
      return teams;
    });
    
    const sortedTeams = [...newTeams].sort((a, b) => b.points - a.points);
    
    let rank = 1;
    sortedTeams.forEach(teams => {
      teams.rank = rank;
      rank = rank + 1;
    });

    setMatchData(sortedTeams);
  };

  return (
    <div className="p-6">
      <h1 className="font-extrabold text-6xl mb-6">Match 1</h1>
      <div className="rounded-lg border-2">
        <Table>
          <TableHeader>
            <TableRow className=" h-12 hover:bg-[#efebe1]">
              <TableHead className="w-24 text-center">Rank</TableHead>
              <TableHead className="text-center">Team</TableHead>
              <TableHead className="text-center">Points</TableHead>
              <TableHead className="text-center">Action</TableHead>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
      </div>
      <Button className=" mt-5">Submit</Button>
      <Button className=" mt-5 ml-5">End Match</Button>
    </div>
  );
};

export default LadderTournament;