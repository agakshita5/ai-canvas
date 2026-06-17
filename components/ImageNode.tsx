// a generated image placed on the react-flow canvas
'use client';

import { useState } from 'react';
import { type Node, type NodeProps } from '@xyflow/react';
import { PencilSimpleIcon, CircleNotchIcon, ArrowRightIcon, XIcon } from '@phosphor-icons/react';
import { useImageGeneration } from '@/providers/image-generation-provider';

export type ImageNodeType = Node<{ url: string; prompt: string }, 'image'>;

export function ImageNode({ data, selected }: NodeProps<ImageNodeType>) {
    const { editImage } = useImageGeneration();
    const [editing, setEditing] = useState(false);
    const [instruction, setInstruction] = useState('');
    const [busy, setBusy] = useState(false);

    async function submitEdit() {
        const text = instruction.trim();
        if (!text || busy) return;
        setBusy(true);
        const ok = await editImage(data.url, text); 
        setBusy(false);
        if (ok) { setInstruction(''); setEditing(false); }
    }

    return (
        <div className="relative">
            <img src={data.url} alt={data.prompt} draggable={false}
                className={` max-w-[420px] object-contain shadow-xl transition duration-200 ${
                    selected
                        ? 'ring-2 ring-accent/70'
                        : 'ring-1 ring-transparent hover:ring-accent/50'
                }`} />

            {selected && (editing ? (
                <div
                    className="nodrag nopan absolute -bottom-3 left-1/2 flex w-[90%] max-w-sm -translate-x-1/2 translate-y-full items-center gap-2 rounded-xl bg-panel p-2 shadow-lg ring-1 ring-edge backdrop-blur-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    <input
                        autoFocus
                        value={instruction}
                        disabled={busy}
                        onChange={(e) => setInstruction(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') submitEdit();
                            if (e.key === 'Escape') setEditing(false);
                        }}
                        placeholder="Describe your edit…"
                        className="flex-1 bg-transparent px-2 text-sm text-content placeholder-content/50 focus:outline-none"
                    />
                    <button
                        onClick={submitEdit}
                        disabled={busy || !instruction.trim()}
                        title="Apply edit"
                        className="rounded-lg bg-btn p-1.5 text-btn-content transition hover:bg-btn-hover disabled:opacity-40"
                    >
                        {busy
                            ? <CircleNotchIcon size={18} weight="bold" className="animate-spin" />
                            : <ArrowRightIcon size={18} weight="bold" />}
                    </button>
                    <button
                        onClick={() => setEditing(false)}
                        disabled={busy}
                        title="Cancel"
                        className="rounded-lg p-1.5 text-content/70 transition hover:bg-highlight disabled:opacity-40"
                    >
                        <XIcon size={18} weight="bold" />
                    </button>
                </div>
            ) : (
                <button
                    onClick={(e) => { e.stopPropagation(); setEditing(true); }}
                    className="nodrag nopan absolute right-2 top-2 inline-flex items-center gap-1 rounded-full bg-panel/90 px-3 py-1.5 text-xs font-medium text-content shadow-md ring-1 ring-edge backdrop-blur-md transition hover:bg-highlight"
                >
                    <PencilSimpleIcon size={14} weight="duotone" /> Edit
                </button>
            ))}
        </div>
    );
}
