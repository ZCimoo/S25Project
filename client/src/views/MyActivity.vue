<script setup lang="ts">
import ActivityManager from '../components/ActivityManager.vue'
import NotificationList from '@/components/NotificationList.vue'
import myActivityList from '@/components/myActivityList.vue'
import { refSession, isLoggedIn } from '@/models/session'

const session = refSession()
</script>

<template>
  <main v-if="isLoggedIn()">
    <h1 class="title">My Activities</h1>
    <NotificationList />
    <ActivityManager />
    <myActivityList />
  </main>
  <main v-else>
    <p>Please log in to view your activities.</p>
  </main>
</template>
