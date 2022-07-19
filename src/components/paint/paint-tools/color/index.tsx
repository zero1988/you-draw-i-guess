import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
    name: 'Color',
    setup(props, { emit }) {

        function setPad() {
            console.log('emit setPad color')
            emit('abc')
        }

        return {
            setPad,
        }
    },

    render() {
        return (
            <div onClick={this.setPad}>颜色</div>
        )
    }
})

