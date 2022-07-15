import { defineComponent, PropType } from 'vue'
import styles from './index.module.css'

const inputProps = {
    width: {
        type: Number,
        default: 300
    },
    height: {
        type: Number,
        default: 30
    },
    type: {
        type: String as PropType<'text' | 'password'>,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    }
}


export default defineComponent({
    name: 'XInput',
    props: inputProps,
    setup() {

    },
    render() {
        return (
            <div class={styles.wrapper}
                style={{
                    width: `${this.$props.width}px`,
                    height: `${this.$props.height}px`
                }}>
                <input type={this.$props.type} placeholder={this.$props.placeholder} />
            </div>
        )
    }
})