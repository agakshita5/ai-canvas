'use client';

import Download from "@/components/Download";
import Link from 'next/link';
import { useEffect, useState } from "react";
import {useImageGeneration} from "@/providers/image-generation-provider";

export default function ImagePreview(){
    const {imageUrl} = useImageGeneration();
    const [pos, setPos] = useState({x: 0, y: 0});

    // restore saved position when image changes, so work survives history switches
    useEffect(() => {
        if(!imageUrl) return;
        const saved = localStorage.getItem(`canvas-pos:${imageUrl}`);
        setPos(saved ? JSON.parse(saved) : {x: 0, y: 0});
    }, [imageUrl]);

    function startDrag(e: React.PointerEvent) {
        e.preventDefault();
        // offset between pointer and image position, kept constant while dragging
        const startX = e.clientX - pos.x;
        const startY = e.clientY - pos.y;

        function onMove(ev: PointerEvent) {
            setPos({x: ev.clientX - startX, y: ev.clientY - startY});
        }
        function onUp(ev: PointerEvent) { // on drag release
            // auto-save final position for this image
            localStorage.setItem(`canvas-pos:${imageUrl}`, JSON.stringify({x: ev.clientX - startX, y: ev.clientY - startY}));
            window.removeEventListener('pointermove', onMove);
        }
        window.addEventListener('pointermove', onMove);
        window.addEventListener('pointerup', onUp, {once: true});
    }

    function resetCanvas() {
        localStorage.removeItem(`canvas-pos:${imageUrl}`);
        setPos({x: 0, y: 0});
    }

    return (
        <>
            <div className="flex-1 flex flex-col bg-[#554971] overflow-hidden">

                {/* MAIN AREA */}
                <div className="flex-1 overflow-auto flex items-center justify-center p-4 pb-10  bg-[radial-gradient(circle,rgba(237,237,237,0.18)_1.5px,transparent_1px)] [background-size:24px_24px]">
                    <div className="flex items-center justify-center w-full h-full">
                        {/* CANVAS (image area) */}
                        <div className="w-full max-w-5xl flex items-center justify-center">
                            <div className="relative w-full">
                                {/* Canvas with blur background */}
                                <div className="w-full min-h-[600px] flex items-center justify-center rounded-xl shadow-2xl relative">
                                    <div className="absolute inset-0 flex items-center justify-center z-0">
                                    </div>                          
                                    {/* image */}
                                    {imageUrl ? 
                                        (<img
                                            className="rounded-xl z-10 shadow-xl shadow-[0_0_60px_10px_rgba(22,36,86,0.5)] max-h-[550px] max-w-full object-contain cursor-grab active:cursor-grabbing"
                                            style={{transform: `translate(${pos.x}px, ${pos.y}px)`}} // move image
                                            onPointerDown={startDrag} // tracks pointer offset
                                            draggable={false} // blocks browser's native img-drag ghost
                                            src={imageUrl}
                                            alt="Generated preview"
                                        />)
                                    :
                                        (<p className="text-lg text-[#ededed]"> Write in your prompt </p>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end absolute top-8 right-8 z-20 gap-155">
                    <div className="flex gap-5">
                        <Link href="/" className="rounded-lg bg-[#89808d] px-4 py-2 text-sm font-medium text-[#ededed] shadow-md transition hover:bg-[#746c78] focus:outline-none focus:ring-4 focus:ring-[#63768D]/50 sm:text-base" >
                            Home
                        </Link>
                        <Download />
                    </div>
                    {/* reset image back to its original spot */}
                    <button onClick={resetCanvas} className=" rounded-lg bg-[#89808d] px-4 py-2 text-sm font-medium text-[#ededed] shadow-md transition hover:bg-[#746c78] focus:outline-none focus:ring-4 focus:ring-[#63768D]/50 sm:text-base">
                        Reset
                    </button>
                </div>
            </div>
        </>
    );
}
