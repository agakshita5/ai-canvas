// 'use client';

// import { useState } from "react";

// function Sidebar() {
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//     return (
//         <aside className="flex">
//             <div className= { `flex h-[100svh] flex-col  overflow-y-auto bg-slate-50 pt-8 dark:border-slate-700 dark:bg-slate-900  sm:h-[100vh] 
//                 ${isSidebarOpen ? "w-64" : "w-16"} transition-all duration-300`} >
                
//                 <div className="flex px-4 items-center justify-between">
//                     {isSidebarOpen && 
//                     (<h2 className="text-lg font-medium text-slate-800 dark:text-slate-200">
//                         Chats
//                     </h2>)}
//                     <button onClick={()=> setIsSidebarOpen(!isSidebarOpen)}>
//                     {/* got svg from opening .svg file in text editor */}
//                     <svg 
//                         className="ml-25 h-7 w-7 text-blue-600" 
//                         viewBox="0 0 512.000000 512.000000"
//                     >
//                         <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
//                         fill="currentColor" stroke="currentColor">
//                             <path d="M1045 4415 c-221 -49 -407 -197 -500 -400 -69 -148 -65 -68 -65 -1455 0 -1387 -4 -1307 65 -1455 86 -187 251 -327 460 -392 57 -17 130 -18 1550 -18 1389 0 1494 1 1553 18 202 55 373 197 462 382 74 155 70 67 70 1465 0 1387 4 1307 -65 1455 -83 180 -231 312 -430 382 l-80 28 -1480 2 c-1200 1 -1491 -1 -1540 -12z m715 -1856 l0 -1551 -307 5 c-248 4 -320 8 -368 22 -161 45 -247 150 -275 333 -7 44 -10 464 -8 1237 l3 1170 23 67 c52 154 159 234 342 258 30 4 175 8 323 9 l267 1 0 -1551z m2275 1527 c160 -47 246 -149 275 -328 14 -86 14 -2310 0 -2396 -30 -182 -112 -278 -283 -330 -46 -14 -164 -16 -999 -19 l-948 -4 0 1551 0 1551 948 -4 c872 -3 952 -4 1007 -21z"/>
//                         </g>
//                     </svg>
//                     </button>
//                 </div>

//                 <div className="mx-2 mt-8">
//                     <button className="flex w-full gap-x-4 rounded-lg border border-slate-300 p-4 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
//                         <svg className="h-5 w-5" >
//                             <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
//                             <path d="M12 5l0 14"></path>
//                             <path d="M5 12l14 0"></path>
//                             {isSidebarOpen && "New Chat"}
//                         </svg>
//                     </button>
//                 </div>

//                 {/* Previous chats container */}
//                 <div className="h-1/2 overflow-y-auto px-2 py-4">
//                     <button className="flex flex-col px-3 py-2">
//                         {isSidebarOpen && (
//                             <>
//                                 <h1 className="text-sm">chat 1</h1>
//                                 <p className="text-xs">date 1</p>
//                             </>
//                         )}
//                     </button>
//                 </div>


//                 <div className="mt-auto w-full space-y-4 px-2 py-4">
//                 <button className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800" >
//                     <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-6 w-6"
//                         viewBox="0 0 24 24"
//                         strokeWidth="2"
//                         stroke="currentColor"
//                         fill="none"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                     >
//                     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
//                     <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
//                     <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
//                     <path
//                         d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"
//                     ></path>
//                     </svg>
//                     {isSidebarOpen && "User"}
//                 </button>
//                 <button
//                     className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800"
//                 >
//                     <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     viewBox="0 0 24 24"
//                     strokeWidth="2"
//                     stroke="currentColor"
//                     fill="none"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     >
//                         <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
//                         <path
//                             d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"
//                         ></path>
//                         <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
//                     </svg>
//                     {isSidebarOpen && "Settings"}
//                 </button>
//                 </div>
//             </div>
//         </aside>
//     );
// }

// export default Sidebar;
'use client';

import { useState } from "react";

function Sidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
    return (
        <aside className="h-screen flex-shrink-0">
            <div className={`flex h-full flex-col overflow-y-auto bg-slate-50 pt-8 dark:border-slate-700 dark:bg-slate-900 transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-16"}`}>
                
                <div className="flex px-4 items-center justify-between gap-2">
                    {isSidebarOpen && 
                    (<h2 className="text-lg font-medium text-slate-800 dark:text-slate-200 truncate">
                        Chats
                    </h2>)}
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="flex-shrink-0 p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                        {/* got svg from opening .svg file in text editor */}
                        <svg 
                            className="h-5 w-5 text-blue-600" 
                            viewBox="0 0 512 512"
                            fill="currentColor"
                        >
                            <g transform="translate(0,512) scale(0.1,-0.1)">
                                <path d="M1045 4415 c-221 -49 -407 -197 -500 -400 -69 -148 -65 -68 -65 -1455 0 -1387 -4 -1307 65 -1455 86 -187 251 -327 460 -392 57 -17 130 -18 1550 -18 1389 0 1494 1 1553 18 202 55 373 197 462 382 74 155 70 67 70 1465 0 1387 4 1307 -65 1455 -83 180 -231 312 -430 382 l-80 28 -1480 2 c-1200 1 -1491 -1 -1540 -12z m715 -1856 l0 -1551 -307 5 c-248 4 -320 8 -368 22 -161 45 -247 150 -275 333 -7 44 -10 464 -8 1237 l3 1170 23 67 c52 154 159 234 342 258 30 4 175 8 323 9 l267 1 0 -1551z m2275 1527 c160 -47 246 -149 275 -328 14 -86 14 -2310 0 -2396 -30 -182 -112 -278 -283 -330 -46 -14 -164 -16 -999 -19 l-948 -4 0 1551 0 1551 948 -4 c872 -3 952 -4 1007 -21z"/>
                            </g>
                        </svg>
                    </button>
                </div>

                <div className="mx-2 mt-8">
                    <button className="flex w-full gap-x-4 rounded-lg border border-slate-300 p-4 items-center text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                        <svg className="h-6 w-6 flex-shrink-1" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 5l0 14"></path>
                            <path d="M5 12l14 0"></path>
                        </svg>
                        {isSidebarOpen && "New Chat"}
                    </button>
                </div>

                {/* Previous chats container */}
                <div className="flex-1 overflow-y-auto px-2 py-4">
                    <button className="flex flex-col w-full px-3 py-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded transition-colors">
                        {isSidebarOpen && (
                            <>
                                <h1 className="text-left text-sm text-slate-700 dark:text-slate-300">chat 1</h1>
                                <p className="text-left text-xs text-slate-500 dark:text-slate-400">date 1</p>
                            </>
                        )}
                    </button>
                </div>

                <div className="w-full space-y-2 px-2 py-4 border-t border-slate-200 dark:border-slate-800">
                    <button className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 flex-shrink-0"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                        </svg>
                        {isSidebarOpen && <span>User</span>}
                    </button>
                    <button className="flex w-full gap-x-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-200 focus:outline-none dark:text-slate-200 dark:hover:bg-slate-800">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 flex-shrink-0"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"></path>
                            <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                        </svg>
                        {isSidebarOpen && <span>Settings</span>}
                    </button>
                </div>
            </div>
        </aside>
    );
}

export default Sidebar;
