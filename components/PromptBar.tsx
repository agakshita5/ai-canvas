// prompt
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

export default function PromptBar(){
    const sizeList = ["1:1", "2:3", "3:2", "4:5", "5:4", "16:9", "9:16", "9:21", "21:9"];
    const aspectRatioList = ["1024x1024", "1365x1024", "1024x1365", "1536x1024", "1024x1536", "1820x1024", "1024x1820", "1024x2048", "2048x1024", "1434x1024", "1024x1434", "1024x1280", "1280x1024", "1024x1707", "1707x1024"];
    const [input, setInput] = useState('');
    const [model, setModel] = useState('');
    const [size, setSize] = useState('');

    // const { messages, sendMessage } = useChat();
    async function handleSubmit(e: Event) {
        e.preventDefault();
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: [{ 
                    role: "user", 
                    content: input,
                    model: model,
                    size: size
                }]
            })
        });

        const data = await res.json();
        console.log("Response from API:", data.reply);
    }
    return (
        <>
            {/* loading indicator */}
            <div className="mt-4 flex justify-center" aria-hidden="true">
                <div className="flex animate-pulse space-x-2">
                    <div className="h-2 w-2 rounded-full bg-slate-600"></div>
                    <div className="h-2 w-2 rounded-full bg-slate-600"></div>
                    <div className="h-2 w-2 rounded-full bg-slate-600"></div>
                </div>
            </div>
            {/* prompt bar */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="chat-input" className="sr-only">Enter your idea & image resolution</label>
                <div className="mt-5 flex w-full max-w-3xl items-center gap-2 rounded-xl bg-slate-200 p-2 shadow-md dark:bg-slate-800">
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
                        placeholder="Enter your idea & image resolution"
                        rows={1}
                        required
                        onChange={(e) => {
                            setInput(e.currentTarget.value);
                            e.currentTarget.style.height = "auto";
                            e.currentTarget.style.height = e.currentTarget.scrollHeight + "px";
                        }}
                    ></textarea>
                    {/* model-dropdown */}
                    <Menu as="div" className="relative">
                        <MenuButton className="inline-flex w-fit rounded-md px-2 py-1 text-sm font-semibold text-slate-500 hover:bg-white/5 dark:text-slate-400 dark:hover:bg-white/5 ">
                            {model || "Model"}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>

                        <MenuItems transition className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in" >
                            <div className="py-1">
                                <MenuItem>
                                    <a onClick={() => {setModel("flux-schnell"), setSize("")}} href="#" className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden" >
                                    flux-schnell
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a onClick={() => setModel("recraft-v3")} href="#" className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:text-white data-focus:outline-hidden" >
                                    recraft-v3
                                    </a>
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Menu>
                    {/* size/aspect-ratio dropdown */}
                    <Menu as="div" className="relative">
                        <MenuButton className="inline-flex w-fit rounded-md px-2 py-1 text-sm font-semibold text-slate-500 hover:bg-white/5 dark:text-slate-400 dark:hover:bg-white/5 ">
                            {size || "Size"}
                            <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                        </MenuButton>

                        <MenuItems transition className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in" >
                            <div className="py-1">
                                {
                                (model=="flux-schnell" ? sizeList : aspectRatioList).map((element)=>{
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
                    <button type="submit" className="rounded-lg bg-blue-700 p-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base" >
                        <svg
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
                            <path
                            d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5"
                            ></path>
                        </svg>
                        <span className="sr-only">Send message</span>
                    </button>
                </div>
            </form>
        </>
    );
}