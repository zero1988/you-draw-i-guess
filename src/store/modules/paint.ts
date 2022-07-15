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
    None = 'none',
    Brush = 'brush',
    Eraser = 'eraser',
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
    color: string
    history: History
    handles: CanvasHandles
}

const state: PaintState = {
    canvas: null,
    currentTool: PaintTools.Brush,
    size: 3,
    color: '#ee5126',
    history: {
        index: 0,
        stack: []
    },
    handles: {} as CanvasHandles
}

const mutations: MutationTree<PaintState> = {
    setCanvas(state: PaintState, canvas: CanvasRenderingContext2D) {
        state.canvas = canvas
    },
    push(state: PaintState, action: ActionData<any>) {
        state.history.index++
        state.history.stack.push(action)
    },
    update(state: PaintState, action: ActionData<any>) {
        const index = state.history.stack.findIndex(item => item.id === action.id)
        if (index > -1) {
            state.history.stack[index] = action
        }
    },
    pop(state: PaintState): ActionData<any> | undefined | null {
        state.history.index > 0 && state.history.index--
        return state.history.stack.pop()
    },
    clear(state: PaintState) {
        return state.history.stack = []
    },
    setHandles(state: PaintState, handles: CanvasHandles) {
        state.handles = handles
    },
    setColor(state: PaintState, color: string) {
        state.color = color
    },
    setCurrentTool(state: PaintState, tool: PaintTools) {
        state.currentTool = tool
    },
}

export default {
    namespaced: true,
    state,
    mutations
}