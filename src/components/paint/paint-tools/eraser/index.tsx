import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useCanvas, useCanvasEraserSize, useCanvasCurrentTool } from '../../paint-utils'
import { ActionData } from '@/store/modules/paint'
import draw from './draw'
const newId = require('uuid').v4

export interface EraserData {
    size: number
    points: Array<{ x: number, y: number }>
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
                    points: [{ x, y }]
                } as EraserData,
                draw,
            }
            store.commit('paint/push', eraserDataRef.value)
            store.dispatch('websocket/pushPaint', eraserDataRef.value)
        }

        function move(e: MouseEvent, offsetX: number, offsetY: number) {
            if (eraserDataRef.value) {

                const tiles = eraserDataRef.value.data.points
                const top = tiles[tiles.length - 1]

                const point = {
                    x: top.x + offsetX,
                    y: top.y + offsetY
                }
                // eraserDataRef.value.data.points.push(point)

                const p = {
                    id: eraserDataRef.value.id,
                    ...point
                }
                store.commit('paint/update', p)
                store.dispatch('websocket/updatePaint', p)
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

