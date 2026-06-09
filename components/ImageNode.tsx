// a generated image placed on the react-flow canvas
import { type Node, type NodeProps } from '@xyflow/react';

export type ImageNodeType = Node<{ url: string; prompt: string }, 'image'>;

export function ImageNode({ data, selected }: NodeProps<ImageNodeType>) {
    return (
        <img src={data.url} alt={data.prompt} draggable={false}
            className={` max-w-[420px] object-contain shadow-xl transition duration-200 ${
                selected
                    ? 'ring-2 ring-accent/70'
                    : 'ring-1 ring-transparent hover:ring-accent/50'
            }`} />
    );
}
