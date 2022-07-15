import { defineComponent, PropType } from 'vue'

const inputProps = {
    type: {
        type: String as PropType<'text' | 'password'>,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    }
}


export default defineComponent({
    name: 'XInput',
    props: inputProps,
    setup() {

    },
    render() {
        return (
            <div>
                <input type={this.$props.type} />
            </div>
        )
    }
})