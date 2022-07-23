import { defineComponent } from 'vue'
import styles from './index.module.css'

const messageProps = {
    avatarId: {
        type: Number,
        default: 1
    },
    sender: {
        type: String,
        default: '张三'
    },
    message: {
        type: String,
        default: '今天天气不错'
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
                <span class={styles.portrait} style={{ background: `url${this.$props.avatarId}` }}></span>
                <span class={styles.sender}>{this.$props.sender}</span>
                <span class={styles.message}>{this.$props.message}</span>
            </div >
        )
    }
})