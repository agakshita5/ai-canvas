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
    const {generate, loading, lastPrompt, lastSize} = useImageGeneration();
    const aspectRatioList = ["1:1", "3:4", "4:3", "9:16", "16:9"];
    const [input, setInput] = useState(variant === 'canvas' ? lastPrompt : '');
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
                    <div className="flex w-full max-w-3xl items-center gap-2 rounded-xl bg-slate-200 p-2 shadow-md dark:bg-slate-800">
                        {/* voice input button */}
                        <button type="button" className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600" >
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
                            className="flex-1 resize-none px-2 bg-slate-200 text-sm text-slate-900 dark:bg-slate-800 dark:text-slate-200 dark:placeholder-slate-400 focus:outline-none focus:ring-0 focus:ring-transparent sm:text-base"
                            placeholder= {variant==='canvas' ? lastPrompt : "Enter your idea & image resolution"}
                            rows={1}
                            value={input}
                            required
                            onChange={(e) => {
                                setInput(e.currentTarget.value);
                                e.currentTarget.style.height = "auto";
                                e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
                            }}
                        ></textarea>
                        {/* size/aspect-ratio dropdown */}
                        <Menu as="div" className="relative">
                            <MenuButton className="inline-flex w-fit rounded-md px-2 py-1 text-sm font-semibold text-slate-500 hover:bg-white/5 dark:text-slate-400 dark:hover:bg-white/5 ">
                                {size || lastSize || "Size"}
                                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                            </MenuButton>

                            <MenuItems transition className={`absolute z-10 w-56 rounded-md ${variant==='canvas'? 'right-0 mb-2 origin-bottom-right bottom-full' : 'right-0 mt-2 origin-top-right'} max-h-64 overflow-y-auto bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in`} >
                                <div className="py-1">
                                    {
                                    aspectRatioList.map((element)=>{
                                        return (
                                            <MenuItem key={element}>
                                                <a onClick={() => setSize(element)} href="#" className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden" >
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
                        <button type="submit" disabled={loading} className="rounded-lg bg-blue-700 p-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base" >
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