<?php


return [
  ["POST", "/login", "UserControllor::login"],
  ["POST", "/signup", "UserControllor::signUp"],
  ["GET", "/view/user/{id:\d+}", "UserControllor::viewUser"],
  ['POST', "/createTeam", "TeamControllor::createTeam"],
  ['POST', "/addmember", "TeamControllor::addMember"],
  ['GET', "/view/team/{id:\d+}", "TeamControllor::viewTeam"]
];

