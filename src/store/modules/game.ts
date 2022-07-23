import { MutationTree } from 'vuex'
import { User, GameStatus } from '@/models'

const MaxPlayerCount = 5

export interface GameState {
    me: User
    gameId: String
    players: Array<User>  // 当前游戏的玩家(准备好的)
    audiences: Array<User> // 未准备的玩家 
    waitingNumber: Number
    turn: Number
    status: GameStatus
}

const state: GameState = {
    me: new User(),
    gameId: '',
    players: [],
    audiences: [],
    waitingNumber: -1,
    turn: 20,
    status: GameStatus.Waiting,
}

const mutations: MutationTree<GameState> = {
    setMe(state: GameState, me: User) {
        state.me = me
    },
    updateMe(state: GameState, me: User) {
        state.me = {
            ...state.me,
            ...me,
        }
    },
    setGame(state: GameState, game: any) {
        state.gameId = game.gameId
        state.players = game.players
        state.audiences = game.audiences
        state.turn = game.turn
        state.status = game.status
    },
    setWaitingNumber(state: GameState, number: Number) {
        state.waitingNumber = number
    }
}

export default {
    namespaced: true,
    state,
    mutations
}