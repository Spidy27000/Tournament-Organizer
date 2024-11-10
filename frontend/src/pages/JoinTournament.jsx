import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { useToast } from "../../hooks/use-toast";


const JoinTournament = () => {
  const param = useParams();
  const { toast } = useToast();
  const tournamentId = param.tournamentName;
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [member_size, setMemberSize] = useState(2);
  const [isEmpty, setIsEmpty] = useState(false)
  const [team_id, setTeamId] = useState()
  const [createdTeam, setCreatedTeam] = useState(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    team_name: "",
    team_leader: userData.name,
    members: Array(member_size).fill(""),
  });
  const [createTeam, setCreateTeam] = useState({
    name: "",
    id: ""
  })
  const [addMember, setAddMember] = useState({
    team_id: "",
    username:""
  })

  const tournamentData ={
    teams: 4,
    max_size: 5
  }

  useEffect(()=>{
    if (createdTeam)
    {
      navigate(`/ViewTournament/${tournamentId}`)
      toast({
        title: "Success",
        description: "Team Created Successfully",
      });
    }
  },[createdTeam])

  useEffect(()=>{
    const handleIsEmpty = () =>
      {
        if (tournamentData.teams < tournamentData.max_size)
        {
          setIsEmpty(true)
          return
        }
        setIsEmpty(false)
        
      }

      handleIsEmpty()
    
  },[])
  
  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setMemberSize(newSize);
    setFormData({
      ...formData,
      members: Array(newSize - 1).fill(""),
    });
  };

  const handleMemberChange = (index, value) => {
    setFormData({
      ...formData,
      members: formData.members.map((member, i) =>
        i === index ? value : member
      ),
    });
  };

  const dynamicFields = () => {
    return Array.from({ length: member_size - 1}, (_, index) => (
      <div key={index} className="flex items-left gap-2 flex-col">
        <label className="font-semibold">Member {index + 2}</label>
        <input
          className="border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5 transition-all"
          type="text"
          value={formData.members[index]}
          onChange={(e) => handleMemberChange(index, e.target.value)}
        />
      </div>
    ));
  };

  const handleAddMember = async (id) => {
    addMember.team_id = id
    addMember.username = "anurag"
    try {
      const response = await fetch("http://localhost/addMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addMember),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === "Failed") {
        console.log("No account matched");
        console.log(formData);
        setApiError("No Account Found");
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error,
        });
        return;
      } else {
        console.log(data)
      }
    } catch (error) {
      console.log("kuch to gadbad hai");
      console.log(JSON.stringify(error));
    }
  }

  const handleSubmit = async (e) =>
  {
    e.preventDefault();
    if (formData.team_name == "" || formData.team_name == " ")
    {
      toast({
        variant: "destructive",
        title: "Please Enter Team Name"
      })
      return
    }
    createTeam.name = formData.team_name
    createTeam.id = JSON.parse(localStorage.getItem("userId"))
    console.log(formData)
    try {
      const response = await fetch("http://localhost/createTeam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createTeam),
      });

      const data = await response.json();
      console.log(data);
      if (data.status === "Failed") {
        console.log("No account matched");
        console.log(formData);
        setApiError("No Account Found");
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error,
        });
        return;
      } else {
        console.log(data)
        setCreatedTeam(true);
      }
    } catch (error) {
      console.log("kuch to gadbad hai");
      console.log(JSON.stringify(error));
    }
  }

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
               
              <h1 className=" text-[3rem] font-extrabold">Sorry, The tournament is full</h1>
              </div>
          )}
        
        <div className=" pt-10 flex flex-wrap gap-6 justify-center">
          
          {isEmpty && (
            <form
            action=""
            onSubmit={handleSubmit}
            className="w-[42%] bg-[#f2efed] p-5 border-2 rounded-lg shadow-lg flex flex-col gap-2"
          >
            <h1 className=" text-2xl font-bold">Team Leader</h1>
            <h2 className=" text-md font-semibold">{userData.name} (You)</h2>

            <h1 className=" text-2xl font-bold pt-5">Team Name</h1>
            <input
              className=" border-solid border-2 border-[#dcdcdc] focus:border-[#e7a792] hover:border-[#e7a792] h-10 w-full rounded-md outline-none pl-5 pr-5 transition-all"
              type="text"
              id="Team_Name"
              value={formData.team_name}
              onChange={(e) =>
                setFormData({ ...formData, team_name: e.target.value })}
            />
            <Button type="submit" className=" hover:translate-y-[-3px] w-28 transition-all mt-5">
              Create Team
            </Button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default JoinTournament;
