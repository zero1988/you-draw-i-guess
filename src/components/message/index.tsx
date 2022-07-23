import { defineComponent } from 'vue'
import styles from './index.module.css'

const messageProps = {
    avatarId: {
        type: Number,
        default: 0
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
            <div class={styles.wrapper}>
                <div class={styles.avatar} style={{ backgroundImage: `url(src/assets/avatars/${this.$props.avatarId}.png)` }}></div>
                <div class={styles['message-wrapper']}>
                    <span class={styles.sender}>{this.$props.sender}: </span>
                    <span class={styles.message}>{this.$props.message}</span>
                </div>
            </div >
        )
    }
})