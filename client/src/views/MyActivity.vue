<script setup lang="ts">
import { useUserSwitching } from '../models/useUserSwitching'
import ActivityManager from '../components/ActivityManager.vue'
import NotificationList from '@/components/NotificationList.vue'
import ActivityList from '../components/ActivityList.vue'
import { getAll, type User } from '../models/users'

const users = getAll()

const { userId, isLoggedIn, username } = useUserSwitching()
</script>

<template>
  <main v-if="isLoggedIn">
    <h1 class="title">My Activities</h1>
    <NotificationList />
    <ActivityManager :users.userId="userId" :username="username" />
    <ActivityList />
  </main>
  <main v-else>
    <p>Please log in to view your activities.</p>
  </main>
</template>
