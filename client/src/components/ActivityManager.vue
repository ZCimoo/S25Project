<script setup lang="ts">
import { ref, computed } from 'vue'
import { getAll, create, type Activity } from '../models/activities'
import ActivityForm from './ActivityForm.vue'
import { type DataListEnvelope } from '../models/dataEnvelopes'
import { refSession } from '@/models/session'
import { type User, getAll as getAllUsers } from '../models/users'
const showForm = ref(false)
const activities = ref({} as DataListEnvelope<Activity>)

getAll().then((response) => {
  activities.value = response
})

const currentUser = refSession().value.user

const props = defineProps<{ userId?: number | null; username?: string | null }>()

const session = refSession()

const displayedActivities = computed(() => {
  if (!activities.value) return []

  return props.userId
    ? activities.value.data.filter((activity) => activity.userId === props.userId)
    : activities.value.data
})

const addNewActivity = (activity: {
  id: number
  title: string
  date: string
  duration: string
  location: string
  type: string
  userId: number
  username: string
}) => {
  if (currentUser) {
    activity.userId = currentUser.userId
    activity.username = currentUser.username
  } else {
    console.error('Current user is null. Cannot add activity.')
    return
  }
  create(activity)
  getAll().then((response) => {
    activities.value = response
  })
  showForm.value = false
}
</script>

<template>
  <div class="columns">
    <div class="column is-half is-offset-one-quarter">
      <button class="button is-primary is-fullwidth" @click="showForm = !showForm">
        Add Activity
      </button>
      <ActivityForm
        v-if="showForm"
        :showForm="showForm"
        @activity-saved="addNewActivity"
        @cancel="showForm = false"
      />
    </div>
  </div>
</template>

<style scoped>
.column {
  display: block;
}
</style>
