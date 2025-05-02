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

const props = defineProps<{ userId?: number | null; username?: string | null }>()

const session = refSession()

const displayedActivities = computed(() => {
  if (!activities.value) return []

  return props.userId
    ? activities.value.items.filter((activity) => activity.userid === props.userId)
    : activities.value.items
})

async function addNewActivity(activity: Activity) {
  try {
    if (!session.value.user) {
      console.error('No current user found')
      return
    }
    activity.userid = session.value.user.userid
    activity.username = session.value.user.username
    if (!activity.date) {
      activity.date = new Date().toISOString().split('T')[0]
    }

    await create(activity)
    activities.value = await getAll()
  } catch (error) {
    console.error('Error adding new activity:', error)
  }
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
