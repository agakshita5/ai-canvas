// canvas page

import Sidebar from "@/components/Sidebar";
import ImagePreview from "@/components/ImagePreview";
import PromptBar from "@/components/PromptBar";

export default function Canvas() {

  return (
    <div className="flex h-screen bg-[#554971]">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
            <ImagePreview />
            <PromptBar variant="canvas" />
        </div>
    </div>
  );

}
