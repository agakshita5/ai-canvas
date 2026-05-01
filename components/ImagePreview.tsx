import Download from "@/components/Download";

export default function ImagePreview(){
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
                                    <img 
                                        className="rounded-xl z-10 shadow-2xl shadow-[0_0_60px_10px_rgba(22,36,86,0.5)] max-h-[550px] max-w-full object-contain hover:scale-[1.02] transition duration-300" 
                                        src="output_image/nature-image.jpg" 
                                        alt="Generated preview"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute top-4 right-4 z-20">
                    <Download />
                </div>
            </div>
        </>
    );
}