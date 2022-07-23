import { defineComponent, PropType } from 'vue'
import styles from './index.module.css'

const badgeProps = {
    text: {
        type: String,
        default: ''
    },
    color: {
        type: String,
        default: ''
    },
    bgColor: {
        type: String as PropType<'red' | 'green' | 'yellow'>,
        default: 'rgb(224, 117, 106)'
    },
    width: {
        type: String,
        default: '40px'
    },
    height: {
        type: String,
        default: '20px'
    }
}

export default defineComponent({
    name: 'Badge',
    props: badgeProps,
    setup(props) {

    },
    render() {
        return (
            <div class={[styles.badge, styles[this.$props.bgColor]]}
                style={{ color: this.$props.color, width: this.$props.width, height: this.$props.height, lineHeight: this.$props.height, }}>{this.$props.text}</div>
        )
    }
})
