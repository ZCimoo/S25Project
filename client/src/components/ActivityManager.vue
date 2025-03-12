<script setup lang="ts">
import { ref } from 'vue'
import ActivityForm from './ActivityForm.vue'
import ActivityList from './ActivityList.vue'

const activities = ref([])

const addActivity = (activity) => {
  activities.value.push(activity)
}
</script>

<template>
  <div>
    <ActivityForm @activity-saved="addActivity" />
    <ActivityList :activities="activities" />
  </div>
</template>

<style scoped></style>
