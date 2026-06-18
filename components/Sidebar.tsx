'use client';

import { UserButton } from "@clerk/nextjs";
import { SidebarSimpleIcon, PlusIcon } from "@phosphor-icons/react";
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

    // prefer the persisted canvas over raw DB history
    function effectiveImages(key: string, dbImages: CanvasImage[]): CanvasImage[] {
        if (typeof window === 'undefined') return dbImages;
        const raw = localStorage.getItem(`canvas-images:${key}`);
        if (raw) { try { return JSON.parse(raw); } catch { /* fall through */ } }
        return dbImages;
    }

    const restored = useRef(false);
    useEffect(() => {
        if (restored.current || sessions.length === 0) return;
        restored.current = true;
        const last = localStorage.getItem('last-session');
        const session = last && sessions.find(s => s.key === last);
        if (session) openSession(session.key, effectiveImages(session.key, session.images));
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
                        <SidebarSimpleIcon className="h-5 w-5 text-content" weight="duotone" />
                    </button>
                </div>
                {/* new chat btn */}
                <div className="mx-2 mt-8">
                    <button onClick={()=> newSession()} className={`flex w-full gap-3 rounded-lg bg-btn p-2 items-center text-sm text-btn-content ${isSidebarOpen ? "" : "justify-center"} transition-colors duration-200 hover:bg-btn-hover focus:outline-none`}>
                        <PlusIcon size={20} weight="bold" />
                        {isSidebarOpen && "New Chat"}
                    </button>
                </div>

                {/* Previous chats container */}
                <div className="flex-1 overflow-y-auto px-2 py-4">
                    {sessions.map((session) =>
                        (
                        <button
                            key={session.key}
                            onClick={() => openSession(session.key, effectiveImages(session.key, session.images))}
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
