import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useCanvasStack } from '../../paint-utils'
import styles from '../index.module.css'

export default defineComponent({
    name: 'Undo',
    setup() {

        const store = useStore()
        const stackCountRef = computed(() => useCanvasStack(store).length)

        function undo() {
            store.commit('paint/undo')
            store.dispatch('websocket/undoPaint')
        }

        return {
            undo,
            stackCountRef
        }
    },

    render() {
        return (
            <div class={[`game icon-undo`, this.stackCountRef === 0 ? styles.disable : '']} onClick={this.undo}></div>
        )
    }
})

