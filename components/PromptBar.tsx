// prompt
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { CaretDownIcon, MicrophoneIcon, PaperPlaneTiltIcon, CircleNotchIcon } from '@phosphor-icons/react'
import {useImageGeneration} from '@/providers/image-generation-provider';

interface PromptBarProps{
    variant: 'home' | 'canvas';
}

type MicRecognition = {
    lang: string;
    interimResults: boolean;
    continuous: boolean;
    start: () => void;
    stop: () => void;
    onstart: (() => void) | null;
    onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
    onend: (() => void) | null;
    onerror: ((e: { error: string }) => void) | null;
};
type MicRecognitionCtor = new () => MicRecognition;

export default function PromptBar({variant = 'home'}:PromptBarProps){
    const {generate, loading, imageUrl, lastPrompt, lastSize, sessionId} = useImageGeneration();
    const aspectRatioList = ["1:1", "3:4", "4:3", "9:16", "16:9"];
    // user edits kept per chat (keyed by sessionId, not imageUrl which is '' for every new/empty chat)
    const [drafts, setDrafts] = useState<Record<string, string>>({});
    const input = drafts[sessionId] ?? lastPrompt; // this chat's edit if any, else its own prompt
    const [size, setSize] = useState('');
    const [listening, setListening] = useState(false);
    const [micNote, setMicNote] = useState(''); 
    const recognitionRef = useRef<MicRecognition | null>(null);
    const router = useRouter();

    useEffect(() => () => recognitionRef.current?.stop(), []);

    function toggleMic() {
        if (listening) { recognitionRef.current?.stop(); return; }
        const w = window as unknown as { SpeechRecognition?: MicRecognitionCtor; webkitSpeechRecognition?: MicRecognitionCtor };
        const Recognition = w.SpeechRecognition ?? w.webkitSpeechRecognition;
        if (!Recognition) { setMicNote("Voice input isn't supported in this browser"); return; }
        setMicNote('');
        const recognition = new Recognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false; // one final result → append once (no duplicates)
        recognition.continuous = false;
        recognition.onstart = () => setListening(true); // only "on" once it really starts
        recognition.onresult = (e) => {
            const transcript = e.results[0]?.[0]?.transcript ?? '';
            if (transcript) setDrafts(prev => ({...prev, [sessionId]: `${(prev[sessionId] ?? lastPrompt) || ''} ${transcript}`.trim()}));
        };
        recognition.onend = () => setListening(false);
        recognition.onerror = (e) => {
            // surface the reason instead of failing silently
            const reason = e.error === 'not-allowed' || e.error === 'service-not-allowed'
                ? 'Microphone blocked — allow mic access for this site (and check OS privacy settings).'
                : e.error === 'audio-capture'
                    ? 'No microphone found / OS is blocking it.'
                    : e.error === 'network'
                        ? 'Speech service unreachable (needs internet; use https or localhost).'
                        : e.error === 'no-speech'
                            ? "Didn't catch any speech — try again."
                            : `Voice input error: ${e.error}`;
            setMicNote(reason);
            setListening(false);
        };
        recognitionRef.current = recognition;
        try {
            recognition.start();
        } catch {
            setMicNote('Could not start voice input.');
            setListening(false);
        }
    }

    // SubmitEvent: browser/DOM type; React expects react form event
    // async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) { OR
    const handleSubmit: React.SubmitEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        if(!input || !size) return;

        const res = await generate(input, size);
        if(res){
            router.push('/generate'); // naviagte to canvas page
        }
    }

    // Variant-specific classes
    const containerClasses = variant === 'canvas' 
        ? 'bottom-0 left-0 right-0 p-4 z-10'
        : '';
    return (
        <div className={containerClasses}>
            <div className="flex flex-col items-center gap-3 w-full">
                {/* prompt bar */}
                <form onSubmit={handleSubmit} className='w-full flex justify-center px-4 gap-10'>
                    <label htmlFor="chat-input" className="sr-only">Enter your idea & image resolution</label>
                    <div className="flex w-full max-w-3xl items-center gap-2 rounded-xl bg-panel backdrop-blur-md p-2 shadow-md">
                        {/* voice input button */}
                        <button type="button" onClick={toggleMic} title={listening ? "Stop voice input" : "Use voice input"}
                            className={`p-2 transition ${listening ? 'text-accent animate-pulse' : 'text-content hover:text-content/50'}`} >
                            <MicrophoneIcon size={20} weight={listening ? 'fill' : 'duotone'} />
                            <span className="sr-only">Use voice input</span>
                        </button>
                        <textarea
                            id="chat-input"
                            className="flex-1 resize-none px-2 bg-panel text-sm text-content placeholder-content/50 focus:outline-none focus:ring-0 focus:ring-transparent sm:text-base"
                            placeholder= {imageUrl && lastPrompt ? "" : "Enter your idea & image resolution"}
                            rows={1}
                            value={input}
                            required
                            onChange={(e) => {
                                setDrafts({...drafts, [sessionId]: e.currentTarget.value});
                                e.currentTarget.style.height = "auto";
                                e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
                            }}
                        ></textarea>
                        {/* size/aspect-ratio dropdown */}
                        <Menu as="div" className="relative">
                            <MenuButton className="inline-flex w-fit rounded-md px-2 py-1 text-sm font-semibold text-content text-center hover:bg-highlight gap-1">
                                {size || lastSize || "Size"}
                                <CaretDownIcon aria-hidden="true" className="-mr-1 size-4 text-content" />
                            </MenuButton>

                            <MenuItems transition className={`absolute z-10 w-56 rounded-md ${variant==='canvas'? 'right-0 mb-2 origin-bottom-right bottom-full' : 'right-0 mt-2 origin-top-right'} max-h-64 overflow-y-auto bg-panel outline-1 -outline-offset-1 outline-edge transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in`} >
                                <div className="py-1">
                                    {
                                    aspectRatioList.map((element)=>{
                                        return (
                                            <MenuItem key={element}>
                                                <a onClick={() => setSize(element)} href="#" className="block px-4 py-2 text-sm text-content data-focus:bg-highlight data-focus:outline-hidden" >
                                                {element}
                                                </a>
                                            </MenuItem>
                                        );
                                    })
                                    }
                                </div>
                            </MenuItems>
                        </Menu> 
                        {/* generate button */}
                        <button type="submit" disabled={loading} className="rounded-lg p-2 text-sm font-medium text-btn-content bg-btn hover:bg-btn-hover sm:text-base" >
                            {loading
                                ? <CircleNotchIcon size={24} weight="bold" className="animate-spin" />
                                : <PaperPlaneTiltIcon size={24} weight="fill" />
                            }
                            <span className="sr-only">Send message</span>
                        </button>
                    </div>
                </form>
                {micNote && <p className="text-xs text-content/60">{micNote}</p>}
            </div>
        </div>
    );
}