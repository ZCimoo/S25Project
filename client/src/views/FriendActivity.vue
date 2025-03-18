<script setup lang="ts">
import { useUserSwitching } from '../models/useUserSwitching'
import ActivityManager from '../components/ActivityManager.vue'

const { isLoggedIn } = useUserSwitching() // No need for userId here
</script>

<template>
  <main v-if="isLoggedIn">
    <h1 class="title">Friend Activity</h1>
    <ActivityManager />
  </main>
  <main v-else>
    <p>Please log in to view activities.</p>
  </main>
</template>
