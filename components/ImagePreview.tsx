'use client';

import Download from "@/components/Download";
import { ImageNode } from "./ImageNode";
import Link from 'next/link';
import { useCallback, useEffect, useState, useRef } from "react";
import {useImageGeneration} from "@/providers/image-generation-provider";
import { ReactFlow, Background, BackgroundVariant, applyNodeChanges, type Node, type OnSelectionChangeParams, type ReactFlowInstance } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CheckCircleIcon } from '@phosphor-icons/react';
import { loadPos, savePos } from "@/lib/canvas-pos";

const nodeTypes = { image: ImageNode };

export default function ImagePreview(){
    const {images, sessionId, pendingDelete, undoDelete, notice} = useImageGeneration();
    // every session keeps its own canvas nodes 
    const [allNodes, setAllNodes] = useState<Record<string, Node[]>>({});
    const nodes = allNodes[sessionId] ?? [];
    const flowRef = useRef<ReactFlowInstance | null>(null);
    const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

    const onSelectionChange = useCallback(({nodes}: OnSelectionChangeParams) => {
        const picked = nodes[0]?.data as {url: string} | undefined;
        setSelectedUrl(picked?.url ?? null);
    }, []);

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
                    // restore saved position after a refresh, else cascade to a fresh default
                    position: loadPos(img.id) ?? {x: 80 + (kept.length + i) * 48, y: 60 + (kept.length + i) * 48},
                    data: {url: img.url, prompt: img.prompt},
                }));
            return {...prev, [sessionId]: [...kept, ...added]};
        });
    }, [images, sessionId]);

    return (
        <>
            <div className="flex-1 flex flex-col bg-canvas overflow-hidden p-4 gap-3">

                {/* top bar */}
                <div className="flex justify-end gap-3">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="rounded-lg bg-btn px-4 py-2 text-sm font-medium text-btn-content shadow-md transition hover:bg-btn-hover focus:outline-none focus:ring-4 focus:ring-accent/50 sm:text-base" >
                            Home
                        </Link>
                        <Download url={selectedUrl ?? undefined} />
                    </div>
                </div>

                {/* CANVAS window */}
                <div className="flex-1 relative rounded-xl overflow-hidden outline outline-edge">
                    <ReactFlow
                        key={sessionId} 
                        nodes={nodes}
                        onNodesChange={(changes) => setAllNodes(prev => ({...prev, [sessionId]: applyNodeChanges(changes, prev[sessionId] ?? [])}))}
                        onNodeDragStop={(_, node) => savePos(node.id, node.position)}
                        nodeTypes={nodeTypes}
                        onSelectionChange={onSelectionChange}
                        onInit={(instance) => {flowRef.current = instance}}
                        proOptions={{hideAttribution: true}}
                        fitView
                    >
                        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="var(--dot)" bgColor="var(--bg-canvas)" />
                    </ReactFlow>
                    {nodes.length === 0 && (
                        <p className="absolute inset-0 flex items-center justify-center text-lg text-content pointer-events-none"> Write in your prompt </p>
                    )}
                </div>
            </div>
            
            <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
                {notice && (
                    <div className="inline-flex items-center gap-2 rounded-lg bg-panel px-4 py-2 text-sm font-medium text-content shadow-lg ring-1 ring-edge backdrop-blur-md">
                        <CheckCircleIcon size={18} weight="fill" className="text-accent" /> {notice}
                    </div>
                )}
                {pendingDelete && (
                    <div className="flex items-center gap-3 rounded-lg bg-panel px-4 py-2 text-sm text-content shadow-lg ring-1 ring-edge backdrop-blur-md">
                        <span>Image deleted</span>
                        <button onClick={undoDelete} className="font-medium text-accent transition hover:underline">
                            Undo
                        </button>
                    </div>
                )}
        </div>
        </>
    );
}
