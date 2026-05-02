import { setegid } from 'process';
import { useState } from 'react';

export default function useImageGeneration(){
    const [imageBase64, setImageBase64] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);

    // const { messages, sendMessage } = useChat();
    async function generate(prompt: string, size: string) {
        setLoading(true);
        setError('');
        
        try{
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({prompt, size}),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || `Server error: ${res.status}`);
            }
            if(data.success){
                console.log('api returned:', data.imageBase64);
                setImageBase64(data.imageBase64);
            }else{
                console.log('error while generating: ',data.error);
            }
        }catch(error){
            setError(error);
        }finally{
            setLoading(false);
        }
    }

    return{imageBase64, loading, error, generate};
}