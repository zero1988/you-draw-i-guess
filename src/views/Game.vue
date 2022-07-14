<template>
    <div>
        <PaintPanel></PaintPanel>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import PaintPanel from '@/components/paint/paint-panel/index.tsx'

@Options({
    components: {
        PaintPanel
    },
})
export default class Game extends Vue {
    mounted() {
        console.log('Main mounted')
    }
}
</script>

<style scoped>
</style>