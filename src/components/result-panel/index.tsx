import { computed, defineComponent, onMounted, ref } from 'vue'
import styles from './index.module.css'
import { useStore } from 'vuex'
import { useCanvas } from '../paint/paint-utils'

const resultPanelProps = {
    word: {
        type: String,
        default: ''
    }
}

export default defineComponent({
    name: 'ResultPanel',
    props: resultPanelProps,
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
                <div class={styles.image} style={{ backgroundImage: `url(${this.urlRef})` }}></div>
                <div class={styles['answer-wrapper']}>
                    <p>答案: {this.$props.word}</p>
                </div>
            </div>
        )
    }
})