import { Button } from "../components/ui/button";
import ViewTournament from "../pages/ViewTournament";
import { useNavigate } from "react-router";

const LadderTournamentCard = ({ data }) => {
  const navigate = useNavigate();

  const view_tournament = () => {
    navigate(`/ViewTournament/${data.id}`);
  };

  return (
    <>
      <div
        className="hover:scale-105 transition-all hover:shadow-lg w-[32%] flex flex-col gap-5 justify-between items-center h-[14rem] cursor-pointer border-[0.08rem] p-4 bg-[#f6f4f0] rounded-xl shadow-md"
        onClick={view_tournament}
      >
        <div className="h-full w-full flex flex-col justify-between gap-2">
          <div className="w-[80%] h-full font-extrabold flex justify-center items-center text-4xl">
          {data.name}
          </div>
          <div className="flex gap-20 justify-center items-center"></div>
          <div className=" border-t-[0.1rem] pt-2 mt-2 flex justify-between items-center">
            {data.status == "Not Started" && (
              <Button className=" hover:translate-y-[-3px]  transition-all">
                Join
              </Button>
            )}
            <div className="flex justify-center items-center gap-2 font-bold  ">
              {(data.status == "On going") && (
                <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#64ce54] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-[#76cb69]"></span>
              </span>
              )}
              {data.status}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default LadderTournamentCard;
