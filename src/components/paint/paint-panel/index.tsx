import { defineComponent, onMounted, PropType, ref } from 'vue'

const paintPanelProps = {
    width: {
        type: Number,
        default: 300
    },
    height: {
        type: Number,
        default: 300
    },
    move: Function as PropType<(e: MouseEvent, offsetX: number, offsetY: number) => void>,
    moveEnd: Function as PropType<(e: MouseEvent) => void>,
}

export default defineComponent({
    name: 'PaintPanel',
    props: paintPanelProps,
    setup(props) {
        const canvasRef = ref(null)

        onMounted((): void => {

        })

        return {}
    },
    render() {
        return (
            <canvas ref='canvasRef' width={this.width} height={this.height}></canvas>
        )
    }
})