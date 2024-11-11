import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { useState, useEffect } from "react";
import { useToast } from "../../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const JoinTournament = () => {
  const param = useParams();
  const { toast } = useToast();
  const tournamentId = param.tournamentName;
  const userId = JSON.parse(localStorage.getItem("userId"));
  const [member_size, setMemberSize] = useState(2);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [teamDetails, setTeamDetails] = useState({
    team_name: "",
    no_of_members: 0,
    members: [],
  });
  const [isEmpty, setIsEmpty] = useState(false);
  const [team_id, setTeamId] = useState();
  const [createdTeam, setCreatedTeam] = useState(false);
  const navigate = useNavigate();
  const [createTeam, setCreateTeam] = useState({
    name: "",
    id: "",
  });
  const [addMember, setAddMember] = useState({
    team_id: "",
    username: "",
  });

  const tournamentData = {
    teams: 4,
    max_size: 5,
  };

  const [userData, setUserData] = useState({
    team_id: "",
    team_leader: "",
    name: "",
  });

  //handling member select
  const handleMemberSelect = (memberId, username) => {
    setSelectedMembers((prev) => {
      // Check if the username already exists in the array
      const existingIndex = prev.findIndex(
        (member) => member.username === username
      );

      // If member exists, remove them (unchecked)
      if (existingIndex !== -1) {
        return prev.filter((member) => member.username !== username);
      } else {
        return [...prev, { username, id: memberId }];
      }
    });
  };

  useEffect(() => {}, [userData]);

  //checking if the tournament is full or not
  useEffect(() => {
    const handleIsEmpty = () => {
      if (tournamentData.teams < tournamentData.max_size) {
        setIsEmpty(true);
        return;
      }
      setIsEmpty(false);
    };
    handleIsEmpty();
  }, [tournamentData.max_size, tournamentData.teams]);

  //getting user details
  useEffect(() => {
    const handleUserData = async () => {
      try {
        const response = await fetch(`http://localhost/view/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        console.log(data);

        userData.name = data.name;
        userData.team_id = data.team_id;
        userData.team_leader = data.team_leader;

        console.log(userData);

        setDataLoaded(true);

        if (userData.team_id == "" || userData.team_id == null) {
          navigate(`/team`);
          toast({
            variant: "destructive",
            title: "No Team Found",
            description: "Please create or join a team",
          });
          console.log(userData);
          return;
        }

        if (!userData.team_leader) {
          navigate(`/ViewTournament/${tournamentId}`);
          toast({
            title: "You are already in a team",
          });
          console.log("already in a team");
        }

        console.log(userData);
      } catch (error) {
        console.log("not having userData from database", error.message);
      }
    };
    handleUserData();
  }, []);

  //getting team details
  useEffect(() => {
    const getTeamDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost/view/team/${userData.team_id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);
        setTeamDetails(data);
      } catch (error) {
        console.log("not having teamData from database", error.message);
      }
    };

    getTeamDetails();
  }, [userData.team_id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/ViewTournament/${tournamentId}`);
  };

  return (
    <div className=" w-full p-9 scroll-smooth">
      <div className="">
        {isEmpty && (
          <h1 id="heading" className=" font-extrabold text-[3.5rem]">
            Tournament name
          </h1>
        )}
        {!isEmpty && (
          <div className=" flex justify-center items-center h-[30rem]">
            <h1 className=" text-[3rem] font-extrabold">
              Sorry, The tournament is full
            </h1>
          </div>
        )}

        <div className=" pt-10 flex flex-wrap gap-6 justify-center">
          {isEmpty && dataLoaded && userData.team_leader && (
            <div className="w-[42%] bg-[#f2efed] p-5 border-2 rounded-lg shadow-lg flex flex-col gap-2">
              <h1 className=" text-2xl font-bold">Team Leader</h1>
              <h2 className=" text-md font-semibold">{userData.name} (You)</h2>

              <h1 className=" text-2xl font-bold pt-5">Team Name</h1>
              <h2 className=" text-md font-semibold">
                {teamDetails.team_name}
              </h2>
              <div>
                <h1 className=" text-2xl font-bold pb-2 pt-5">Members</h1>
                {selectedMembers.map((user, index) => (
                  <div
                    key={index}
                    className="flex bg-[#fefdfd] rounded-md border-2 p-3 hover:shadow-md transition-all mb-5"
                  >
                    <div className="w-[10%] text-center text-[1.0rem] border-r-2 mr-5">
                      {index + 1}
                    </div>
                    <div className="flex justify-center items-center text-[1.0rem]">
                      {user.username}
                    </div>
                  </div>
                ))}
                <Dialog className=" text-left">
                  <DialogTrigger>
                    <Button className="">Add Member</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <div className=" text-2xl font-bold">
                        <p>Team {teamDetails.team_name}</p>
                      </div>
                      <DialogTitle className=" pb-5 flex justify-between items-center">
                        <p>Add Member to the Team </p>
                      </DialogTitle>
                      <DialogDescription className=" flex flex-col gap-2">
                        {teamDetails.members.map((member, index) => (
                          <div
                            key={index}
                            className="flex bg-[#fefdfd] rounded-md border-2 p-3 hover:shadow-md transition-all mb-2"
                          >
                            <div className="w-[10%] text-center text-[1.0rem] border-r-2 mr-5">
                              {index + 1}
                            </div>
                            <div className="flex justify-between items-center text-[1.0rem] w-[85%]">
                              <p>{member.name}</p>
                              <Checkbox
                                id={`checkbox-${index}`}
                                checked={selectedMembers.some(
                                  (selectedMember) =>
                                    selectedMember.username === member.username
                                )}
                                onCheckedChange={() =>
                                  handleMemberSelect(index, member.username)
                                }
                                className="ml-4 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                              />
                            </div>
                          </div>
                        ))}
                      </DialogDescription>
                    </DialogHeader>
                    <DialogClose asChild>
                      <Button className="pt-2">Submit</Button>
                    </DialogClose>
                  </DialogContent>
                </Dialog>
              </div>
              <Button
                onClick={handleSubmit}
                className=" hover:translate-y-[-3px] w-full transition-all mt-5"
              >
                Join Tournament
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinTournament;
