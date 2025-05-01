<script setup lang="ts">
import ActivityManager from '../components/ActivityManager.vue'
import NotificationList from '@/components/NotificationList.vue'
import ActivityList from '../components/ActivityList.vue'
import { getAll, type User } from '../models/users'
import { ref } from 'vue'
import type { DataListEnvelope } from '@/models/dataEnvelopes'
import { isLoggedIn, refSession } from '@/models/session'

const session = refSession()

const users = ref({} as DataListEnvelope<User>)
getAll().then((response) => {
  users.value = response as DataListEnvelope<User>
})
</script>

<template>
  <main v-if="isLoggedIn()">
    <h1 class="title">My Activities</h1>
    <NotificationList />
    <ActivityManager session.userid />
    <ActivityList />
  </main>
  <main v-else>
    <p>Please log in to view your activities.</p>
  </main>
</template>
