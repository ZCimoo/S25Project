<script setup lang="ts">
import { ref, computed } from 'vue'
import { useActivityStore } from '../models/useActivityStore'
import { getAll, addActivity } from '../models/activities'
import ActivityForm from './ActivityForm.vue'
import { currentUser } from '../models/useUserSwitching'
const showForm = ref(false)
const activities = ref(getAll())

const props = defineProps<{ userId?: number | null; username?: string | null }>()

const displayedActivities = computed(() => {
  if (!activities.value.data) return []

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
  if (currentUser.value) {
    activity.userId = currentUser.value.userId
    activity.username = currentUser.value.username
  } else {
    console.error('Current user is null. Cannot add activity.')
    return
  }
  addActivity(activity)
  activities.value = getAll()
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
