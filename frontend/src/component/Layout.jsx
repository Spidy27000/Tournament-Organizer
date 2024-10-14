import NavBar from "./NavBar";
import { Toaster } from "@/components/ui/toaster"
const Layout = ({ children }) => {
  return (
    <div className=" flex bg-[#f1efe8] h-screen">
      <NavBar/>
      <div className="flex-1 overflow-scroll overflow-x-hidden">
        {children}
        <Toaster />
      </div>
    </div>
  );
};
export default Layout;
