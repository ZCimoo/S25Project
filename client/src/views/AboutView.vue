<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { getAll, type Activity } from '../models/activities'
import { getAll as getAllUsers, type User } from '../models/users'
import { type DataListEnvelope } from '../models/dataEnvelopes'

const activities = ref({} as DataListEnvelope<Activity>)
const users = ref({} as DataListEnvelope<User>)

getAll().then((response) => {
  activities.value = response as DataListEnvelope<Activity>
})
getAllUsers().then((response) => {
  users.value = response as DataListEnvelope<User>
})
</script>

<template>
  <h1 class="title">Activities</h1>

  <!-- Check if `activities.data` is an array and has data -->
  <div v-if="Array.isArray(activities.items) && activities.items.length > 0" class="shelf">
    <div class="product" v-for="a in activities.items" :key="a.id">
      <div>
        <h1>{{ a.title }}</h1>
        <p>{{ a.date }}</p>
        <p>{{ a.duration }}</p>
        <p>{{ a.location }}</p>
        <p>{{ a.type }}</p>
        <p>{{ a.userId }}</p>
        <!-- Note that it's `userid` instead of `userId` -->
      </div>
    </div>
  </div>

  <!-- Show loading message if no activities data yet -->
  <div v-else>Loading activities...</div>

  <h1 class="title">Users</h1>

  <!-- Check if `users.data` is an array and has data -->
  <div v-if="Array.isArray(users.items) && users.items.length > 0" class="shelf">
    <div class="product" v-for="u in users.items" :key="u.userid">
      <div>
        <h1>{{ u.username }}</h1>
        <p>{{ u.firstname }}</p>
        <p>{{ u.lastname }}</p>
        <p>{{ u.userid }}</p>
      </div>
    </div>
  </div>

  <!-- Show loading message if no users data yet -->
  <div v-else>Loading users...</div>
</template>

<style></style>
