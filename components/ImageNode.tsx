// a generated image placed on the react-flow canvas
import { type Node, type NodeProps } from '@xyflow/react';

export type ImageNodeType = Node<{ url: string; prompt: string }, 'image'>;

export function ImageNode({ data }: NodeProps<ImageNodeType>) {
    return (
        <img src={data.url} alt={data.prompt} draggable={false}
            className="rounded-xl max-w-[420px] shadow-2xl" />
    );
}
