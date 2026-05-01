// home page
'use client';

import Sidebar from "@/components/Sidebar";
import PromptBar from "@/components/PromptBar";

export default function Home() {

  return (
    <div className="flex h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <Sidebar />
      <main className="flex-1 flex flex-col items-center justify-center overflow-hidden p-8 bg-neutral-primary bg-[url('/background-img-2.jpg')] bg-cover bg-center bg-no-repeat">
        <div className="w-full flex flex-col items-center justify-center gap-8">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 mb-4">
              Generate Images with AI
            </h1>
            <p className="text-lg text-slate-400">
              Describe your idea and let our AI generate stunning images
            </p>
          </div>
          <PromptBar variant="home" />
        </div>
      </main>
    </div>
  );

}


