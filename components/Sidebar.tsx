'use client';

import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useImageGeneration } from "@/providers/image-generation-provider";

type Generation = {
    id: string;
    prompt: string;
    image_url: string;
    aspect_ratio: string | null;
    created_at: string;
}

function Sidebar() {
    const [history, setHistory] = useState<Generation[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const {selectGeneration, imageUrl} = useImageGeneration();
    
    useEffect(() => {
        async function getHistory() {
            const res = await fetch("/api/history");
            if(!res.ok) return;

            const data = await res.json();
            if(data.success){
                setHistory(data.generations ?? []);
            }
        }

        getHistory();
        window.addEventListener('generation-created', getHistory);

        return () => {
            window.removeEventListener('generation-created', getHistory);
        };
    }, []);

    return (
        <aside className="h-screen flex-shrink-0">
            <div className={`flex h-full flex-col overflow-y-auto bg-[#36213E] pt-8 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
                <div className="flex px-4 items-center justify-between gap-2">
                    {isSidebarOpen &&
                    (<h2 className="text-lg font-medium text-[#ededed] truncate">
                        Chats
                    </h2>)}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
                    >
                        {/* got svg from opening .svg file in text editor */}
                        <svg
                            className="h-5 w-5 text-[#ededed]"
                            viewBox="0 0 512 512"
                            fill="currentColor"
                        >
                            <g transform="translate(0,512) scale(0.1,-0.1)">
                                <path d="M1045 4415 c-221 -49 -407 -197 -500 -400 -69 -148 -65 -68 -65 -1455 0 -1387 -4 -1307 65 -1455 86 -187 251 -327 460 -392 57 -17 130 -18 1550 -18 1389 0 1494 1 1553 18 202 55 373 197 462 382 74 155 70 67 70 1465 0 1387 4 1307 -65 1455 -83 180 -231 312 -430 382 l-80 28 -1480 2 c-1200 1 -1491 -1 -1540 -12z m715 -1856 l0 -1551 -307 5 c-248 4 -320 8 -368 22 -161 45 -247 150 -275 333 -7 44 -10 464 -8 1237 l3 1170 23 67 c52 154 159 234 342 258 30 4 175 8 323 9 l267 1 0 -1551z m2275 1527 c160 -47 246 -149 275 -328 14 -86 14 -2310 0 -2396 -30 -182 -112 -278 -283 -330 -46 -14 -164 -16 -999 -19 l-948 -4 0 1551 0 1551 948 -4 c872 -3 952 -4 1007 -21z"/>
                            </g>
                        </svg>
                    </button>
                </div>
                {/* new chat btn */}
                <div className="mx-2 mt-8">
                    <button onClick={()=> selectGeneration('','','')} className="flex w-full gap-x-4 rounded-lg bg-[#89808d] p-4 items-center text-sm font-medium text-[#ededed] transition-colors duration-200 hover:bg-[#746c78] focus:outline-none">
                        <svg className="h-6 w-6 flex-shrink-1" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 5l0 14"></path>
                            <path d="M5 12l14 0"></path>
                        </svg>
                        {isSidebarOpen && "New Chat"}
                    </button>
                </div>

                {/* Previous chats container */}
                <div className="flex-1 overflow-y-auto px-2 py-4">
                    {history.map((item) => 
                        (
                        <button
                            key={item.id}
                            onClick={() => selectGeneration(item.image_url, item.prompt, item.aspect_ratio ?? '')}
                            className={`flex flex-col w-full px-3 py-2 hover:bg-[#60517c65] rounded transition-colors ${isSidebarOpen && item.image_url === imageUrl ? "bg-[#60517c65]" : ""}`} // highlight session being viewed
                        >
                            {isSidebarOpen && (
                                <>
                                    <h1 className="text-left text-sm text-[#ededed]">{item.prompt}</h1>
                                    <p className="text-left text-xs text-[#ededed]/70">{new Date(item.created_at).toLocaleDateString()}</p>
                                </>
                            )}
                        </button>
                    ))}
                </div>

                <div className="w-full space-y-2 px-2 py-4 border-t border-white/20">
                    <UserButton />
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
