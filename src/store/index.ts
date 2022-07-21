import { createStore } from 'vuex'
import paint from '@/store/modules/paint'
import websocket from '@/store/modules/websocket'
import game from '@/store/modules/game'

export default createStore({
    modules: {
        paint,
        websocket,
        game
    },
})
