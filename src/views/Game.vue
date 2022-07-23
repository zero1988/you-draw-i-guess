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
                <div class="top" :style="{
                    visibility: isRunning && runningNumber > 0 ? 'visible' : 'hidden'
                }">
                    <XPillLabel :width="300" :height="30" :leftWidth="80">
                        <template v-slot:left>
                            <span>{{ runningNumber }}</span>
                        </template>
                        <template v-slot:right>
                            <span v-show="showTip1">{{ tip1 }}</span> <span v-show="showTip2">{{ tip2 }}</span>
                            <span v-show="mode === 'draw'"> {{ key }}</span>
                        </template>
                    </XPillLabel>
                </div>
                <div class="content">
                    <PaintPanel class="flex1" v-if="isRunning" :mode="mode"></PaintPanel>
                    <ReadyPanel class="flex1" v-if="isWaiting" @toggle="toggleReady" :time="waitingNumber"></ReadyPanel>
                    <ResultPanel class="flex1" v-if="isPause" :word="key"></ResultPanel>
                </div>
            </div>
        </div>
        <div class="seat-wrapper">
            <Seat v-for="(player) in cPlayers" :key="player.userId" :id="player.userId" :name="player.userName"
                :avatarId="player.avatarId" :isDrawer="getDrawer(player.userId)" :score="getScore(player.userId)"
                class="flex1"></Seat>
        </div>
        <div class="message-wrapper">
            <div ref="scrollerRef">
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
import { ref } from 'vue'
import PaintPanel from '@/components/paint/paint-panel'
import ReadyPanel from '@/components/ready-panel'
import ResultPanel from '@/components/result-panel'
import Seat from '@/components/seat'
import Message from '@/components/message'
import SendBox from '@/components/send-box'
import Popup from '@/components/popup'
import XPillLabel from '@/components/x-pill-label'
import { User, GameStatus } from '@/models'
import { namespace } from 'vuex-class'
import { login } from '@/api/login'
import config from '@/config'


const gameModule = namespace('game')
const websocketModule = namespace('websocket')


@Options({
    components: {
        PaintPanel,
        ReadyPanel,
        ResultPanel,
        Seat,
        Message,
        SendBox,
        Popup,
        XPillLabel,
    },
    watch: {
        messages: {
            handler(messages) {
                this.$nextTick(() => {
                    this.scrollerRef.scrollTop = this.scrollerRef.scrollHeight
                })
            },
            deep: true
        }
    }
})
export default class Game extends Vue {

    show: boolean = false
    scrollerRef: any = ref()

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
    @gameModule.State('scores') scores!: Map<string, number>
    @gameModule.Mutation('setMe') setMe!: (user: User) => void

    @websocketModule.State('socket') socket!: any

    @websocketModule.Action('addPlayer') addPlayer!: () => void
    @websocketModule.Action('addAudience') addAudience!: () => void
    @websocketModule.Action('postMessage') postMessage!: (message: string) => void

    mounted() {
        let userId = localStorage.getItem('userId')
        let password = localStorage.getItem('password')

        if (userId && password && !this.socket.isConnected) {


            login(userId, password).then(res => res.json()).then(res => {
                localStorage.setItem('userId', res.data.userId)
                localStorage.setItem('userName', res.data.userName)
                localStorage.setItem('password', res.data.password)
                localStorage.setItem('avatarId', res.data.avatarId)

                this.setMe(res.data as User)
                this.$connect(`${config.wsUrl}/websocket/?userId=${res.data.userId}`)
            })
        }
    }


    get isWaiting() {
        return this.status === GameStatus.Waiting
    }

    get isPause() {
        return this.status === GameStatus.Pause
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

    get showTip1() {
        return this.status === GameStatus.Running && this.mode !== 'draw'
    }

    get showTip2() {
        return this.status === GameStatus.Running && this.runningNumber < 40 && this.mode !== 'draw'
    }

    getDrawer(userId: string) {
        let isDrawer = false
        if (this.status === GameStatus.Running) {
            this.players.forEach((player: any, index: number) => {
                if (index === this.turn) {
                    if (userId === player.userId) {
                        isDrawer = true
                    }
                }
            })

        }
        return isDrawer
    }

    getScore(userId: string) {
        return this.scores.has(userId) ? this.scores.get(userId) : -1
    }

    changeGame() {

    }

    send(message: string) {
        if (message === this.key && this.mode === 'guess' && this.status === GameStatus.Running) {
            (document.getElementById('bingo') as any).play()
        }

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
    height: 100px;
    overflow: auto;
}

.send-wrapper {
    margin-top: 10px;
    height: 60px;
}
</style>