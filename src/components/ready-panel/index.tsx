import { computed, defineComponent, onMounted, ref } from 'vue'
import XButton from '@/components/x-button'
import styles from './index.module.css'

const readyPanelProps = {
    time: {
        type: Number,
        default: -1
    },
    ready: {
        type: Boolean,
        default: false
    }
}

export default defineComponent({
    name: 'ReadyPanel',
    props: readyPanelProps,
    components: {
        XButton
    },
    emits: ['toggle'],
    setup(props, { emit }) {
        const timeRef = ref(20)
        const buttonTextRef = computed(() => props.ready ? '取消准备' : '准备')


        onMounted(() => {
        })

        function toggle() {
            emit('toggle')
        }

        return {
            timeRef,
            buttonTextRef,
            toggle
        }
    },
    render() {
        return (
            <div class={styles.wrapper}>
                <div class={styles.desc}>
                    <p class={styles.title}>- 游戏规则 -</p>
                    <p>绘画阶段描述者根据所选题目进行会话，其他人答题</p>
                    <p>答题者根据答对的先后顺序获得不同分数</p>
                    <p>描述者根据猜对人数获得分数，所有人都猜对了则不会得分</p>
                    <p>最后根据最终分数进行排名获得对应的奖励或惩罚</p>
                </div>
                {
                    this.$props.time < 0 ? (<div class={styles.ready}>准备阶段</div>) : (
                        <div class={styles.time}>{this.$props.time}</div>
                    )
                }
                <div class={styles['button-wrapper']}>
                    <XButton width='50%' height='40px' color='yellow' onBtnClick={this.toggle}>{this.buttonTextRef}</XButton>
                </div>
            </div>
        )
    }
})