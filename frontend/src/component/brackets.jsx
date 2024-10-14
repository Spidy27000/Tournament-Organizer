
//Testing brackets view from external lib
import React from "react";
import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";

const match_info = [
  {
    id: 260008,
    name: "Final - Match",
    nextMatchId: null,
    tournamentRoundText: "4",
    startTime: "2021-05-30",
    state: "DONE",
    participants: [
      {
        id: "c016cb2a-fdd9-4c40-a81f-0cc6bdf4b9cc",
        resultText: "WON",
        isWinner: false,
        status: null,
        name: "giacomo123",
      },
      {
        id: "9ea9ce1a-4794-4553-856c-9a3620c0531b",
        resultText: null,
        isWinner: true,
        status: null,
        name: "Ant",
      },
    ],
  },
  // ... other matches ...
];

export const DoubleElimination = () => (
  <DoubleEliminationBracket
    matches={match_info}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer width={500} height={500} {...props}>
        {children}
      </SVGViewer>
    )}
  />
);

export const SingleElimination = () => (
  <SingleEliminationBracket
    matches={match_info}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer width={1000} height={1000} {...props}>
        {children}
      </SVGViewer>
    )}
  />
);