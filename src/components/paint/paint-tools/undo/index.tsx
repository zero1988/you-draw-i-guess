import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useCanvasHistory } from '../../paint-utils'

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
            <div onClick={this.undo}>撤销</div>
        )
    }
})

