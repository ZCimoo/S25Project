<script setup lang="ts">
import { refNotifications, removeNotification } from '@/models/notifications'
import { ref } from 'vue'

interface Notification {
  type: string
  message: string
}

const notifications = ref<Notification[]>(refNotifications().value)
</script>

<template>
  <div>
    <div
      v-for="(message, index) in notifications"
      :key="index"
      class="notification is-light"
      :class="`is-${message.type}`"
    >
      <button class="delete" @click="removeNotification(index)"></button>
      {{ message.message }}
    </div>
  </div>
</template>

<style scoped></style>
