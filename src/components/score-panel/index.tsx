import { computed, defineComponent, onMounted, ref } from 'vue'
import styles from './index.module.css'
import { useStore } from 'vuex'
import { useCanvas } from '../paint/paint-utils'

const scorePanelProps = {
    players: {
        type: Array,
        default: () => []
    }
}

export default defineComponent({
    name: 'ScorePanel',
    props: scorePanelProps,
    components: {
    },
    setup() {
        const store = useStore()
        const urlRef = computed(() =>
            useCanvas(store)?.canvas.toDataURL('image/png')
        )


        return {
            urlRef,
        }

    },
    render() {
        return (
            <div class={styles.wrapper}>
                <div class={styles.title}>排行榜</div>
                {
                    this.$props.players.map((player: any, index) => {
                        return (
                            <div class={styles['score-wrapper']}>
                                <div class={styles.avatar} style={{
                                    backgroundImage: `url(avatars/${player.avatarId}.png)`
                                }}></div>
                                <div class={styles.name}>{player.userName}</div>
                                <div class={styles.score}>{`+${player.score}`}</div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
})