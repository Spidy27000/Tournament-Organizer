import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { useToast } from "../../hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Plus, Minus } from "lucide-react";
const Team = () => {
    const userId = JSON.parse(localStorage.getItem("userId"))
    const [isLeader, setIsLeader] = useState(false)
    const [isInTeam, setIsInTeam] = useState(false)
    const [addMember, setAddMember] = useState({
      team_id: "",
      username: ""
    })
    const [members,setMembers] = useState([{
      id: 1,
      value: ""
    }])
    const { toast } = useToast();

    const [userData, setUserData] = useState({
        team_id: "",
        team_leader: "",
        name: ""
    })
    const [formData, setFormData] = useState({
        team_name: "",
        team_leader: userData.name,
      });
      const [createTeam, setCreateTeam] = useState({
        name: "",
        id: ""
      })

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const response = await fetch(`http://localhost/view/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);
        setUserData({
            team_id: data.team_id,
            team_leader: data.team_leader,
            name: data.name
        });
      } catch (error) {
        console.log("not having userData from database", error.message);
      }
    };

    getUserInfo()



    console.log(isInTeam)
    console.log(isLeader)
  }, []);

  useEffect(()=>{
    if (userData.team_id == "")
        {
            setIsLeader(false)
            setIsInTeam(false)  
        }
        if (userData.team_leader != true && userData.team_id != "")
        {
            setIsLeader(false)
            setIsInTeam(true)
        }
        if (userData.team_id != true)
        {
            setIsLeader(true)
        }
  },[userData])


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
          toast({
            variant: "destructive",
            title: "Error",
            description: data.error,
          });
          return;
        } else {
          console.log(data)
          toast({
            title: "Success",
            description: "Team Created Successfully",
          });
          console.log()
        }
      } catch (error) {
        console.log("kuch to gadbad hai");
        console.log(error.message);
      }
    }

  return (
    <>
      <div className=" p-9">
        <div className=" flex justify-between items-center">
        <h1 className=" text-5xl font-extrabold">Team</h1>
        {isLeader && (
                <div><Dialog>
                <DialogTrigger>
                  <Button>Add Member</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                  <div className=" text-2xl font-bold"><p>Team {"Team_Name"}</p></div>
                    <DialogTitle className=" pb-5 flex justify-between items-center">
                    
                       <p>Add Member to the Team{" "}</p>
    
                    </DialogTitle>
                    <DialogDescription className=" flex flex-col gap-2">
                      
                        <div className=" flex bg-[#fefdfd] rounded-md border-2 hover:shadow-md transition-all">
                        <div className=" w-[10%] text-center text-[1.0rem] border-r-2 mr-5 flex justify-center items-center">
                          1
                        </div>
                        <div className=" flex justify-center items-center text-[1.0rem] w-[80%]">
                          <input type="text" className=" outline-none h-10 text-md w-full" onChange={(e) => handleInputChange(member.id, e.target.value)}/>
                        </div>
                      </div>
                      
                      
                      
                    </DialogDescription>
                  </DialogHeader>
                  <DialogClose asChild>
                  <Button className="pt-2">Submit</Button>
              </DialogClose>
                </DialogContent>
              </Dialog></div>
            )}
        </div>
        {!isInTeam && (
          <h1 className=" font-bold pt-4 text-3xl">Create Team</h1>
        )}
        <div className=" flex justify-center pt-2">
            {!isInTeam && (
                <form
                action=""
                onSubmit={handleSubmit}
                className="w-[42%] bg-[#f2efed] p-5 border-2 rounded-lg shadow-lg flex flex-col gap-2"
              >
                <h1 className=" text-2xl font-bold">Team Leader</h1>
                <h2 className=" text-md font-semibold">{userData.name}</h2>
    
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

            

            {isInTeam &&(
              <div className=" w-[35rem] pt-5">
                {members.map(member =>
                    <div key={member.id} className=" flex bg-[#fefdfd] rounded-md border-2 p-3 hover:shadow-md transition-all">
                    <div className=" w-[10%] text-center text-[1.0rem] border-r-2 mr-5">
                      {member.id}
                    </div>
                    <div className=" flex justify-center items-center text-[1.0rem]">
                      {member.value}
                    </div>
                  </div>
                  )}
              </div>
            )}
        
          </div>
      </div>
    </>
  );
};
export default Team;
