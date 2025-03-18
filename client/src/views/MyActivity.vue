<script setup lang="ts">
import { useUserSwitching } from '../models/useUserSwitching'
import ActivityManager from '../components/ActivityManager.vue'

const { userId, isLoggedIn, username } = useUserSwitching() // Ensure username is retrieved
</script>

<template>
  <main v-if="isLoggedIn">
    <h1 class="title">My Activities</h1>
    <ActivityManager :userId="userId" :username="username" />
  </main>
  <main v-else>
    <p>Please log in to view your activities.</p>
  </main>
</template>
