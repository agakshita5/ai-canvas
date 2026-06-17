// handles the API call
// returns generate function that PromptBar will call
'use client';

import { createContext, useContext, useState, ReactNode  } from 'react';

export type CanvasImage = {id: string, url: string, prompt: string, aspectRatio: string};

interface ImageContextType{
    imageUrl: string;
    loading: boolean;
    error: string;
    lastSize: string;
    lastPrompt: string;
    generate: (prompt: string, size: string) => Promise<boolean>;
    editImage: (imageUrl: string, instruction: string) => Promise<boolean>;
    sessionId: string;
    images: CanvasImage[];
    newSession: () => void;
    openSession: (id: string, imgs: CanvasImage[]) => void;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function ImageGenerationProvider({ children }: { children: ReactNode }) {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [lastPrompt, setLastPrompt] = useState<string>('');
    const [lastSize, setLastSize] = useState<string>('');
    // each chat session keeps its own canvas images
    const [sessions, setSessions] = useState<Record<string, CanvasImage[]>>({});
    const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
    const images = sessions[sessionId] ?? [];

    function persistSession(id: string) {
        if (typeof window !== 'undefined') localStorage.setItem('last-session', id);
    }
    function clearPersistedSession() {
        if (typeof window !== 'undefined') localStorage.removeItem('last-session');
    }

    function addImage(img: CanvasImage) {
        setSessions(prev => {
            const current = prev[sessionId] ?? [];
            return current.some(i => i.id === img.id) ? prev : {...prev, [sessionId]: [...current, img]};
        });
    }

    async function editImage(imageUrl: string, instruction: string){
        setError('');
        
        try{
            const res = await fetch("/api/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({imageUrl, instruction, sessionId}), 
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || `Server error: ${res.status}`);
            }
            if(data.success){
                console.log('api returned:', data.imageUrl);
                setImageUrl(data.imageUrl);
                setLastPrompt(instruction);
                setLastSize(data.aspectRatio);
                addImage({id: data.id, url: data.imageUrl, prompt: instruction, aspectRatio: data.aspectRatio});
                persistSession(sessionId); 
                window.dispatchEvent(new Event('generation-created'));
                return true;
            }else{
                console.log('error while generating: ',data.error);
            }
        }catch(error){
            setError(error instanceof Error ? error.message : "Something went wrong");
            return false;
        }
        return false;
    }

    async function generate(prompt: string, size: string) {
        setLoading(true);
        setError('');
        
        try{
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({prompt, size, sessionId}), 
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
                addImage({id: data.id, url: data.imageUrl, prompt, aspectRatio: data.aspectRatio ?? size});
                persistSession(sessionId); 
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

    function newSession() {
        setSessionId(crypto.randomUUID());
        setImageUrl('');
        setLastPrompt('');
        setLastSize('');
        setError('');
        clearPersistedSession(); 
    }
    
    // open an existing chat 
    function openSession(id: string, imgs: CanvasImage[]) {
        setSessions(prev => ({...prev, [id]: imgs}));
        setSessionId(id);
        persistSession(id);
        const last = imgs[imgs.length - 1]; 
        setImageUrl(last?.url ?? '');
        setLastPrompt(last?.prompt ?? '');
        setLastSize(last?.aspectRatio ?? '');
        setError('');
    }

    return (
        <ImageContext.Provider value={{imageUrl, loading, error, lastPrompt, lastSize, generate, editImage, sessionId, images, newSession, openSession}}>
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
