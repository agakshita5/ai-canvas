// handles the API call
// returns generate function that PromptBar will call
'use client';

import { createContext, useContext, useState, ReactNode  } from 'react';

interface ImageContextType{
    imageUrl: string;
    loading: boolean;
    error: string;
    lastSize: string;
    lastPrompt: string;
    generate: (prompt: string, size: string) => Promise<boolean>;
    selectGeneration: (imageUrl: string, prompt: string, size: string) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageGenerationProvider({ children }: { children: ReactNode }) {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [lastPrompt, setLastPrompt] = useState<string>('');
    const [lastSize, setLastSize] = useState<string>('');

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
                console.log('api returned:', data.imageUrl);
                setImageUrl(data.imageUrl);
                setLastPrompt(prompt);
                setLastSize(size);
                window.dispatchEvent(new Event('generation-created'));
                return true;
            }else{
                console.log('error while generating: ',data.error);
            }
        }catch(error){
            setError(error instanceof Error ? error.message : "Something went wrong");
            return false;
        }finally{
            setLoading(false);
        }
        return false;
    }

    // show a previously generated image (e.g. picked from sidebar history) on the canvas
    function selectGeneration(imageUrl: string, prompt: string, size: string) {
        setImageUrl(imageUrl);
        setLastPrompt(prompt);
        setLastSize(size);
        setError(''); // so a stale error from a failed generation doesn't linger over the selected image
    }

    return (
        <ImageContext.Provider value={{imageUrl, loading, error, lastPrompt, lastSize, generate, selectGeneration}}>
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
