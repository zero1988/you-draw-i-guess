import { defineComponent } from 'vue'
import styles from './index.module.css'

const popupProps = {
    maskBgColor: {
        type: String,
        default: 'transparent'
    },
    width: {
        type: String,
        default: '300px'
    },
    height: {
        type: String,
        default: '300px'
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
                <div style={{ width: `${this.$props.width}`, height: `${this.$props.height}` }}>
                    <slot name="content"></slot>
                </div>
            </div>
        )
    }
})
