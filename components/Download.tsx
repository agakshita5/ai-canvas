import { useImageGeneration } from "@/providers/image-generation-provider";

export default function Download({url}: {url?: string}){
    const {imageUrl}=useImageGeneration();
    const target = url ?? imageUrl; // selected image if given, else the latest

    async function handleDownload() {
        if(!target) return;
        // stackoverflow
        try{
            const response = await fetch(target);
            if(!response.ok) throw new Error("Failed to fetch image");

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = 'download-generated.png';

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(blobUrl);
        }catch(error){
            console.error('Download failed:', error);
        }
    }
    return(
        <button onClick={handleDownload} disabled={!target}
            className="inline-flex items-center gap-2 rounded-lg bg-btn px-4 py-2 text-sm font-medium text-btn-content shadow-md transition hover:bg-btn-hover disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
            title={url ? "Download selected image" : "Download latest image"}
        >
            <svg className="h-5 w-5" viewBox="0 0 512 512" fill="currentColor">
                <path fill="currentColor" stroke="currentColor" d="M 254 88 L 249 93 L 249 331 L 193 276 Q 183 274 181 281 L 182 290 L 239 346 L 254 360 L 257 361 L 263 359 L 332 290 L 334 286 L 332 279 L 329 276 L 322 276 L 267 331 L 266 95 L 264 91 Q 261 87 254 88 Z M 128 407 L 123 409 L 120 413 L 121 422 L 125 424 L 388 424 L 390 423 L 392 420 L 391 411 L 385 407 L 128 407 Z" />
            </svg>
            Download
        </button>
    );
}