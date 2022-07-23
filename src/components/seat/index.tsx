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
        default: '张三'
    },
    avatarId: {
        type: Number,
        default: 0
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
            <div>
                <Badge></Badge>
                <div class={`${styles.seat} ${this.$props.id === '' ? styles.nobody : ''}`} style={{ backgroundImage: `url(src/assets/avatars/${this.$props.avatarId}.png)` }}></div>
                <div class={styles.name}>{this.$props.name}</div>
            </ div>
        )
    }
})