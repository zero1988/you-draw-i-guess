<template>
    <div class="wrapper">
        <div class="title-wrapper">
            <div>房间号</div>
            <div>观众数量</div>
            <div>换房间</div>
        </div>
        <div class="main-wrapper">
            <div class="top">
                <XPillLabel :width="200" :height="20" :leftWidth="60">
                    <template v-slot:left>
                        23
                    </template>
                    <template v-slot:right>
                        三个字 家电
                    </template>
                </XPillLabel>
            </div>
            <div class="content">
                <PaintPanel :width="450" :height="450"></PaintPanel>
                <ReadyPanel v-if="false"></ReadyPanel>
            </div>
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
import XPillLabel from '@/components/x-pill-label'

@Options({
    components: {
        PaintPanel,
        ReadyPanel,
        Seat,
        Message,
        SendBox,
        Popup,
        XPillLabel
    },
})
export default class Game extends Vue {

    show: boolean = false

    mounted() {

    }
}
</script>

<style scoped>
.wrapper {
    padding: 20px;
}

.main-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border: 2px solid #000;
    border-radius: 20px;
    padding: 20px;
}

.main-wrapper .top {
    flex: 40px;
    display: flex;
    align-items: center;
    margin-left: 20px;
}

.main-wrapper .content {}
</style>