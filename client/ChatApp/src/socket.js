import { io } from 'socket.io-client'
import { reactive } from 'vue'

const URL = 'http://localhost:3000'

export const socket_state = reactive({
  connected: false
})

export const socket = io(URL)

socket.on('connect', () => {
  socket_state.connected = true
})

socket.on('disconnect', () => {
  socket_state.disconnect = false
})
