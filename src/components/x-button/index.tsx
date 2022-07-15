import { defineComponent, PropType } from 'vue'
import styles from './index.module.css'

const buttonProps = {
    link: {
        type: Boolean,
        default: false
    },
    color: {
        type: String as PropType<'green' | 'yellow'>,
        default: 'green'
    },
    width: {
        type: Number,
        default: 300,
    },
    height: {
        type: Number,
        default: 30,
    }
}

export default defineComponent({
    name: 'XButton',
    props: buttonProps,
    setup() {

    },
    render() {
        return (
            <div class={`${this.$props.link ? styles.link : styles.button} ${this.$props.link ? '' : styles[this.$props.color]
                }`}
                style={{
                    width: `${this.$props.width}px`,
                    height: `${this.$props.height}px`,
                    lineHeight: `${this.$props.height}px`
                }}>
                {this.$slots.default?.()}
            </div>
        )
    }
})

