import { defineComponent, PropType } from 'vue'
import styles from './index.module.css'

const buttonProps = {
    text: {
        type: String,
        default: 'Button'
    },
    type: {
        type: String as PropType<'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link'>,
        default: 'primary'
    }
}

export default defineComponent({
    name: 'XButton',
    props: buttonProps,
    setup() {

    },
    render() {
        return (
            <div class={`${this.$props.type === 'link' ? '' : 'button'} ${this.$props.type}`}>{this.text}</div>
        )
    }
})

