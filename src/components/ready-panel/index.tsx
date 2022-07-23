import { defineComponent, onMounted, ref } from 'vue'
import XButton from '@/components/x-button'
import styles from './index.module.css'

const readyPanelProps = {

}

export default defineComponent({
    name: 'ReadyPanel',
    props: readyPanelProps,
    components: {
        XButton
    },
    setup() {
        const timeRef = ref(20)

        onMounted(() => {
            const timeInterval = setInterval(() => {
                timeRef.value--
                if (timeRef.value === 0) {
                    clearInterval(timeInterval)
                }
            }, 1000)
        })

        return {
            timeRef,
        }
    },
    render() {
        return (
            <div class={styles.wrapper}>
                <div>准备阶段</div>
                <div class={styles.time}> {this.timeRef}</div>
                <div>
                    <XButton>准备</XButton>
                </div>
            </div>
        )
    }
})