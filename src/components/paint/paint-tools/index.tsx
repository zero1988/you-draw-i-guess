import { defineComponent } from 'vue'
import Brush from './brush'
import Color from './color'
import Eraser from './eraser'
import Undo from './undo'
import Redo from './redo'
import styles from './index.module.css'

const paintToolsProps = {
    x: {
        type: Number,
        default: 0,
    },
    y: {
        type: Number,
        default: 0,
    }
}

export default defineComponent({
    name: 'PaintTools',
    props: paintToolsProps,
    emits: ['togglePad'],
    setup(props, { emit }) {

        function onColorClick() {
            emit('togglePad', 'color')
        }

        function onBrushClick() {
            emit('togglePad', 'brush')
        }

        function onEraserClick() {
            emit('togglePad', 'eraser')
        }

        return {
            onColorClick,
            onBrushClick,
            onEraserClick
        }
    },
    render() {
        return (
            <div class={styles.wrapper}>
                <Brush onBrushClick={this.onBrushClick}></Brush>
                <Color onColorClick={this.onColorClick}></Color>
                <Eraser onEraserClick={this.onEraserClick}></Eraser>
                <Undo></Undo>
                <Redo></Redo>
            </div >
        )
    }
})

