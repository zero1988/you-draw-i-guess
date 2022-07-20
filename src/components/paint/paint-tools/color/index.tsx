import { defineComponent, computed } from 'vue'
import { useCanvasCurrentTool } from '../../paint-utils'
import { useStore } from 'vuex'


export default defineComponent({
    name: 'Color',
    emits: ['colorClick'],
    setup(props, { emit }) {

        const store = useStore()
        const checked = computed(() => useCanvasCurrentTool(store) === 'color')

        function openColorPad() {
            store.commit('paint/setCurrentTool', 'color')
            emit('colorClick')
        }

        return {
            openColorPad,
            checked
        }
    },

    render() {
        return (
            <div class="game icon-palette" {...{ checked: `${this.checked}` }} onClick={this.openColorPad}></div>
        )
    }
})

