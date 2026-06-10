import { DownloadSimpleIcon } from "@phosphor-icons/react";
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
            <DownloadSimpleIcon size={20} />
            Download
        </button>
    );
}