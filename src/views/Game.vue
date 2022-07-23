<template>
    <div class="wrapper">
        <div class="title-wrapper">
            <div>房间号</div>
            <div>观众数量{{ audiences.length }}</div>
            <div>换房间</div>
        </div>
        <div class="main-wrapper">
            <div>
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
                    <PaintPanel class="flex1" v-if="{ isRunning }"></PaintPanel>
                    <ReadyPanel class="flex1" v-if="{ isWaiting }"></ReadyPanel>
                </div>
            </div>
        </div>
        <div class="seat-wrapper">
            <Seat v-for="(player) in players" :key="player.userId" :id="player.userId" :name="player.userName"
                :avatarId="player.avatarId" class="flex1"></Seat>
        </div>
        <div class="message-wrapper">
            <div>
                <Message v-for="(index) in 15" :key="index"></Message>
            </div>
        </div>
        <div class="send-wrapper">
            <sendBox></sendBox>
        </div>
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
import { User, GameStatus } from '@/models'
import { namespace } from 'vuex-class'

const gameModule = namespace('game')


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
    computed: {
        isWaiting() {
            return this.status === GameStatus.Waiting
        },
        isRunning() {
            return this.status === GameStatus.Running
        }
    },
})
export default class Game extends Vue {

    show: boolean = false
    isWaiting: boolean = false
    isRunning: boolean = false

    @gameModule.State('gameId') gameId!: number
    @gameModule.State('players') players!: Array<User>
    @gameModule.State('audiences') audiences!: Array<User>
    @gameModule.State('status') status!: GameStatus


    mounted() {

    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
}

.title-wrapper {
    height: 60px;
}

.main-wrapper {
    flex: 1;
    padding: 10px 10px;
    border: 2px solid #000;
    border-radius: 20px;
}

.main-wrapper>div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

}

.main-wrapper .top {
    height: 40px;
    display: flex;
    align-items: center;
    margin-left: 20px;
}

.main-wrapper .content {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.flex1 {
    flex: 1;
}

.seat-wrapper {
    height: 70px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.message-wrapper {
    height: 100px;
}

.message-wrapper>div {
    overflow: auto;
}

.send-wrapper {
    margin-top: 10px;
    height: 60px;
}
</style>