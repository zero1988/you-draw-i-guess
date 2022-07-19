import { defineComponent, computed } from 'vue'
import styles from './index.module.css'
import { useStore } from 'vuex'

const colors = ['rgb(0, 0, 0)', 'rgb(255, 255, 255)', 'rgb(229, 169, 74)', 'rgb(199, 65, 52)', 'rgb(83, 138, 237)', 'rgb(135, 177, 73)', 'rgb(224, 140, 143)',
    'rgb(238, 199, 182)', 'rgb(237, 205, 90)', 'rgb(219, 114, 71)', 'rgb(108, 58, 24)', 'rgb(165, 69, 214)', 'rgb(136, 136, 136)', 'rgb(253, 251, 227)',
    'rgb(185, 79, 156)', 'rgb(143, 41, 25)', 'rgb(108, 46, 74)', 'rgb(55, 31, 84)', 'rgb(58, 96, 38)', 'rgb(128, 200, 133)', 'rgb(31, 44, 202)']
export default defineComponent({
    name: 'ColorPad',
    setup() {
        const store = useStore()
        const color = computed(() => store.state.paint.color)

        function selectColor(e: MouseEvent) {
            const target = e.target as HTMLElement
            const color = target.getAttribute('data') as string
            if (colors.indexOf(color) > -1) {
                store.commit('paint/setColor', color)
            }
        }

        return {
            color,
            selectColor
        }
    },
    render() {
        return (
            <div class={styles.wrapper}>
                {colors.map(color => {
                    return (
                        <div class={styles['circle-wrapper']}>
                            <div class={styles.circle} style={{
                                backgroundColor: color
                            }} {...{ checked: this.color === color, data: color }} onClick={this.selectColor} >
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
})

