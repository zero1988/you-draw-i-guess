import { defineComponent } from 'vue'
import Brush from './brush'
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
    render() {
        return (
            <div class={styles.wrapper}>
                <Brush></Brush>
                <Eraser></Eraser>
                <Undo></Undo>
                <Redo></Redo>
            </div >
        )
    }
})

