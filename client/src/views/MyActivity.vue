<script setup lang="ts">
import ActivityForm from '@/components/ActivityForm.vue'

const handleActivitySaved = (activityData) => {
  console.log('Activity submitted:', activityData)
}
</script>

<template>
  <main>
    <ActivityForm @activity-saved="handleActivitySaved" />
  </main>
</template>
