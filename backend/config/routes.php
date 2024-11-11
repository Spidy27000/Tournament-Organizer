<?php


return [
  ["POST", "/login", "UserControllor::login"],
  ["POST", "/signup", "UserControllor::signUp"],
  ["GET", "/view/user/{id:\d+}", "UserControllor::viewUser"],
  ['POST', "/create/team", "TeamControllor::createTeam"],
  ['POST', "/add/member", "TeamControllor::addMember"],
  ['GET', "/view/team/{id:\d+}", "TeamControllor::viewTeam"],
  ['POST', "/remove/member", "TeamControllor::removeMember"],
  ['POST', "/create/tournament" ,"TournamentControllor::create"],
  ['POST', "/join/tournament" ,"TournamentControllor::join"],
  ['POST', "/leave/tournament" ,"TournamentControllor::leave"],
  ['GET', "/view/tournament/{id:\d+}" ,"TournamentControllor::view"],
  ['GET', "/view/allTournaments", "TournamentControllor::viewAllTournaments"],
  ['GET', "/view/tournamentDetails/{id:\d+}" ,"TournamentControllor::viewDetails"],
  ['POST', "/init/tournament" ,"TournamentControllor::initTournament"],
  ['GET', "/view/myTournaments/{id:\d+}", "TournamentControllor::viewMyTournamenets"],
  ['POST', "/update/scores", "TournamentControllor::updateScores"]
];
