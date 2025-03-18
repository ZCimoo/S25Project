<script setup lang="ts">
import { ref, computed } from 'vue'
import { useActivityStore } from '../models/useActivityStore'
import ActivityForm from './ActivityForm.vue'
import ActivityList from './ActivityList.vue'

const { activities, addActivity } = useActivityStore()
const showForm = ref(false)

const props = defineProps<{ userId?: string | null; username?: string | null }>()

const displayedActivities = computed(() => {
  return props.userId
    ? activities.value.filter((activity) => activity.userId === props.userId)
    : activities.value
})

const addNewActivity = (activity) => {
  if (props.userId && props.username) {
    activity.userId = props.userId
    activity.username = props.username // Use the username prop
  }
  addActivity(activity) // Update global activity store
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
      <ActivityList :activities="displayedActivities" />
    </div>
  </div>
</template>

<style scoped>
.column {
  display: block;
}
</style>
