import { defineComponent } from 'vue'
import styles from './index.module.css'

const messageProps = {
    portrait: {
        type: String,
        default: ''
    },
    sender: {
        type: String,
        default: ''
    },
    message: {
        type: String,
        default: ''
    }
}

export default defineComponent({
    name: 'Message',
    props: messageProps,
    setup() {

    },
    render() {
        return (
            <div>
                <span class={styles.portrait} style={{ background: `url${this.$props.portrait}` }}></span>
                <span class={styles.sender}>{this.$props.sender}</span>
                <span class={styles.message}>{this.$props.message}</span>
            </div >
        )
    }
})