// handles the API call
// returns generate function that PromptBar will call
'use client';

import { createContext, useContext, useState, ReactNode  } from 'react';

interface ImageContextType{
    imageBase64: string;
    loading: boolean;
    error: string;
    lastSize: string;
    lastPrompt: string;
    generate: (prompt: string, size: string) => Promise<boolean>;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageGenerationProvider({ children }: { children: ReactNode }) {
    const [imageBase64, setImageBase64] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [lastPrompt, setLastPrompt] = useState<string>('');
    const [lastSize, setLastSize] = useState<string>('');

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
                setLastPrompt(prompt);
                setLastSize(size);
                return true;
            }else{
                console.log('error while generating: ',data.error);
            }
        }catch(error){
            setError(error);
            return false;
        }finally{
            setLoading(false);
        }
        return false;
    }

    return (
        <ImageContext.Provider value={{imageBase64, loading, error, lastPrompt, lastSize, generate}}>
            {children}
        </ImageContext.Provider>
    );
}

export function useImageGeneration() {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImageGeneration must be used within ImageGenerationProvider');
  }
  return context;
}
