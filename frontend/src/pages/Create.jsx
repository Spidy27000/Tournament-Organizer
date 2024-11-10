import React from "react";
import { useState } from "react";
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

const Create = () => {
  const [size, setSize] = useState();
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [selection, setSelection] = useState("Team");
  const [alertBox, setAlertBox] = useState(false);
  const [visibility, setVisibility] = useState("Private");
  const [type, setType] = useState();
  const [Error, setIsError] = useState();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setformData] = useState({
    name: "",
    visibility: "",
    type: "",
    single_or_team: "",
    max_size: "",
    no_of_matches: "",
    user_id: userId,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setformData({
      ...formData,
      [id]: value,
    });
  };

  const submit_btn = () => {
    navigate("/Tournament");
    toast({
      title: "Tournament Created Successfully",
    });
    console.log(formData);
  };

  const handleSelectionChange = (value) => {
    setSelection(value);
    setformData({
      // Update the formData state properly
      ...formData,
      single_or_team: value,
    });
  };

  const handleVisibilityChange = (value) => {
    setVisibility(value);
    setformData({
      ...formData,
      visibility: value,
    });
  };

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    formData.max_size = newSize;
  };

  const handleMaxMatchChange = (event) => {
    const newMaxMatch = parseInt(event.target.value, 10);
    formData.no_of_matches = newMaxMatch;
  };

  // const handleTournamentType = () =>
  // {
  //   setType(value);
  //   setformData({
  //     ...formData,
  //     type: value
  //   });
  // }

  const single_Elimination = () => {
    setType("single");
    setformData({
      ...formData,
      type: "Single Elimination",
    });
  };
  const double_Elimination = () => {
    setType("double");
    setformData({
      ...formData,
      type: "Double Elimination",
    });
  };
  const ladder = () => {
    setType("ladder");
    setformData({
      ...formData,
      type: "ladder",
    });
  };

  const VisibleMaxRound = () => {
    if (type == "ladder") {
      return (
        <>
          <label className="font-semibold text-[0.95rem]">Max Matches</label>
          <input
            type="number"
            id="Tournament_size"
            min="2"
            max="16"
            onChange={handleMaxMatchChange}
            className="border-solid border-2 transition-all border-[#e9e8e8] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-28 rounded-md outline-none pl-5 pr-5"
          />
        </>
      );
    }
  };

  const isValid = (data) => {
    if (data.name == "" || data.name == " ") {
      return false;
    }
    if (data.visibility == "" || data.Visibility == " ") {
      return false;
    }
    if (data.type == "" || data.type == " ") {
      return false;
    }
    if (data.single_or_team == "" || data.single_or_team == " ") {
      return false;
    }
    if (data.max_size == "" || data.max_size == " ") {
      return false;
    }
    if (data.type == "Ladder" && data.no_of_matches == "") {
      return false;
    } else {
      return true;
    }
  };

  const from_submit = async (e) => {
    e.preventDefault();
    const isValidForm = isValid(formData);
    console.log(isValidForm);
    if (isValidForm) {
      console.log("Valid");
      console.log(formData);
      
      {
        /*Post data to the tournament*/
      }
      try {
        const response = await fetch("http://localhost/create/tournament", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        console.log(data);

        if (data.status === "failed") {
          toast({
            variant: "destructive",
            title: data.errorCode,
          });
        } else {
          setAlertBox(true);
          console.log(data)
        }
      } catch (error) {
        console.log(error.message);
        toast({
          title: "Something went wrong",
          description:error.message,
        });
        {
          /*Get tournament Id and store it in local storage*/
        }
        const tournament_id = 2;
        localStorage.setItem("tournament_creator", tournament_id);
      }
    } else {
      console.log("Invalid tournament Name");
      toast({
        variant: "destructive",
        title: "Please fill all the details",
        description: "No field should be empty",
      });
    }
  };

  return (
    <>
      <div className=" p-9 pb-4">
        <h1 className=" text-5xl font-extrabold">Create Tournament</h1>
        <div className=" flex justify-center items-center h-full">
          <div className=" w-[50%] pt-[5rem]">
            <form
              action=""
              onSubmit={from_submit}
              className=" flex flex-col gap-4 text-lg bg-[#f6f4f0] p-4 rounded-lg shadow-lg border-[1.5px]"
            >
              <label className=" font-semibold">Name of Tournament</label>
              <input
                className=" border-solid border-2 transition-all border-[#e9e8e8] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5"
                type="text"
                id="name"
                onChange={handleChange}
              />
              <div className=" flex justify-between">
                <div className=" flex gap-2 items-center">
                  <label className=" font-semibold text-[0.95rem]">
                    Team or Player
                  </label>
                  <Select onValueChange={handleSelectionChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Team">Team</SelectItem>
                      <SelectItem value="Single_Player">
                        Single Player
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className=" flex items-center gap-2">
                  <label className=" font-semibold text-[0.95rem]">
                    Max Size
                  </label>
                  <input
                    type="number"
                    id="Tournament_size"
                    min="2"
                    max="16"
                    onChange={handleSizeChange}
                    className=" border-solid border-2 transition-all border-[#e9e8e8] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-28 rounded-md outline-none pl-5 pr-5"
                  />
                </div>
              </div>
              <div className=" flex items-center justify-between gap-4">
                <div className=" flex items-center gap-2">
                  <label className=" font-semibold text-[0.95rem]">
                    Visibility
                  </label>
                  <Select onValueChange={handleVisibilityChange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Public">Public</SelectItem>
                      <SelectItem value="Private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className=" flex items-center gap-2">
                  {VisibleMaxRound()}
                </div>
              </div>
              <label className=" font-semibold text-[0.95rem]">Type</label>

              <div className=" w-full flex gap-4 justify-between">
                <div
                  id="single"
                  onClick={single_Elimination}
                  className={`bg-[#f8f7f5e9] h-24 w-1/3 p-4 shadow-sm text-[1rem] font-bold flex items-center 
    justify-center rounded-lg text-center cursor-pointer border-2 
    ${type === "single" ? "border-[#d97757]" : "border-transparent"} 
    transition-colors hover:border-[#d97757]/50`}
                >
                  Single Elimination
                </div>
                <div
                  onClick={double_Elimination}
                  className={`bg-[#f8f7f5e9] shadow-sm h-24 w-1/3 p-4 text-[1rem] font-bold flex items-center 
    justify-center rounded-lg text-center cursor-pointer border-2 
    ${type === "double" ? "border-[#d97757]" : "border-transparent"} 
    transition-colors hover:border-[#d97757]/50`}
                >
                  Double Elimination
                </div>
                <div
                  onClick={ladder}
                  className={`bg-[#f8f7f5e9] shadow-sm h-24 w-1/3 p-4 text-[1rem] font-bold flex items-center 
    justify-center rounded-lg text-center cursor-pointer border-2 
    ${type === "ladder" ? "border-[#d97757]" : "border-transparent"} 
    transition-colors hover:border-[#d97757]/50`}
                >
                  Ladder
                </div>
              </div>
              {/* Inserting the fields_list*/}
              <button
                type="submit"
                className="bg-[#d97757] h-10 w-full rounded-md text-white mt-5 font-bold cursor-pointer transition duration-75 active:scale-[0.95] active:duration-75 "
              >
                Create Tournament
              </button>
              {alertBox && (
                <AlertDialog open={alertBox} onOpenChange={setAlertBox}>
                  <AlertDialogTrigger asChild></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to create tournament
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={submit_btn}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Create;
