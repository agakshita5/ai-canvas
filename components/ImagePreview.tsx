'use client';

import Download from "@/components/Download";
import { ImageNode } from "./ImageNode";
import Link from 'next/link';
import { useEffect, useState, useRef } from "react";
import {useImageGeneration} from "@/providers/image-generation-provider";
import { ReactFlow, Background, BackgroundVariant, applyNodeChanges, type Node, type ReactFlowInstance } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodeTypes = { image: ImageNode };

export default function ImagePreview(){
    const {images, sessionId} = useImageGeneration();
    // every session keeps its own canvas nodes 
    const [allNodes, setAllNodes] = useState<Record<string, Node[]>>({});
    const nodes = allNodes[sessionId] ?? [];
    const flowRef = useRef<ReactFlowInstance | null>(null);

    // sync this session's nodes with its images:
    // keep dragged positions, cascade new ones, drop removed ones
    useEffect(() => {
        setAllNodes(prev => {
            const current = prev[sessionId] ?? [];
            const onCanvas = new Set(current.map(n => n.id));
            const kept = current.filter(n => images.some(img => img.id === n.id));
            const added = images
                .filter(img => !onCanvas.has(img.id))
                .map((img, i) => ({
                    id: img.id, 
                    type: 'image',
                    position: {x: 80 + (kept.length + i) * 48, y: 60 + (kept.length + i) * 48},
                    data: {url: img.url, prompt: img.prompt},
                }));
            return {...prev, [sessionId]: [...kept, ...added]};
        });
    }, [images, sessionId]);

    return (
        <>
            <div className="flex-1 flex flex-col bg-[#554971] overflow-hidden p-4 gap-3">

                {/* top bar */}
                <div className="flex justify-end gap-5">
                    <Link href="/" className="rounded-lg bg-[#89808d] px-4 py-2 text-sm font-medium text-[#ededed] shadow-md transition hover:bg-[#746c78] focus:outline-none focus:ring-4 focus:ring-[#63768D]/50 sm:text-base" >
                        Home
                    </Link>
                    <Download />
                </div>

                {/* CANVAS window */}
                <div className="flex-1 relative rounded-xl overflow-hidden outline outline-white/10">
                    <ReactFlow
                        key={sessionId} 
                        nodes={nodes}
                        onNodesChange={(changes) => setAllNodes(prev => ({...prev, [sessionId]: applyNodeChanges(changes, prev[sessionId] ?? [])}))}
                        nodeTypes={nodeTypes}
                        onInit={(instance) => {flowRef.current = instance}}
                        fitView
                    >
                        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="rgba(237,237,237,0.35)" bgColor="#554971" />
                    </ReactFlow>
                    {nodes.length === 0 && (
                        <p className="absolute inset-0 flex items-center justify-center text-lg text-[#ededed] pointer-events-none"> Write in your prompt </p>
                    )}
                </div>
            </div>
        </>
    );
}
