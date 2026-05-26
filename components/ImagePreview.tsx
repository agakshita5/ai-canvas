'use client';

import Download from "@/components/Download";
import Link from 'next/link';
import {useImageGeneration} from "@/providers/image-generation-provider";

export default function ImagePreview(){
    const {imageUrl} = useImageGeneration();

    return (
        <>
            <div className="flex-1 flex flex-col bg-black overflow-hidden">

                {/* MAIN AREA */}
                <div className="flex-1 overflow-auto flex items-center justify-center p-4 pb-10">
                    <div className="flex items-center justify-center w-full h-full">
                        {/* CANVAS (image area) */}
                        <div className="w-full max-w-5xl flex items-center justify-center">
                            <div className="relative w-full">
                                {/* Canvas with blur background */}
                                <div className="w-full min-h-[600px] flex items-center justify-center rounded-xl shadow-2xl relative">
                                    <div className="absolute inset-0 flex items-center justify-center z-0">
                                        <div className="w-[85%] h-[85%] bg-black/60 blur-2xl rounded-lg"></div>
                                    </div>                          
                                    {/* image */}
                                    {imageUrl ? 
                                        (<img 
                                            className="rounded-xl z-10 shadow-2xl shadow-[0_0_60px_10px_rgba(22,36,86,0.5)] max-h-[550px] max-w-full object-contain hover:scale-[1.02] transition duration-300" 
                                            src={imageUrl}
                                            alt="Generated preview"
                                        />)
                                    :
                                        (<p className="text-lg text-slate-400"> Write in your prompt </p>)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex absolute top-8 right-8 z-20 gap-2">
                    <Link href="/" className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 shadow-md transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:text-base" >
                        Go Back
                    </Link>
                    <Download />
                </div>
            </div>
        </>
    );
}
