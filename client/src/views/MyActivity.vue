<script setup lang="ts">
import { useUserSwitching } from '../models/useUserSwitching'
import ActivityManager from '../components/ActivityManager.vue'

const { userId, isLoggedIn } = useUserSwitching()

// Static data for testing
const activities = [
  {
    id: 1,
    title: 'Running',
    date: '2023-10-01',
    duration: '30 mins',
    location: 'Park',
    type: 'Cardio',
    userId: '1',
  },
  {
    id: 2,
    title: 'Swimming',
    date: '2023-10-02',
    duration: '45 mins',
    location: 'Pool',
    type: 'Cardio',
    userId: '2',
  },
  {
    id: 3,
    title: 'Cycling',
    date: '2023-10-03',
    duration: '60 mins',
    location: 'Trail',
    type: 'Cardio',
    userId: '3',
  },
]

console.log('userId:', userId.value)
console.log('isLoggedIn:', isLoggedIn.value)
</script>

<template>
  <main v-if="isLoggedIn">
    <h1 class="title">My Activities</h1>
    <ActivityManager :userId="userId" :activities="activities" />
  </main>
  <main v-else>
    <p>Please log in to view your activities.</p>
  </main>
</template>

<style scoped></style>
