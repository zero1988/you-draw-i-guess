import { defineComponent, onMounted, PropType, ref, watchEffect, computed } from 'vue'
import { useStore } from 'vuex'
import { ActionData } from '@/store/modules/paint'
import { useMouseDragDrop } from '../paint-utils/userMouseDragDrop'
import PaintTools from '../paint-tools'
import ColorPad from '../paint-color-pad'
import SizePad from '../paint-size-pad'
import styles from './index.module.css'
import BrushDraw from '../paint-tools/brush/draw'
import EraserDraw from '../paint-tools/eraser/draw'


const paintPanelProps = {
    mode: {
        type: String as PropType<'draw' | 'guess' | 'watch'>,
        default: 'guess'
    }
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
        const stackRef = ref(store.state.paint.stack)

        const padRef = ref('')

        onMounted((): void => {
            if (canvasRef.value) {
                const canvas = (canvasRef.value as HTMLCanvasElement)
                const rect = canvas.getBoundingClientRect()
                canvas.style.width = `${rect.width}px`
                canvas.style.height = `${rect.height}px`
                canvas.width = rect.width
                canvas.height = rect.height

                store.commit('paint/setCanvas', (canvasRef.value as HTMLCanvasElement).getContext('2d'))
            }
            useMouseDragDrop(canvasRef.value as any, canvasDown, canvasMove, canvasUp)
        })

        watchEffect((): void => {
            if (stackRef.value.length === 0) {
                clearRect()
            }
            stackRef.value.forEach((action: ActionData<any>, index: number) => {
                if (index === 0) {
                    clearRect()
                }
                if (action.draw === undefined) {
                    if (action.name === 'brush') {
                        BrushDraw((canvasRef.value as any).getContext('2d'), action)
                    } else if (action.name === 'eraser') {
                        EraserDraw((canvasRef.value as any).getContext('2d'), action)
                    }
                } else {
                    action.draw((canvasRef.value as any).getContext('2d'), action)
                }
            })
        })

        function clearRect() {
            if (canvasRef.value) {
                const canvas = (canvasRef.value as HTMLCanvasElement)
                const ctx = canvas.getContext('2d')
                ctx?.clearRect(0, 0, canvas.width, canvas.height)
            }
        }

        function canvasDown(e: MouseEvent) {
            if (props.mode === 'draw') {
                padRef.value = ''
                store.state.paint.handles.down?.(e)
            }
        }

        function canvasMove(e: MouseEvent, offsetX: number, offsetY: number): void {
            if (props.mode === 'draw') {
                store.state.paint.handles.move?.(e, offsetX, offsetY)
            }

        }

        function canvasUp(e: MouseEvent) {
            if (props.mode === 'draw') {
                store.state.paint.handles.up?.(e)
            }
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
            <div class={styles.wrapper}>
                <div class={styles['canvas-wrapper']}>
                    <canvas class={styles.canvas} ref='canvasRef' ></canvas>
                </div>
                <PaintTools style={{ visibility: this.$props.mode === 'draw' ? 'visible' : 'hidden' }} onTogglePad={this.togglePad}></PaintTools>
                <SizePad class={styles.pad} v-show={this.padRef === 'brush'} mode="solid"></SizePad>
                <SizePad class={styles.pad} v-show={this.padRef === 'eraser'} mode="hollow"></SizePad>
                <ColorPad class={styles.pad} v-show={this.padRef === 'color'}></ColorPad>
            </div>
        )
    }
})