import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useCanvasUndoStack } from '../../paint-utils'
import styles from '../index.module.css'

export default defineComponent({
    name: 'Redo',
    setup() {

        const store = useStore()
        const undoStackCountRef = computed(() => useCanvasUndoStack(store).length)

        function redo() {
            store.commit('paint/redo')
            store.dispatch('websocket/redoPaint')
        }

        return {
            redo,
            undoStackCountRef
        }
    },

    render() {
        return (
            <div class={[`game icon-redo`, this.undoStackCountRef === 0 ? styles.disable : '']} onClick={this.redo}></div>
        )
    }
})

