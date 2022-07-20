import { defineComponent, PropType } from 'vue'


export default defineComponent({
    name: 'Color',
    emits: ['colorClick'],
    setup(props, { emit }) {

        function openColorPad() {
            emit('colorClick')
        }

        return {
            openColorPad,
        }
    },

    render() {
        return (
            <div onClick={this.openColorPad}>颜色</div>
        )
    }
})

