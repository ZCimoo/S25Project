<script setup lang="ts">
import { ref } from 'vue'
import { getAll, type Activity } from '../models/activities'
import { type DataListEnvelope } from '../models/dataEnvelopes'

const activities = ref({} as DataListEnvelope<Activity>)
getAll().then((response) => {
  activities.value = response
})
</script>
<template>
  <h1 class="title">Activities</h1>
  <div class="shelf">
    <div class="product" v-for="a in activities.data" :key="a.id">
      <div>
        <h1>{{ a.title }}</h1>
        <p>{{ a.date }}</p>
        <p>{{ a.duration }}</p>
        <p>{{ a.location }}</p>
        <p>{{ a.type }}</p>
        <p>{{ a.userId }}</p>
      </div>
    </div>
  </div>
</template>

<style></style>
