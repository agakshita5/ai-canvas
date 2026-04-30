// home page

import Sidebar from "@/components/Sidebar";
import PromptBar from "@/components/PromptBar";

export default function Home() {

  return (
    <>
        {/* <Navbar /> */}
        <div className="container flex">
            <Sidebar />
            <div className="flex-box flex-1 justify-center content-center pl-50 pb-50">
              <PromptBar />
            </div>
        </div>
        
    </>
  );

}
