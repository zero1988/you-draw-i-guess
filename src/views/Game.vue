<template>
    <div>
        <div class="title-wrapper">
            <div>房间号</div>
            <div>观众数量</div>
            <div>换房间</div>
        </div>
        <div class="main-wrapper">
            <div>计时器</div>
            <div>词语</div>
            <PaintPanel></PaintPanel>
            <ReadyPanel></ReadyPanel>
        </div>
        <div class="seat-wrapper">
            <Seat v-for="(index) in 5" :key="index"></Seat>
        </div>
        <div class="message-wrapper">
            <Message v-for="(index) in 15" :key="index"></Message>
        </div>
        <sendBox></sendBox>
        <Popup v-if="show"></Popup>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import PaintPanel from '@/components/paint/paint-panel'
import ReadyPanel from '@/components/ready-panel'
import Seat from '@/components/seat'
import Message from '@/components/message'
import SendBox from '@/components/send-box'
import Popup from '@/components/popup'


@Options({
    components: {
        PaintPanel,
        ReadyPanel,
        Seat,
        Message,
        SendBox,
        Popup
    },
})
export default class Game extends Vue {

    show: boolean = false

    mounted() {

    }
}
</script>

<style scoped>
</style>