import { Button } from "../components/ui/button";

const TournamentsCard = ({ data }) => {
  return (
    <>
      <div className="hover:scale-105 transition-all hover:shadow-lg w-[32%] flex flex-col gap-8 h-[15.5rem] cursor-pointer border-[0.08rem] p-4 bg-[#f6f4f0] rounded-xl shadow-md">
        <div>
          <h1 className=" line-clamp-1 text-2xl font-bold text-center">VCT Pacific</h1>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-10 font-extrabold justify-center items-center text-5xl">
            <div>2</div>
            <div>:</div>
            <div>1</div>
          </div>
          <div className="flex gap-20 justify-center items-center">
            <div>Team1</div>
            <div>Team2</div>
          </div>
          <div className=" border-t-[0.1rem] pt-3 mt-4 flex justify-between items-center">
            <Button className=" hover:translate-y-[-3px]  transition-all">
              Join
            </Button>
            <div className="flex justify-center items-center gap-2 font-bold">
              <span class="relative flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#64ce54] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-[#76cb69]"></span>
              </span>
              On Going
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TournamentsCard;
