import { stat } from 'fs'
import { MutationTree } from 'vuex'


export interface ActionData<S> {
    id: string
    name: string
    data: S
    draw: (ctx: CanvasRenderingContext2D, data: ActionData<S>) => void
}

export interface History {
    index: number
    stack: ActionData<any>[]
}


export enum PaintTools {
    Brush = 'brush',
    Eraser = 'eraser',
    Color = 'color',
}
export enum PadTools {
    None = 'none',
    Size = 'size',
    Color = 'color'
}

export type CanvasHandles = {
    down?: (e: MouseEvent) => void
    move?: (e: MouseEvent, offsetX: number, offsetY: number) => void
    up?: (e: MouseEvent) => void
}

export interface PaintState {
    canvas: CanvasRenderingContext2D | null
    currentTool: PaintTools
    size: number
    eraserSize: number
    color: string
    pad: PadTools
    stack: ActionData<any>[]  // 元素栈
    undoStack: ActionData<any>[] // 
    handles: CanvasHandles
}

const state: PaintState = {
    canvas: null,
    currentTool: PaintTools.Brush,
    size: 3,
    eraserSize: 6,
    color: '#000',
    pad: PadTools.None,
    stack: [],
    undoStack: [],
    handles: {} as CanvasHandles
}

const mutations: MutationTree<PaintState> = {
    setCanvas(state: PaintState, canvas: CanvasRenderingContext2D) {
        state.canvas = canvas
    },
    push(state: PaintState, action: ActionData<any>) {
        state.stack.push(action)
    },
    update(state: PaintState, action: ActionData<any>) {
        const index = state.stack.findIndex(item => item.id === action.id)
        if (index > -1) {
            state.stack[index] = action
        }
    },
    undo(state: PaintState) {
        state.stack.length > 0 && state.undoStack.push(state.stack.pop()!)
    },
    redo(state: PaintState) {
        state.undoStack.length > 0 && state.stack.push(state.undoStack.pop()!)
    },
    clear(state: PaintState) {
        state.stack.splice(0, state.stack.length)
        state.undoStack.splice(0, state.undoStack.length)
    },
    setHandles(state: PaintState, handles: CanvasHandles) {
        state.handles = handles
    },
    setSize(state: PaintState, size: number) {
        state.size = size
    },
    setEraserSize(state: PaintState, size: number) {
        state.eraserSize = size
    },
    setColor(state: PaintState, color: string) {
        state.color = color
    },
    setCurrentTool(state: PaintState, tool: PaintTools) {
        state.currentTool = tool
    },
    setPad(state: PaintState, pad: PadTools) {
        state.pad = pad
    }
}

export default {
    namespaced: true,
    state,
    mutations
}