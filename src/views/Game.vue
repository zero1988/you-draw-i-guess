<template>
    <div class="wrapper">
        <div class="title-wrapper">
            <div class="change-wrapper">
                <div class="game icon-refresh" @click="changeGame"></div>
            </div>
            <div class="game-num">{{ gameId }}房</div>
            <div class="avatar" :style="{ backgroundImage: avatar }">
            </div>
            <div class="watcher-wrapper">
                <div class="icon-eye"></div>
                <div class="watcher-number">{{ audiences.length }}</div>
            </div>

        </div>
        <div class="main-wrapper">
            <div>
                <div class="top" v-if="isRunning && runningNumber > 0">
                    <XPillLabel :width="300" :height="30" :leftWidth="80">
                        <template v-slot:left>
                            <span>{{ runningNumber }}</span>
                        </template>
                        <template v-slot:right>
                            {{ tip1 }} {{ tip2 }}
                        </template>
                    </XPillLabel>
                    <div class="drawer-wrapper">{{ drawer }}</div>
                </div>
                <div class="content">
                    <PaintPanel class="flex1" v-if="isRunning" :mode="mode"></PaintPanel>
                    <ReadyPanel class="flex1" v-if="isWaiting" @toggle="toggleReady" :time="waitingNumber"></ReadyPanel>
                </div>
            </div>
        </div>
        <div class="seat-wrapper">
            <Seat v-for="(player) in cPlayers" :key="player.userId" :id="player.userId" :name="player.userName"
                :avatarId="player.avatarId" class="flex1"></Seat>
        </div>
        <div class="message-wrapper">
            <div>
                <Message v-for="(message, index) in messages" :key="index" :avatarId="message.avatarId"
                    :message="message.message" :sender="message.userName"></Message>
            </div>
        </div>
        <div class="send-wrapper">
            <sendBox @send="send"></sendBox>
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
const websocketModule = namespace('websocket')


@Options({
    components: {
        PaintPanel,
        ReadyPanel,
        Seat,
        Message,
        SendBox,
        Popup,
        XPillLabel,
    },
    computed: {

    },
})
export default class Game extends Vue {

    show: boolean = false


    @gameModule.State('gameId') gameId!: string
    @gameModule.State('me') me!: any
    @gameModule.State('turn') turn!: number
    @gameModule.State('players') players!: Array<any>
    @gameModule.State('audiences') audiences!: Array<User>
    @gameModule.State('status') status!: GameStatus
    @gameModule.State('waitingNumber') waitingNumber!: number
    @gameModule.State('runningNumber') runningNumber!: number
    @gameModule.State('key') key!: string
    @gameModule.State('tip1') tip1!: string
    @gameModule.State('tip2') tip2!: string
    @gameModule.State('messages') messages!: Array<any>

    @websocketModule.Action('addPlayer') addPlayer!: () => void
    @websocketModule.Action('addAudience') addAudience!: () => void
    @websocketModule.Action('postMessage') postMessage!: (message: string) => void

    mounted() {

    }

    get isWaiting() {
        return this.status === GameStatus.Waiting
    }
    get isRunning() {
        return this.status === GameStatus.Running
    }
    get cPlayers() {
        const players = this.players.map((player: any) => {
            return {
                userId: player.userId,
                userName: player.userName,
                avatarId: player.avatarId
            } as User
        })
        const len = 5 - players.length
        for (let i = 0; i < len; i++) {
            players.push(new User())
        }
        return players
    }
    get mode() {
        const index = this.players.findIndex((player: any) => {
            return player.userId === this.me.userId
        })
        return index === this.turn ? 'draw' : 'guess'
    }

    get avatar() {
        return `url(src/assets/avatars/${this.me.avatarId}.png)`
    }

    get drawer() {
        if (this.status === GameStatus.Running) {
            let uname = ''
            this.players.forEach((player: any, index: number) => {
                if (index === this.turn) {
                    uname = player.userName
                }
            })
            return `当前作者: ${uname}`
        }
        return ''
    }

    changeGame() {

    }

    send(message: string) {
        this.postMessage(message)
    }

    toggleReady(ready: boolean) {
        ready ? this.addPlayer() : this.addAudience()
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
    height: 30px;
    padding: 10px 10px 0 10px;
}

.change-wrapper {
    float: left;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid;
    background-color: rgb(250, 232, 122);
}

.game-num {
    float: left;
    line-height: 35px;
    padding-left: 5px;
    font-weight: 600;
}

.watcher-wrapper {
    float: right;
    height: 30px;
    border-radius: 30px;
    border: 2px solid;
    background-color: rgb(250, 232, 122);
}

.icon-refresh {
    font-size: 24px;
    line-height: 30px;
}

.icon-eye {
    font-size: 24px;
    line-height: 30px;
    float: left;
    padding-left: 5px;
}

.watcher-number {
    line-height: 30px;
    display: inline-block;
    font-size: 18px;
    font-weight: 600;
    padding: 0 10px 0 5px;
}

.avatar {
    width: 33px;
    height: 34px;
    border-radius: 50%;
    /* border: 1px solid; */
    float: right;
    margin-left: 10px;
    background-size: contain;
}

.main-wrapper {
    flex: 1;
    padding: 10px 10px;
    border: 2px solid #000;
    border-radius: 20px;
    background-color: rgb(223, 237, 248);
    margin: 10px;
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
    margin-bottom: 10px;
}

.main-wrapper .drawer-wrapper {
    font-size: 20px;
    font-weight: 600;
    line-height: 40px;
    text-align: right;
    flex: 1;
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
    padding: 0 10px;
}

.message-wrapper>div {
    height: 100%;
    overflow: auto;
}

.send-wrapper {
    margin-top: 10px;
    height: 60px;
}
</style>