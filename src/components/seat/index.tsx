import { defineComponent } from 'vue'
import styles from './index.module.css'
import Badge from '@/components/badge'

const seatProps = {
    id: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    avatarId: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: -1
    }
}

export default defineComponent({
    name: 'Seat',
    props: seatProps,
    components: {
        Badge
    },
    setup() {

    },
    render() {
        return (
            <div class={styles.wrapper}>
                {
                    this.$props.score > 0 ? (<Badge class={styles.badge} bgColor='green' text={`${this.$props.score}`}></Badge>) : (this.$props.score === 0 ? (<Badge class={styles.badge} bgColor='red' text='答错'></Badge>) : '')
                }
                <div class={`${styles.seat} ${this.$props.id === '' ? styles.nobody : ''}`} style={{ backgroundImage: `url(src/assets/avatars/${this.$props.avatarId}.png)` }}></div>
                <div class={styles.name}>{this.$props.name}</div>
            </ div>
        )
    }
})