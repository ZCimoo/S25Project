<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  activities: Array,
})
</script>

<template>
  <div class="box">
    <h2 class="title is-4">Recent Activity</h2>
    <div v-if="activities.length > 0">
      <div v-for="(activity, index) in activities" :key="index" class="card mb-4">
        <div class="card-content">
          <p class="title is-5">{{ activity.title }}</p>
          <p><strong>Date: </strong>{{ activity.date }}</p>
          <p><strong>Duration: </strong>{{ activity.duration }}</p>
          <p><strong>Location: </strong>{{ activity.location }}</p>
          <p><strong>Type: </strong>{{ activity.type }}</p>
        </div>
      </div>
    </div>
    <p v-else class="has-text-centered">No exercises logged yet</p>
  </div>
</template>

<style scoped></style>
