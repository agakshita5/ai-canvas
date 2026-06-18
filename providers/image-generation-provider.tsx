// handles the API call
// returns generate function that PromptBar will call
'use client';

import { createContext, useContext, useEffect, useRef, useState, ReactNode  } from 'react';
import { savePos } from '@/lib/canvas-pos';

export type CanvasImage = {id: string, url: string, prompt: string, aspectRatio: string};

interface ImageContextType{
    imageUrl: string;
    loading: boolean;
    error: string;
    lastSize: string;
    lastPrompt: string;
    generate: (prompt: string, size: string) => Promise<boolean>;
    editImage: (imageUrl: string, instruction: string, referenceImage?: string, aspectRatio?: string, position?: {x: number, y: number}) => Promise<boolean>;
    resizeImage: (imageUrl: string, aspectRatio: string, position?: {x: number, y: number}) => Promise<boolean>;
    duplicateImage: (img: {id: string, url: string, prompt: string}) => void;
    removeImage: (id: string) => void;
    pendingDelete: {image: CanvasImage, sessionId: string} | null;
    undoDelete: () => void;
    notice: string | null;
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
    const [sessions, setSessions] = useState<Record<string, CanvasImage[]>>({});
    const [sessionId, setSessionId] = useState(() => crypto.randomUUID());
    const images = sessions[sessionId] ?? [];
    const [pendingDelete, setPendingDelete] = useState<{image: CanvasImage, sessionId: string} | null>(null);
    const deleteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [notice, setNotice] = useState<string | null>(null);
    const noticeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    function showNotice(msg: string) {
        setNotice(msg);
        if (noticeTimer.current) clearTimeout(noticeTimer.current);
        noticeTimer.current = setTimeout(() => { setNotice(null); noticeTimer.current = null; }, 2000);
    }

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const key = `canvas-images:${sessionId}`;
        if (images.length === 0 && localStorage.getItem(key) === null) return;
        localStorage.setItem(key, JSON.stringify(images));
    }, [images, sessionId]);

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

    function duplicateImage(img: {id: string, url: string, prompt: string}) {
        addImage({id: img.id, url: img.url, prompt: img.prompt, aspectRatio: ''});
    }

    function removeImage(id: string) {
        const sid = sessionId;
        const removed = (sessions[sid] ?? []).find(i => i.id === id);
        if (!removed) return;
        setSessions(prev => ({...prev, [sid]: (prev[sid] ?? []).filter(i => i.id !== id)}));
        if (removed.url === imageUrl) setImageUrl(''); // dropped the "current" image

        if (deleteTimer.current) clearTimeout(deleteTimer.current); // only one undo at a time
        setPendingDelete({image: removed, sessionId: sid});
        deleteTimer.current = setTimeout(() => {
            if (typeof window !== 'undefined') localStorage.removeItem(`canvas-pos:${removed.id}`);
            setPendingDelete(null);
            deleteTimer.current = null;
        }, 10000); // undo for 10s
    }

    function undoDelete() {
        if (!pendingDelete) return;
        const {image, sessionId: sid} = pendingDelete;
        setSessions(prev => {
            const current = prev[sid] ?? [];
            return current.some(i => i.id === image.id) ? prev : {...prev, [sid]: [...current, image]};
        });
        if (deleteTimer.current) clearTimeout(deleteTimer.current);
        deleteTimer.current = null;
        setPendingDelete(null);
    }

    function resizeImage(imageUrl: string, aspectRatio: string, position?: {x: number, y: number}) {
        const instruction = `Expand this image to a ${aspectRatio} aspect ratio. Naturally extend the scene to fill the new space while keeping the original subject unchanged and uncropped.`;
        return editImage(imageUrl, instruction, undefined, aspectRatio, position);
    }

    async function editImage(imageUrl: string, instruction: string, referenceImage?: string, aspectRatio?: string, position?: {x: number, y: number}){
        setError('');

        try{
            const res = await fetch("/api/edit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({imageUrl, instruction, sessionId, referenceImage, aspectRatio}),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || `Server error: ${res.status}`);
            }
            if(data.success){
                console.log('api returned:', data.imageUrl);
                setImageUrl(data.imageUrl);
                if (position) savePos(data.id, position); 
                addImage({id: data.id, url: data.imageUrl, prompt: lastPrompt, aspectRatio: data.aspectRatio});
                persistSession(sessionId);
                showNotice('Done');
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
        <ImageContext.Provider value={
            {imageUrl, loading, error, lastPrompt, lastSize, 
            generate, editImage, resizeImage, duplicateImage, 
            removeImage, pendingDelete, undoDelete, 
            sessionId, 
            images, 
            notice,
            newSession, openSession}
        }>
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
