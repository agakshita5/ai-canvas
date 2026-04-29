// home page

// import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import PromptBar from "@/components/PromptBar";

export default function Home() {

  return (
    <>
        {/* <Navbar /> */}
        <div className="container flex">
            <Sidebar />
            <div className="prompt-container flex-box items-center w-dvw ml-40 mt-90">
              <PromptBar />
            </div>
        </div>
        
    </>
  );

}
