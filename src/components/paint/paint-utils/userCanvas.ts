export function useCanvas(store: any): CanvasRenderingContext2D {
    return store.state.capture.canvas
}

export function useCanvasColor(store: any): string {
    return store.state.capture.color
}

export function useCanvasSize(store: any): number {
    return store.state.capture.size
}

export function useCanvasCurrentTool(store: any): string {
    return store.state.capture.currentTool
}

export function useCanvasHistory(store: any): { index: number, stack: any[] } {
    return store.state.capture.history
}
