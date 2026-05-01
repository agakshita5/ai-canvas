export default function Download(){
    return(
        <>
            <div className="absolute top-10 right-15 z-20 flex gap-2">
                <button 
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