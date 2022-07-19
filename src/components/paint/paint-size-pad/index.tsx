import { defineComponent, computed } from 'vue'
import styles from './index.module.css'
import { useStore } from 'vuex'

const sizes = [3, 6, 9, 12, 15]

export default defineComponent({
    name: 'SizePad',
    setup() {
        const store = useStore()
        const size = computed(() => store.state.paint.size)

        function selectSize(e: MouseEvent) {
            const target = e.target as HTMLElement
            const size = parseInt(target.getAttribute('data') as string)
            if (sizes.indexOf(size) > -1) {
                store.commit('paint/setSize', size)
            }
        }

        return {
            size,
            selectSize
        }
    },
    render() {
        return (
            <div class={styles.wrapper}>
                {sizes.map(size => {
                    return (
                        <div class={styles['point-wrapper']} {...{ data: size }} onClick={this.selectSize}>
                            <div class={styles.point} {...{ checked: this.size === size, data: size }} style={{
                                width: `${size * 2}px`,
                                height: `${size * 2}px`,
                            }}>
                            </div>
                        </div>
                    )
                })}
            </div>
        )

    }
})
