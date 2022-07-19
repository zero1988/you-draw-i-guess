import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useCanvas, useCanvasColor, useCanvasSize, useCanvasCurrentTool } from '../../paint-utils'
import { ActionData } from '@/store/modules/paint'
import draw from './draw'
const newId = require('uuid').v4

export interface BrushData {
    size: number
    color: string
    points: Array<{ x: number, y: number }>
}

export default defineComponent({
    name: 'Brush',
    setup(props, { emit }) {
        const brushDataRef = ref<ActionData<BrushData>>()

        const store = useStore()

        const checked = computed(() => useCanvasCurrentTool(store) === 'brush')
        const canvasRef = computed(() => useCanvas(store))
        const colorRef = computed(() => useCanvasColor(store))
        const sizeRef = computed(() => useCanvasSize(store))

        function down(e: MouseEvent): void {
            const { left, top } = canvasRef.value.canvas.getBoundingClientRect()
            const x = e.clientX - left
            const y = e.clientY - top

            brushDataRef.value = {
                id: newId(),
                name: 'brush',
                data: {
                    size: sizeRef.value,
                    color: colorRef.value,
                    points: [{ x, y }]
                } as BrushData,
                draw,
            }
            store.commit('paint/push', brushDataRef.value)
        }

        function move(e: MouseEvent, offsetX: number, offsetY: number) {
            if (brushDataRef.value) {

                const points = brushDataRef.value.data.points
                const top = points[points.length - 1]

                const point = {
                    x: top.x + offsetX,
                    y: top.y + offsetY
                }
                brushDataRef.value.data.points.push(point)

                store.commit('paint/update', brushDataRef.value)
            }
        }

        function selectBrush() {
            // store.commit('paint/clearSelected')
            store.commit('paint/setCurrentTool', 'brush')
            console.log('emit selectBrush')
            emit('setBrushPad')
            store.commit('paint/setHandles', {
                down,
                move,
            })
        }

        return {
            selectBrush,
            checked,
            canvasRef
        }
    },
    render() {
        return (
            <div onClick={this.selectBrush}>画笔</div>
        )
    }
})