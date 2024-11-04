<?php


return [
  ["POST", "/login", "UserControllor::login"],
  ["POST", "/signup", "UserControllor::signUp"],
  ["GET", "/user/{id}", "UserControllor::viewUser"]
];

