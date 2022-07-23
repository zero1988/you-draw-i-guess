import { defineComponent, ref } from 'vue'
import styles from './index.module.css'
import XInput from '@/components/x-input'
import XButton from '@/components/x-button'

const sendBoxProps = {}

export default defineComponent({
    name: 'SendBox',
    props: sendBoxProps,
    emits: ['send'],
    components: {
        XInput,
        XButton
    },
    setup(props, { emit }) {
        const inputRef = ref()
        function send() {
            emit('send', inputRef.value.getValue())
            inputRef.value.clear()
        }

        return {
            inputRef,
            send
        }
    },
    render() {
        return (
            <div class={styles.wrapper}>
                <XInput ref='inputRef' class={styles.input} height='40px'  ></XInput>
                <div class={styles.space}></div>
                <XButton class={styles.button} width='60px' color='yellow' onBtnClick={this.send}>发送</XButton>
            </div>
        )
    }
})