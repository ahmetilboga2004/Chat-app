<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

console.log(userStore)
const username = ref('')
const url = ref('')
const setUsername = () => {
  userStore.username = username.value
  localStorage.setItem('username', userStore.username)
  router.push({ name: 'chat' })
}
const onFileChange = (e) => {
  const file = e.target.files[0]
  url.value = URL.createObjectURL(file)
  userStore.avatarUrl = url.value
  localStorage.setItem('avatar', url.value)
}
</script>

<template>
  <div class="container mx-auto lg:p-8 h-screen">
    <div class="bg-slate-600 rounded-lg p-4 h-full flex flex-col justify-between items-center">
      <div class="hero">
        <div class="hero-content text-center flex flex-col justify-center items-center">
          <div>
            <h1 class="text-7xl font-extrabold">ChatZen</h1>
            <p class="py-6">A Fast and Secure encrypted Chat app</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <div class="flex flex-col justify-center items-center">
          <div id="preview">
            <div class="avatar">
              <div class="w-24 rounded-full">
                <img v-if="url" :src="url" />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="form-control w-full">
              <div class="label">
                <span class="label-text">Avatar</span>
              </div>
              <input
                type="file"
                @change="onFileChange"
                class="file-input file-input-bordered w-full max-w-xs"
              />
            </label>
          </div>
        </div>
        <div class="flex justify-center items-center gap-4">
          <label class="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              class="w-4 h-4 opacity-70"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
              />
            </svg>
            <input
              v-model="username"
              type="text"
              @keyup.enter="setUsername"
              class="grow"
              placeholder="Username"
            />
          </label>
          <button class="btn" @click="setUsername">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>
