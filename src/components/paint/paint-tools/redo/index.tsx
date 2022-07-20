import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useCanvasHistory } from '../../paint-utils'

export default defineComponent({
    name: 'Redo',
    setup() {

        const store = useStore()
        const stackCountRef = computed(() => useCanvasHistory(store).stack.length)

        function redo() {
            store.commit('paint/pop')
        }

        return {
            redo,
            stackCountRef
        }
    },

    render() {
        return (
            <div class={[`game icon-redo`]} onClick={this.redo}></div>
        )
    }
})

