import { defineComponent, PropType } from 'vue'
import styles from './index.module.css'

const labelProps = {
    width: {
        type: Number,
        default: 300
    },
    height: {
        type: Number,
        default: 30
    },
    leftText: {
        type: String,
        default: ''
    },
    leftColor: {
        type: String as PropType<'green' | 'yellow'>,
        default: 'green'
    },
    leftWidth: {
        type: Number,
        default: 100
    },
    rightText: {
        type: String,
        default: ''
    },
    rightColor: {
        type: String as PropType<'green' | 'yellow'>,
        default: 'yellow'
    }
}


export default defineComponent({
    name: 'XPillLabel',
    props: labelProps,
    setup() {

    },
    render() {
        return (
            <div class={`${styles.wrapper}`}
                style={{
                    width: `${this.$props.width}px`,
                    height: `${this.$props.height}px`,
                }}>
                <div class={`${styles.left} ${styles[this.$props.leftColor]}`}
                    style={{
                        borderRadius: `${this.$props.height}px`,
                        height: `${this.$props.height}px`,
                        width: `${this.$props.leftWidth}px`,
                        lineHeight: `${this.$props.height}px`
                    }}>{this.$slots.left?.()}</div>
                <div class={`${styles.right} ${styles[this.$props.rightColor]}`}
                    style={{
                        width: `${this.$props.width - this.$props.leftWidth}px`,
                        height: `${this.$props.height}px`,
                        left: `${this.$props.leftWidth - this.$props.height}px`,
                        borderRadius: `${this.$props.height}px`,
                        lineHeight: `${this.$props.height}px`
                    }}
                >{this.$slots.right?.()}</div>
            </div >
        )
    }
})