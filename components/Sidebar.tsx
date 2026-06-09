'use client';

import { UserButton } from "@clerk/nextjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useImageGeneration, type CanvasImage } from "@/providers/image-generation-provider";

type Generation = {
    id: string;
    prompt: string;
    image_url: string;
    aspect_ratio: string | null;
    created_at: string;
    session_id: string | null;
}

type Session = {
    key: string;     
    title: string;   
    images: CanvasImage[]; 
    latest: string;   
}

function Sidebar() {
    const [history, setHistory] = useState<Generation[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const {newSession, openSession, sessionId} = useImageGeneration();

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

    // group flat history into one entry per chat session
    const sessions = useMemo(() => {
        const sessionsMap = new Map<string, Session>();
        for (const g of history) {
            const key = g.session_id ?? g.id;
            const img: CanvasImage = {id: g.id, url: g.image_url, prompt: g.prompt, aspectRatio: g.aspect_ratio ?? ''};
            const existing = sessionsMap.get(key);
            if (existing) {
                existing.images.unshift(img);
                existing.title = g.prompt;
            } else {
                sessionsMap.set(key, {key, title: g.prompt, images: [img], latest: g.created_at});
            }
        }
        return [...sessionsMap.values()].sort((a, b) => b.latest.localeCompare(a.latest));
    }, [history]);

    const restored = useRef(false);
    useEffect(() => {
        if (restored.current || sessions.length === 0) return;
        restored.current = true;
        const last = localStorage.getItem('last-session');
        const session = last && sessions.find(s => s.key === last);
        if (session) openSession(session.key, session.images);
    }, [sessions, openSession]);

    return (
        <aside className="h-screen flex-shrink-0">
            <div className={`flex h-full flex-col overflow-y-auto bg-panel backdrop-blur-md pt-8 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
                <div className="flex px-4 items-center justify-between gap-2">
                    {isSidebarOpen &&
                    (<h2 className="text-lg font-medium text-content truncate">
                        Chats
                    </h2>)}
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="flex-shrink-0 p-1 hover:bg-highlight rounded transition-colors"
                    >
                        {/* got svg from opening .svg file in text editor */}
                        <svg
                            className="h-5 w-5 text-content"
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
                    <button onClick={()=> newSession()} className="flex w-full gap-x-4 rounded-lg bg-btn p-4 items-center text-sm font-medium text-btn-content transition-colors duration-200 hover:bg-btn-hover focus:outline-none">
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
                    {sessions.map((session) =>
                        (
                        <button
                            key={session.key}
                            onClick={() => openSession(session.key, session.images)}
                            className={`flex flex-col w-full px-3 py-2 hover:bg-highlight rounded transition-colors ${isSidebarOpen && session.key === sessionId ? "bg-highlight" : ""}`} // highlight session being viewed
                        >
                            {isSidebarOpen && (
                                <>
                                    <h1 className="text-left text-sm text-content">{session.title}</h1>
                                    <p className="text-left text-xs text-content/70">{new Date(session.latest).toLocaleDateString()}</p>
                                </>
                            )}
                        </button>
                    ))}
                </div>

                <div className="w-full space-y-2 px-2 py-4 border-t border-edge">
                    <UserButton />
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
