<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  message: String,
  username: String,
  avatar: String
})
</script>
<template>
  <div class="chat chat-end">
    <div class="chat-image avatar">
      <div class="w-10 rounded-full">
        <img alt="Tailwind CSS chat bubble component" :src="props.avatar" />
      </div>
    </div>
    <div class="chat-header">
      {{ props.username }}
      <time class="text-xs opacity-50">12:45</time>
    </div>
    <div class="chat-bubble">{{ props.message }}</div>
  </div>
</template>
