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
    portrait: {
        type: String,
        default: ''
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
                <div class={`${styles.seat} ${this.$props.id === '' ? styles.nobody : ''}`}></div>
                <div class="name">{this.$props.name}</div>
            </div>
        )
    }
})