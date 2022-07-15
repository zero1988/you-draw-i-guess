import { defineComponent } from 'vue'
import styles from './index.module.css'

const popupProps = {
    maskBgColor: {
        type: String,
        default: 'transparent'
    },
    width: {
        type: Number,
        default: 0
    },
    height: {
        type: Number,
        default: 0
    },
}


export default defineComponent({
    name: 'Popup',
    props: popupProps,
    setup() {

    },
    render() {
        return (
            <div class={styles.mask} style={{ backgroundColor: this.$props.maskBgColor }}>
                <div style={{ width: `${this.$props.width}px`, height: `${this.$props.height}px` }}>
                    <slot name="content"></slot>
                </div>
            </div>
        )
    }
})
