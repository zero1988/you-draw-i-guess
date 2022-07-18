import { defineComponent } from 'vue'
import styles from './index.module.css'

const iconProps = {

}


export default defineComponent({
    name: 'XIcon',
    props: iconProps,
    setup() {

    },
    render() {
        return (
            <div class={styles.wrapper}></div>
        )
    }
})