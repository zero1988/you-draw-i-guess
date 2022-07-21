import { defineComponent, PropType } from 'vue'
import styles from './index.module.css'

const inputProps = {
    width: {
        type: Number,
        default: 300
    },
    height: {
        type: Number,
        default: 30
    },
    type: {
        type: String as PropType<'text' | 'password'>,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    },
}


export default defineComponent({
    name: 'XInput',
    props: inputProps,
    setup(props, { emit }) {
        function input(event: any) {
            emit('update:modelValue', event.target.value)
        }
        return {
            input
        }
    },
    render() {
        return (
            <div class={styles.wrapper}
                style={{
                    width: `${this.$props.width}px`,
                    height: `${this.$props.height}px`
                }}>
                <input type={this.$props.type} placeholder={this.$props.placeholder} value={this.$props.modelValue} onInput={this.input} />
            </div>
        )
    }
})