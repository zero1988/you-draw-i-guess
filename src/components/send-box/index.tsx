import { defineComponent } from 'vue'
import styles from './index.module.css'
import xInput from '@/components/x-input'
import XButton from '@/components/x-button'

const sendBoxProps = {}

export default defineComponent({
    name: 'SendBox',
    props: sendBoxProps,
    components: {
        xInput,
        XButton
    },
    setup() {

    },
    render() {
        return (
            <div class={styles.wrapper}>
                <xInput></xInput>
                <XButton text="发送"></XButton>
            </div>
        )
    }
})