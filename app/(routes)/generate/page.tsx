// canvas page

import Sidebar from "@/components/Sidebar";
import ImagePreview from "@/components/ImagePreview";
import PromptBar from "@/components/PromptBar";

export default function Canvas() {

  return (
    <div data-theme="studio-dark" className="flex h-screen bg-canvas">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
            <ImagePreview />
            <PromptBar variant="canvas" />
        </div>
    </div>
  );

}
