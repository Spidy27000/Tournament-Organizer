
//Testing brackets view from external lib
import React from "react";
import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";

const Brackets = () => {
  
  // Complete match data structure for a simple 4-player tournament
  const matches = [
    {
      id: 1,
      name: "Final",
      nextMatchId: null,
      tournamentRoundText: "Final",
      state: "DONE",
      participants: [
        {
          id: "1",
          resultText: "Won",
          isWinner: true,
          status: null,
          name: "Player 1"
        },
        {
          id: "2",
          resultText: "Lost",
          isWinner: false,
          status: null,
          name: "Player 2"
        }
      ]
    },
    {
      id: 2,
      name: "Semi Final 1",
      nextMatchId: 1,
      tournamentRoundText: "Semi Final",
      state: "DONE",
      participants: [
        {
          id: "1",
          resultText: "Won",
          isWinner: true,
          status: null,
          name: "Player 1"
        },
        {
          id: "3",
          resultText: "Lost",
          isWinner: false,
          status: null,
          name: "DAN"
        }
      ]
    },
    {
      id: 3,
      name: "Semi Final 2",
      nextMatchId: 1,
      tournamentRoundText: "Semi Final",
      state: "DONE",
      participants: [
        {
          id: "2",
          resultText: "Won",
          isWinner: true,
          status: null,
          name: "Player 2"
        },
        {
          id: "4",
          resultText: "Lost",
          isWinner: false,
          status: null,
          name: "Player 4"
        }
      ]
    }
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <SingleEliminationBracket
        matches={matches}
        matchComponent={Match}
        options={{

        }}
      />
    </div>
  );
};

export default Brackets;