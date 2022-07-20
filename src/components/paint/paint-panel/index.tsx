import { defineComponent, onMounted, PropType, ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { ActionData } from '@/store/modules/paint'
import { useMouseDragDrop } from '../paint-utils/userMouseDragDrop'
import PaintTools from '../paint-tools'
import ColorPad from '../paint-color-pad'
import SizePad from '../paint-size-pad'
import styles from './index.module.css'


const paintPanelProps = {
    width: {
        type: Number,
        default: 300
    },
    height: {
        type: Number,
        default: 300
    },
}

export default defineComponent({
    name: 'PaintPanel',
    components: {
        PaintTools,
        ColorPad,
        SizePad
    },
    props: paintPanelProps,
    setup(props) {
        const canvasRef = ref(null)
        const store = useStore()
        const historyRef = ref(store.state.paint.history)

        const padRef = ref('')

        onMounted((): void => {
            if (canvasRef.value) {
                store.commit('paint/setCanvas', (canvasRef.value as HTMLCanvasElement).getContext('2d'))
            }
            useMouseDragDrop(canvasRef.value as any, canvasDown, canvasMove, canvasUp)
        })

        watchEffect((): void => {
            historyRef.value.stack.forEach((action: ActionData<any>, index: number) => {
                action.draw((canvasRef.value as any).getContext('2d'), action)
            })
        })

        function canvasDown(e: MouseEvent) {
            store.state.paint.handles.down?.(e)
        }

        function canvasMove(e: MouseEvent, offsetX: number, offsetY: number): void {
            store.state.paint.handles.move?.(e, offsetX, offsetY)

        }

        function canvasUp(e: MouseEvent) {
            store.state.paint.handles.up?.(e)
        }

        function togglePad(p: string) {
            padRef.value = p
        }

        return {
            canvasRef,
            padRef,
            togglePad
        }
    },
    render() {
        return (
            <div>
                <canvas class={styles.canvas} ref='canvasRef' width={this.width} height={this.height}></canvas>
                <PaintTools onTogglePad={this.togglePad}></PaintTools>
                <SizePad v-show={this.padRef === 'brush'} mode="solid"></SizePad>
                <SizePad v-show={this.padRef === 'eraser'} mode="hollow"></SizePad>
                <ColorPad v-show={this.padRef === 'color'}></ColorPad>
            </div >
        )
    }
})