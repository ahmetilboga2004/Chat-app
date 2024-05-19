<script setup>
import { socket } from '@/socket'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/user'
import MessageStart from '@/components/MessageStartItem.vue'
import MessageEnd from '@/components/MessageEndItem.vue'
import defaultAvatar from '@/assets/default-profile.png'

const userStore = useUserStore()
const message = ref('')
const messages = ref([])
const localUsername = localStorage.getItem('username')

onMounted(() => {
  socket.on('message', (msg) => {
    messages.value.push(msg)
  })
})
const sendMessage = () => {
  socket.emit('message', {
    avatar: defaultAvatar,
    username: localUsername || userStore.username,
    message: message.value
  })
  message.value = ''
}
</script>
<template>
  <main>
    <div class="container mx-auto lg:p-8 h-screen">
      <div class="bg-slate-600 rounded-lg p-4 h-full grid">
        <div class="max-h-[46rem] overflow-scroll">
          <template v-for="(message, index) in messages" :key="index">
            <template
              v-if="message.username === userStore.username || message.username === localUsername"
            >
              <MessageEnd
                :message="message.message"
                :username="message.username"
                :avatar="message.avatar"
              ></MessageEnd>
            </template>
            <template v-else>
              <MessageStart
                :message="message.message"
                :username="message.username"
                :avatar="message.avatar"
              ></MessageStart>
            </template>
          </template>
        </div>
        <div class="flex justify-between self-end items-center gap-2 lg:gap-4">
          <input
            type="text"
            @keyup.enter="sendMessage"
            v-model="message"
            class="input input-sm md:input-md input-bordered w-full"
          />
          <button class="btn btn-sm md:btn-md" @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </main>
</template>
