<script setup lang="ts">
import { isLoggedIn } from '@/models/session'
import ActivityManager from '../components/ActivityManager.vue'
import ActivityList from '../components/ActivityList.vue'
</script>

<template>
  <main v-if="isLoggedIn()">
    <h1 class="title">Friend Activity</h1>
    <ActivityList />
  </main>
  <main v-else>
    <p>Please log in to view activities.</p>
  </main>
</template>
