import { defineComponent, computed, PropType } from 'vue'
import styles from './index.module.css'
import { useStore } from 'vuex'

const sizes = [3, 6, 9, 12, 15]
const eraserSizes = [6, 9, 12, 15]

const sizeProps = {
    mode: {
        type: String as PropType<'solid' | 'hollow'>,
        default: 'solid'
    }
}

export default defineComponent({
    name: 'SizePad',
    props: sizeProps,
    setup(props) {
        const store = useStore()
        const size = computed(() => store.state.paint.size)
        const eraserSize = computed(() => store.state.paint.eraserSize)

        function selectSize(e: MouseEvent) {
            const target = e.target as HTMLElement
            const size = parseInt(target.getAttribute('data') as string)
            if (sizes.indexOf(size) > -1) {
                if (props.mode === 'solid') {
                    store.commit('paint/setSize', size)
                } else {
                    store.commit('paint/setEraserSize', size)
                }
            }
        }

        function clear() {
            store.commit('paint/clear')
        }

        return {
            size,
            eraserSize,
            selectSize,
            clear
        }
    },
    render() {
        return (
            <div class={styles.wrapper}>
                {
                    this.$props.mode === 'solid' ? sizes.map((size) => {
                        return (
                            <div class={styles['point-wrapper']} {...{ data: size }} onClick={this.selectSize}>
                                <div class={styles.solid} {...{ checked: this.size === size, data: size }} style={{ width: `${size * 2}px`, height: `${size * 2}px` }}></div>
                            </div>
                        )
                    }) : eraserSizes.map((size) => {
                        return (
                            <div class={styles['point-wrapper']} {...{ data: size }} onClick={this.selectSize}>
                                <div class={styles.hollow} {...{ checked: this.eraserSize === size, data: size }} style={{ width: `${size * 1}px`, height: `${size * 1}px` }}></div>
                            </div>
                        )
                    })
                }
                {
                    this.$props.mode !== 'solid' ?
                        <div class={[styles['point-wrapper'], `game icon-clear`]} style={{ fontSize: '24px' }} onClick={this.clear}></div> : ''
                }
            </div>
        )

    }
})
