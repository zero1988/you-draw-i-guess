import { MutationTree, ActionTree } from 'vuex'
import main from '@/main'

export interface WsMessage {
    event: string
    data: any
    sequence: number
}

export interface WsAction {
    action: string
    data: any
    sequence: number
}


export interface Socket {
    isConnected: boolean
    message: string
    reconnectError: boolean
    heartBeatInterval: number
    heartBeatTimer: any
}


export interface WebSocketState {
    socket: Socket
    sequence: number
}

const state: WebSocketState = {
    socket: {
        isConnected: false,
        message: '',
        reconnectError: false,
        heartBeatInterval: 500000,
        heartBeatTimer: 0
    },
    sequence: 1
}

const mutations: MutationTree<WebSocketState> = {
    SOCKET_ONOPEN(state: WebSocketState, event) {
        main.config.globalProperties.$socket = event.currentTarget;
        state.socket.isConnected = true;
    },
    // 连接关闭
    SOCKET_ONCLOSE(state, event) {
        state.socket.isConnected = false;
        console.log("连接已断开: " + new Date());
        console.log(event);
    },
    // 发生错误
    SOCKET_ONERROR(state, event) {
        console.error(state, event);
    },
    // 收到服务端发送的消息
    SOCKET_ONMESSAGE(state, message: WsMessage) {
        // state.socket.message = message
    },
    // 自动重连
    SOCKET_RECONNECT(state, count) {
        console.info("消息系统重连中...", state, count);
    },
    // 重连错误
    SOCKET_RECONNECT_ERROR(state) {
        state.socket.reconnectError = true;
    },
}

const actions: ActionTree<WebSocketState, any> = {
    async SOCKET_ONOPEN({ commit }, event) {
        commit('SOCKET_ONOPEN', event)
    },
    // 连接关闭
    async SOCKET_ONCLOSE({ commit }, event) {
        commit('SOCKET_ONCLOSE', event)
    },
    // 发生错误
    async SOCKET_ONERROR({ commit }, event) {
        commit('SOCKET_ONERROR', event)
    },
    // 收到服务端发送的消息
    async SOCKET_ONMESSAGE({ state, rootState, commit }, message) {
        message = JSON.parse(message.data) as WsMessage
        console.log(message)
        commit('SOCKET_ONMESSAGE', message)
        switch (message.event) {
            case 'hello':
                sendMessage(state, {
                    action: 'join_game',
                    sequence: state.sequence++,
                    data: JSON.stringify({
                        userId: rootState.game.me.userId,
                    })
                })
                break
            case 'join_game':
                commit('game/setGame', message.data, { root: true })
                sendMessage(state, {
                    action: 'add_audience',
                    sequence: state.sequence++,
                    data: JSON.stringify({
                        gameId: rootState.game.gameId,
                        userId: rootState.game.me.userId,
                    })
                })
                break
            case 'push_paint_data':
                commit('paint/push', message.data, { root: true })
                break
            case 'update_paint_data':
                commit('paint/update', message.data, { root: true })
                break
            case 'undo_paint_data':
                commit('paint/undo', null, { root: true })
                break
            case 'redo_paint_data':
                commit('paint/redo', null, { root: true })
                break
            case 'clear_paint_data':
                commit('paint/clear', null, { root: true })
                break
            case 'add_audience':
                commit('game/setGame', message.data, { root: true })
                break
            case 'add_player':
                commit('game/setGame', message.data, { root: true })
                break
            case 'waiting_count_down':
                commit('game/setWaitingNumber', message.data.number, { root: true })
                break
            case 'start_game':
                commit('game/setGame', message.data, { root: true })
                break
        }

    },
    // 自动重连
    async SOCKET_RECONNECT({ commit }, count) {
        commit('SOCKET_RECONNECT', count)
    },
    // 重连错误
    async SOCKET_RECONNECT_ERROR({ commit }) {
        commit('SOCKET_RECONNECT_ERROR')
    },
    async pushPaint({ state, rootState }, data: any) {
        sendMessage(state, {
            action: 'push_paint_data',
            sequence: state.sequence++,
            data: JSON.stringify({
                gameId: rootState.game.gameId,
                userId: rootState.game.me.userId,
                data: data
            })
        })
    },
    async updatePaint({ state, rootState }, data: any) {
        sendMessage(state, {
            action: 'update_paint_data',
            sequence: state.sequence++,
            data: JSON.stringify({
                gameId: rootState.game.gameId,
                userId: rootState.game.me.userId,
                data: data
            })
        })
    },
    async undoPaint({ state, rootState }) {
        sendMessage(state, {
            action: 'undo_paint_data',
            sequence: state.sequence++,
            data: JSON.stringify({
                gameId: rootState.game.gameId,
                userId: rootState.game.me.userId,
            })
        })
    },
    async redoPaint({ state, rootState }) {
        sendMessage(state, {
            action: 'redo_paint_data',
            sequence: state.sequence++,
            data: JSON.stringify({
                gameId: rootState.game.gameId,
                userId: rootState.game.me.userId,
            })
        })
    },
    async clearPaint({ state, rootState }) {
        sendMessage(state, {
            action: 'clear_paint_data',
            sequence: state.sequence++,
            data: JSON.stringify({
                gameId: rootState.game.gameId,
                userId: rootState.game.me.userId,
            })
        })
    },
    async addPlayer({ state, rootState }) {
        sendMessage(state, {
            action: 'add_player',
            sequence: state.sequence++,
            data: JSON.stringify({
                gameId: rootState.game.gameId,
                userId: rootState.game.me.userId,
            })
        })
    },
    async addAudience({ state, rootState }) {
        sendMessage(state, {
            action: 'add_audience',
            sequence: state.sequence++,
            data: JSON.stringify({
                gameId: rootState.game.gameId,
                userId: rootState.game.me.userId,
            })
        })
    }
}

const sendMessage = (state: WebSocketState, action: WsAction) => {
    state.socket.isConnected && main.config.globalProperties.$socket.send(JSON.stringify(action))
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}