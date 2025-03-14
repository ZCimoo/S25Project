<script setup lang="ts">
import { useActivityStore } from '../models/useActivityStore'
import ActivityManager from '../components/ActivityManager.vue'

const { activities } = useActivityStore() // Use global activity list
</script>

<template>
  <main>
    <h1 class="title">Friend Activities</h1>
    <ActivityManager :activities="activities" :filterByUser="false" />
  </main>
</template>
