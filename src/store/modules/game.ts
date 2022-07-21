import { MutationTree } from 'vuex'
import { User, GameStatus } from '@/models'

const MaxPlayerCount = 5

export interface GameState {
    me: User
    gameId: Number
    players: Array<User>  // 当前游戏的玩家(准备好的)
    audiences: Array<User> // 未准备的玩家
    turn: Number
    status: GameStatus
}

const state: GameState = {
    me: new User(),
    gameId: 0,
    players: [],
    audiences: [],
    turn: 20,
    status: GameStatus.Waiting,
}

const mutations: MutationTree<GameState> = {
    setMe(state: GameState, me: User) {
        state.me = me
    },
    setGame(state: GameState, game: any) {
        state.gameId = game.gameId
        state.players = game.players
        state.audiences = game.audiences
        state.turn = game.turn
        state.status = game.status
    },
}

export default {
    namespaced: true,
    state,
    mutations
}