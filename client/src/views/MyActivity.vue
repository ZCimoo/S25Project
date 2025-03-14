<script setup lang="ts">
import { useActivityStore } from '../models/useActivityStore'
import { useUserSwitching } from '../models/useUserSwitching'
import ActivityManager from '../components/ActivityManager.vue'

const { userId, isLoggedIn } = useUserSwitching()
const { activities, addActivity } = useActivityStore()
</script>

<template>
  <main v-if="isLoggedIn">
    <h1 class="title">My Activities</h1>
    <ActivityManager
      :userId="userId"
      :activities="activities.filter((activity) => activity.userId === userId)"
      :addActivity="addActivity"
    />
  </main>
  <main v-else>
    <p>Please log in to view your activities.</p>
  </main>
</template>
