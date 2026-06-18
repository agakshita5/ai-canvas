// a generated image placed on the react-flow canvas
'use client';

import { useRef, useState } from 'react';
import { type Node, type NodeProps } from '@xyflow/react';
import { PaintBrushIcon, CircleNotchIcon, ArrowRightIcon, XIcon, CopyIcon, PaperclipIcon, CornersOutIcon, TrashIcon} from '@phosphor-icons/react';
import { useImageGeneration } from '@/providers/image-generation-provider';
import { savePos } from '@/lib/canvas-pos';

export type ImageNodeType = Node<{ url: string; prompt: string }, 'image'>;

function fileToDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

const RATIOS = ['1:1', '16:9', '9:16', '4:3', '3:4'];

export function ImageNode({ id, data, selected, positionAbsoluteX, positionAbsoluteY, width }: NodeProps<ImageNodeType>) {
    const { editImage, resizeImage, duplicateImage, removeImage } = useImageGeneration();
    const [editing, setEditing] = useState(false);
    const [resizing, setResizing] = useState(false); 
    const [selectedRatio, setSelectedRatio] = useState('');
    const [instruction, setInstruction] = useState('');
    const [busy, setBusy] = useState(false);
    const [refImage, setRefImage] = useState<File | null>(null); 
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleDuplicate() {
        const newId = crypto.randomUUID();
        savePos(newId, { x: positionAbsoluteX + (width ?? 420) + 40, y: positionAbsoluteY });
        duplicateImage({ id: newId, url: data.url, prompt: data.prompt });
    }

    function closeEdit() {
        setEditing(false);
        setInstruction('');
        setRefImage(null);
    }

    function closeResize() {
        setResizing(false);
        setSelectedRatio('');
    }

    async function applyResize() {
        if (busy || !selectedRatio) return;
        setBusy(true);
        const position = { x: positionAbsoluteX + (width ?? 420) + 40, y: positionAbsoluteY };
        const ok = await resizeImage(data.url, selectedRatio, position);
        setBusy(false);
        if (ok) {
            closeResize();
        }
    }

    function onAttachClick() {
        if (refImage) { setRefImage(null); return; } 
        fileInputRef.current?.click();
    }

    async function submitEdit() {
        const text = instruction.trim();
        if (!text || busy) return;
        setBusy(true);
        const reference = refImage ? await fileToDataUrl(refImage) : undefined;
        const position = { x: positionAbsoluteX + (width ?? 420) + 40, y: positionAbsoluteY };
        const ok = await editImage(data.url, text, reference, undefined, position);
        setBusy(false);
        if (ok) {
            closeEdit();
        }
    }

    return (
        <div className="relative">
            <img src={data.url} alt={data.prompt} draggable={false}
                className={` max-w-[420px] object-contain shadow-xl transition duration-200 ${
                    selected
                        ? 'ring-2 ring-accent/70'
                        : 'ring-1 ring-transparent hover:ring-accent/50'
                }`} />

            {/* single action bar */}
            {selected && (
                <div
                    className="nodrag nopan absolute -bottom-3 left-1/2 flex w-full max-w-sm -translate-x-1/2 translate-y-full items-center gap-2 rounded-xl bg-panel p-2 shadow-lg ring-1 ring-edge backdrop-blur-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    {editing ? (
                        <>
                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden"
                                onChange={(e) => setRefImage(e.target.files?.[0] ?? null)} />
                            <button
                                onClick={onAttachClick}
                                disabled={busy}
                                title={refImage ? `Reference: ${refImage.name} (click to remove)` : 'Attach reference image'}
                                className={`rounded-lg p-1.5 transition disabled:opacity-40 ${refImage ? 'text-accent' : 'text-content/70 hover:bg-highlight'}`}
                            >
                                <PaperclipIcon size={18} weight={refImage ? 'fill' : 'duotone'} />
                            </button>
                            <input
                                autoFocus
                                value={instruction}
                                disabled={busy}
                                onChange={(e) => setInstruction(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') submitEdit();
                                    if (e.key === 'Escape') closeEdit();
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
                                onClick={closeEdit}
                                disabled={busy}
                                title="Cancel"
                                className="rounded-lg p-1.5 text-content/70 transition hover:bg-highlight disabled:opacity-40"
                            >
                                <XIcon size={18} weight="bold" />
                            </button>
                        </>
                    ) : resizing ? (
                        <div className="flex w-full items-center justify-around text-content">
                            {RATIOS.map((r) => (
                                <button key={r} onClick={() => setSelectedRatio(r)} disabled={busy} title={`Expand to ${r}`}
                                    className={`rounded-lg px-2 py-1 text-sm transition disabled:opacity-40 ${
                                        selectedRatio === r ? 'bg-highlight ring-1 ring-accent/60' : 'hover:bg-highlight'
                                    }`}>
                                    {r}
                                </button>
                            ))}
                            <button onClick={applyResize} disabled={busy || !selectedRatio} title="Apply resize"
                                className="rounded-lg bg-btn p-1.5 text-btn-content transition hover:bg-btn-hover disabled:opacity-40">
                                {busy ? <CircleNotchIcon size={18} weight="bold" className="animate-spin" /> : <ArrowRightIcon size={18} weight="bold" />}
                            </button>
                            <button onClick={closeResize} disabled={busy} title="Cancel"
                                className="rounded-lg p-1.5 text-content/70 transition hover:bg-highlight disabled:opacity-40">
                                <XIcon size={18} weight="bold" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex w-full items-center justify-around text-content">
                            <button onClick={() => setEditing(true)} title="Edit"
                                className="rounded-lg transition hover:bg-highlight flex gap-2 items-center">
                                <PaintBrushIcon size={18} weight="duotone" />Edit
                            </button>
                            <button onClick={handleDuplicate} title="Duplicate"
                                className="rounded-lg transition hover:bg-highlight flex gap-2 items-center">
                                <CopyIcon size={18} weight="duotone" /> Duplicate
                            </button>
                            <button onClick={() => setResizing(true)} title="Resize"
                                className="rounded-lg transition hover:bg-highlight flex gap-2 items-center">
                                <CornersOutIcon size={18} weight="duotone" /> Resize
                            </button>
                            <button onClick={() => removeImage(id)} title="Delete"
                                className="rounded-lg text-content transition hover:bg-red-500/20 hover:text-red-400 flex gap-2 items-center">
                                <TrashIcon size={18} weight="duotone" /> 
                            </button> 
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
