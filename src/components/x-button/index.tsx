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
        type: String,
        default: '300px',
    },
    height: {
        type: String,
        default: '30px',
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
                    width: `${this.$props.width}`,
                    height: `${this.$props.height}`,
                    lineHeight: `${this.$props.height}`
                }}>
                {this.$slots.default?.()}
            </div>
        )
    }
})

