import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useCanvas, useCanvasEraserSize, useCanvasCurrentTool } from '../../paint-utils'
import { ActionData } from '@/store/modules/paint'
import draw from './draw'
const newId = require('uuid').v4

export interface EraserTile {
    x: number
    y: number
}

export interface EraserData {
    size: number
    tiles: EraserTile[]
}

export default defineComponent({
    name: 'Eraser',
    emits: ['eraserClick'],
    setup(props, { emit }) {
        const eraserDataRef = ref<ActionData<EraserData>>()

        const store = useStore()

        const checked = computed(() => useCanvasCurrentTool(store) === 'eraser')
        const canvasRef = computed(() => useCanvas(store))
        const sizeRef = computed(() => useCanvasEraserSize(store))

        function down(e: MouseEvent): void {
            const { left, top } = canvasRef.value.canvas.getBoundingClientRect()
            let x = e.clientX - left
            let y = e.clientY - top

            eraserDataRef.value = {
                id: newId(),
                name: 'eraser',
                data: {
                    size: sizeRef.value * 2,
                    tiles: [{
                        x,
                        y,
                    }]
                } as EraserData,
                draw,
            }
            store.commit('paint/push', eraserDataRef.value)
        }

        function move(e: MouseEvent, offsetX: number, offsetY: number) {
            if (eraserDataRef.value) {

                const tiles = eraserDataRef.value.data.tiles
                const top = tiles[tiles.length - 1]

                eraserDataRef.value.data.tiles.push({
                    x: top.x + offsetX,
                    y: top.y + offsetY,
                })
                store.commit('paint/update', eraserDataRef.value)
            }
        }

        function selectEraser() {

            // store.commit('paint/clearSelected')
            store.commit('paint/setCurrentTool', 'eraser')
            emit('eraserClick')
            store.commit('paint/setHandles', {
                down,
                move,
            })
        }

        return {
            selectEraser,
            checked,
            canvasRef
        }
    },

    render() {
        return (
            <div class="game icon-eraser" {...{ checked: `${this.checked}` }} onClick={this.selectEraser}></div>
        )
    }
})

