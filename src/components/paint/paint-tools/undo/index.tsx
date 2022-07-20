import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useCanvasHistory } from '../../paint-utils'
import styles from '../index.module.css'

export default defineComponent({
    name: 'Undo',
    setup() {

        const store = useStore()
        const stackCountRef = computed(() => useCanvasHistory(store).stack.length)

        function undo() {
            store.commit('paint/pop')
        }

        return {
            undo,
            stackCountRef
        }
    },

    render() {
        return (
            <div class={[`game icon-undo`, this.stackCountRef === 0 ? styles.disable : null]} onClick={this.undo}></div>
        )
    }
})

