// shared persistence for canvas node positions
export const posKey = (id: string) => `canvas-pos:${id}`;

export function loadPos(id: string): {x: number, y: number} | null {
    if (typeof window === 'undefined') return null;
    try {
        const raw = localStorage.getItem(posKey(id));
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function savePos(id: string, pos: {x: number, y: number}) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(posKey(id), JSON.stringify(pos));
}
