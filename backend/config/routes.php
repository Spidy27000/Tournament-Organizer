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
  ['POST', "/join/tournament" ,"TournamentControllor::join"]
];
