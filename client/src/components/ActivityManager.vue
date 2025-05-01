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
    ? activities.value.items.filter((activity) => activity.userId === props.userId)
    : activities.value.items
})

async function addNewActivity(activity: Activity) {
  try {
    if (!currentUser?.userid) {
      console.error('No current user found')
      return
    }

    activity.userId = currentUser.userid
    activity.username = currentUser.username

    await create(activity)
    activities.value = await getAll()

    // Hide the form after adding the activity
  } catch (error) {
    console.error('Error adding new activity:', error)
    // Optionally handle the error (e.g., show a notification to the user)
  }
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
