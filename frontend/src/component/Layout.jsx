import NavBar from "./NavBar";
const Layout = ({ children }) => {
  return (
    <div className=" flex bg-[#f1efe8]">
      <NavBar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};
export default Layout;
