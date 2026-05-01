import Download from "@/components/Download";

export default function ImagePreview(){
    return (
        <>
            <div className="flex-1 flex flex-col bg-black overflow-hidden">

                {/* MAIN AREA */}
                <div className="flex-1 overflow-auto flex items-center justify-center p-4">

                    {/* CANVAS (image area) */}
                    <div className="max-w-5xl w-full flex items-center justify-center">
                        <div className="bg-slate-800 w-full min-h-[600px] flex items-center justify-center rounded-xl shadow-2xl">
                            
                            <div className="relative w-full flex items-center justify-center p-6">
                                {/* background blur */}
                                <div className="absolute inset-0 flex items-center justify-center z-0">
                                    <div className="w-[85%] h-[85%] bg-black/60 blur-2xl rounded-lg"></div>
                                </div>
                                {/* image */}
                                <img 
                                    className="rounded-xl z-10 shadow-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] max-h-[600px] max-w-full object-contain hover:scale-[1.02] transition duration-300" 
                                    src="output_image/nature-image.jpg" 
                                    alt="nature" />
                            </div>
                        </div>
                    </div>
                </div>
                <Download />
            </div>
        </>
    );
}