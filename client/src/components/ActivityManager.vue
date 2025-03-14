<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'
import ActivityForm from './ActivityForm.vue'
import ActivityList from './ActivityList.vue'

const showForm = ref(false)

const props = defineProps<{
  userId?: string | null
  activities: Array<{
    id: number
    title: string
    date: string
    duration: string
    location: string
    type: string
    userId: string
  }>
  addActivity?: (activity: any) => void
  filterByUser?: boolean
}>()

const displayedActivities = computed(() => {
  if (!props.filterByUser) return props.activities // Show all activities
  return props.activities.filter((activity) => activity.userId === props.userId)
})

const addActivity = (activity) => {
  if (props.addActivity) {
    activity.userId = props.userId // Ensure correct user
    props.addActivity(activity)
  }
  showForm.value = false
}
</script>

<template>
  <div>
    <button class="button is-primary" @click="showForm = !showForm">Add Activity</button>
    <ActivityForm
      v-if="showForm"
      :showForm="showForm"
      @activity-saved="addActivity"
      @cancel="showForm = false"
    />
    <ActivityList v-if="displayedActivities.length > 0" :activities="displayedActivities" />
    <p v-else>No activities found.</p>
  </div>
</template>
