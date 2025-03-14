<script setup lang="ts">
import { ref, defineProps, computed } from 'vue'
import ActivityForm from './ActivityForm.vue'
import ActivityList from './ActivityList.vue'

const showForm = ref(false)

const props = defineProps<{
  userId: string | null
  activities: Array<{
    id: number
    title: string
    date: string
    duration: string
    location: string
    type: string
    userId: string
  }>
}>()

console.log('props.userId:', props.userId)
console.log('props.activities:', props.activities)

const activities = ref([...props.activities])

const userActivities = computed(() => {
  const filteredActivities = activities.value.filter((activity) => activity.userId === props.userId)
  console.log('filteredActivities:', filteredActivities)
  return filteredActivities
})

const addActivity = (activity) => {
  activity.userId = props.userId // Ensure the new activity has the correct userId
  activities.value.push(activity)
  showForm.value = false
}

const closeForm = () => {
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
      @cancel="closeForm"
    />
    <ActivityList :activities="userActivities" />
  </div>
</template>

<style scoped></style>
