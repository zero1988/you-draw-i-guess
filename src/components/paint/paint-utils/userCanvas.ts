export function useCanvas(store: any): CanvasRenderingContext2D {
    return store.state.paint.canvas
}

export function useCanvasColor(store: any): string {
    return store.state.paint.color
}

export function useCanvasSize(store: any): number {
    return store.state.paint.size
}

export function useCanvasCurrentTool(store: any): string {
    return store.state.paint.currentTool
}

export function useCanvasHistory(store: any): { index: number, stack: any[] } {
    return store.state.paint.history
}
