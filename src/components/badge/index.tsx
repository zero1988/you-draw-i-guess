import { defineComponent } from 'vue'
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
        type: String,
        default: '#ff0000'
    },
    width: {
        type: Number,
        default: 0
    },
    height: {
        type: Number,
        default: 0
    }
}

export default defineComponent({
    name: 'Badge',
    props: badgeProps,
    setup(props) {

    },
    render() {
        return (
            <div class={styles.badge} style={{ color: this.$props.color, background: this.$props.bgColor }}>{this.$props.text}</div>
        )
    }
})
