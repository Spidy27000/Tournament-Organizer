import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const NavBar = () => {
  const [alertBox, setalertBox] = useState(false);
  const navigate_to = useNavigate();
  const toTournament = () => {
    navigate_to("/Tournament");
  };
  const toHome = () => {
    navigate_to("/dashboard");
  };
  const toCreate = () => {
    navigate_to("/create");
  };
  const logOutBtn = () => {
    setalertBox(true);
  };
  const logOut = () => {
    localStorage.clear();
    navigate_to("/Login");
  };

  return (
    <div>
      <nav className=" sticky top-0 h-screen w-[15rem] flex flex-col justify-center items-center border-solid border-[1px] border-[#dfd6d6]">
        <div className=" w-[90%] p-5 text-3xl font-extrabold">Game On.</div>
        <div className="flex-1 flex flex-col w-[90%] p-5 gap-5">
          <Button
            onClick={toHome}
            id="home_button"
            variant="outline"
            className=" text-[#948f8f] hover:shadow-sm relative flex gap-3 justify-start rounded-md hover:bg-[#e7e3df] bg-inherit focus:[#948f8f]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-home"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Home
          </Button>
          <Button
            onClick={toTournament}
            variant="outline"
            className=" text-[#948f8f] relative flex gap-3 justify-start rounded-md hover:bg-[#e7e3df] bg-inherit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="-0.5 -0.5 16 16"
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              id="Tournament--Streamline-Tabler.svg"
              height="16"
              width="16"
            >
              <desc>Tournament Streamline Icon: https://streamlinehq.com</desc>
              <path
                d="M1.25 2.5a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0"
                stroke-width="1"
              ></path>
              <path
                d="M11.25 6.25a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0"
                stroke-width="1"
              ></path>
              <path
                d="M1.25 7.5a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0"
                stroke-width="1"
              ></path>
              <path
                d="M1.25 12.5a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 1 0 -2.5 0"
                stroke-width="1"
              ></path>
              <path
                d="M3.75 7.5h1.875a0.625 0.625 0 0 1 0.625 0.625v3.75a0.625 0.625 0 0 1 -0.625 0.625H3.75"
                stroke-width="1"
              ></path>
              <path
                d="M3.75 2.5h4.375a0.625 0.625 0 0 1 0.625 0.625v6.25a0.625 0.625 0 0 1 -0.625 0.625h-1.25"
                stroke-width="1"
              ></path>
              <path d="M8.75 6.25h2.5" stroke-width="1"></path>
            </svg>
            My Tournaments
          </Button>
          <Button
            onClick={toCreate}
            variant="outline"
            className=" text-[#948f8f] relative flex gap-3 justify-start rounded-md hover:bg-[#e7e3df] bg-inherit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-plus"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create
          </Button>
        </div>
        <div className="w-[90%] p-7">
          <Button
            variant="outline"
            id="log_out_btn"
            onClick={logOutBtn}
            className="w-full text-[#948f8f] relative flex gap-3 justify-start rounded-md hover:bg-[#e7e3df] bg-inherit"
          >
            <svg
              height="20"
              width="20"
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              ></path>
            </svg>
            Log Out
          </Button>
          {alertBox && (
            <AlertDialog open={alertBox} onOpenChange={setalertBox}>
              <AlertDialogTrigger asChild></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will log out your account
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={logOut}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
