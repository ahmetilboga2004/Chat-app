import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const username = ref('')
  const avatarUrl = ref('')
  return { username, avatarUrl }
})
