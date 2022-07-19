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
    setup(props, { emit }) {
        function setPad(p: string) {
            emit('setPad', p)
        }
        return {
            setPad
        }
    },
    render() {
        return (
            <div class={styles.wrapper}>
                <Brush onSet-brush-pad={this.setPad('brush')}></Brush>
                <Color on-Abc={this.setPad('color')}></Color>
                <Eraser onSet-eraser-pad={this.setPad('eraser')}></Eraser>
                <Undo></Undo>
                <Redo></Redo>
            </div >
        )
    }
})

