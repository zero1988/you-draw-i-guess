import { defineComponent } from 'vue'
import styles from './index.module.css'

const labelProps = {
    width: {
        type: Number,
        default: 300
    },
    height: {
        type: Number,
        default: 30
    },
}


export default defineComponent({
    name: 'XLabel',
    props: labelProps,
    setup() {

    },
    render() {
        return (
            <div class={styles.wrapper}
                style={{
                    width: `${this.$props.width}px`,
                    height: `${this.$props.height}px`
                }}>
                {this.$slots.default?.()}
            </div>
        )
    }
})