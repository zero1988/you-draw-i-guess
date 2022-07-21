import { MutationTree, ActionTree } from 'vuex'
import main from '@/main'

export interface Message {
    event: string
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
    SOCKET_ONMESSAGE(state, message: Message) {
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

    addSequence(state: WebSocketState) {
        state.sequence++
    }

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
    async SOCKET_ONMESSAGE({ state, commit }, message) {
        message = JSON.parse(message.data) as Message
        console.log(message)
        commit('SOCKET_ONMESSAGE', message)
        switch (message.event) {
            case 'hello':
                state.socket.isConnected && main.config.globalProperties.$socket.send(JSON.stringify({
                    action: 'join_game',
                    sequence: state.sequence,
                    data: JSON.stringify({
                        userId: 'C1034'
                    })
                }))
                commit('addSequence')
                break
            case 'join_game':
                commit('game/setGame', message.data, { root: true })
                break
            case 'paint_data':
                commit('paint/push', message.data, { root: true })
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
    async Push({ commit }, data: any) {

    }

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}