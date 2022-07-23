import { defineComponent, PropType, ref } from 'vue'
import styles from './index.module.css'

const inputProps = {
    width: {
        type: String,
        default: '300px'
    },
    height: {
        type: String,
        default: '40px'
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
        const inputRef = ref()
        function input(event: any) {
            emit('update:modelValue', event.target.value)
        }

        function getValue(): string {
            return inputRef.value.value
        }
        function clear() {
            inputRef.value.value = ''
        }

        function blur() {
            let scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
            window.scrollTo(0, Math.max(scrollHeight - 1, 0))
        }

        return {
            input,
            inputRef,
            getValue,
            clear,
            blur
        }
    },
    render() {
        return (
            <div class={styles.wrapper}
                style={{
                    width: `${this.$props.width}`,
                    height: `${this.$props.height}`
                }}>
                <input ref='inputRef' type={this.$props.type} placeholder={this.$props.placeholder} value={this.$props.modelValue} onInput={this.input} onBlur={this.blur} />
            </div>
        )
    }
})