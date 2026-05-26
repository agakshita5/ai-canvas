import { useImageGeneration } from "@/providers/image-generation-provider";

export default function Download(){
    const {imageBase64}=useImageGeneration();

    // testing purpose
    // const imageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
    
    async function handleDownload() {
        if(!imageBase64) return;
        // stackoverflow
        try{
            const b64toBlob = (imageBase64, contentType='', sliceSize=512) => {
                const byteCharacters = atob(imageBase64);
                const byteArrays = [];
                for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                    const slice = byteCharacters.slice(offset, offset + sliceSize);
                    const byteNumbers = new Array(slice.length);
                    for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    byteArrays.push(byteArray);
                }
                const blob = new Blob(byteArrays, {type: contentType});
                return blob;
            }
            const blob = b64toBlob(imageBase64, 'image/png');
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
        <>
            <div className="flex gap-2">
                <button onClick={handleDownload} disabled={!imageBase64}
                    className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md"
                    title="Download image"
                >
                    <svg className="h-6 w-6" viewBox="0 0 512 512" fill="currentColor">
                        <path fill="currentColor" stroke="currentColor" d="M 254 88 L 249 93 L 249 331 L 193 276 Q 183 274 181 281 L 182 290 L 239 346 L 254 360 L 257 361 L 263 359 L 332 290 L 334 286 L 332 279 L 329 276 L 322 276 L 267 331 L 266 95 L 264 91 Q 261 87 254 88 Z M 128 407 L 123 409 L 120 413 L 121 422 L 125 424 L 388 424 L 390 423 L 392 420 L 391 411 L 385 407 L 128 407 Z" />
                    </svg>
                </button>
            {/* more buttons can be added here */}
            </div>
        </>
    );
}


