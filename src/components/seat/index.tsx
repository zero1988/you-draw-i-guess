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
    },
    isDrawer: {
        type: Boolean,
        default: false
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
                    <Badge class={styles.badge}
                        v-show={this.$props.isDrawer || this.$props.score !== -1}
                        bgColor={this.$props.isDrawer ? 'yellow' : (this.$props.score > 0 ? 'green' : 'red')}
                        text={this.$props.isDrawer ? `绘画中` : (this.$props.score > 0 ? `+${this.$props.score}` : `答错`)}></Badge>

                }
                <div class={`${styles.seat} ${this.$props.id === '' ? styles.nobody : ''}`} style={{ backgroundImage: `url(avatars/${this.$props.avatarId}.png)` }}></div>
                <div class={styles.name}>{this.$props.name}</div>
            </ div>
        )
    }
})