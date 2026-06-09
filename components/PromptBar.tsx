// prompt
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {useImageGeneration} from '@/providers/image-generation-provider';

interface PromptBarProps{
    variant: 'home' | 'canvas';
}

export default function PromptBar({variant = 'home'}:PromptBarProps){
    const {generate, loading, imageUrl, lastPrompt, lastSize, sessionId} = useImageGeneration();
    const aspectRatioList = ["1:1", "3:4", "4:3", "9:16", "16:9"];
    // user edits kept per chat (keyed by sessionId, not imageUrl which is '' for every new/empty chat)
    const [drafts, setDrafts] = useState<Record<string, string>>({});
    const input = drafts[sessionId] ?? lastPrompt; // this chat's edit if any, else its own prompt
    const [size, setSize] = useState('');
    const router = useRouter();

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
                        <button type="button" className="p-2 text-content hover:text-content/50" >
                            <svg
                                aria-hidden="true"
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"
                                ></path>
                                <path d="M5 10a7 7 0 0 0 14 0"></path>
                                <path d="M8 21l8 0"></path>
                                <path d="M12 17l0 4"></path>
                            </svg>
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
                            <MenuButton className="inline-flex w-fit rounded-md px-2 py-1 text-sm font-semibold text-content hover:bg-highlight ">
                                {size || lastSize || "Size"}
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-content" />
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
                            {loading ? 
                            (<svg
                                className="h-6 w-6 animate-spin"
                                viewBox="0 0 24 24"
                            >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="opacity-25"
                                fill="none"
                            />
                            <path
                                d="M22 12a10 10 0 0 1-10 10"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="opacity-75"
                                fill="none"
                            />
                            </svg>)
                            : 
                            (<svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                aria-hidden="true"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M10 14l11 -11"></path>
                                <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" ></path>
                            </svg>)
                            }
                            <span className="sr-only">Send message</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}