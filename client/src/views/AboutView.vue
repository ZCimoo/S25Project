<script setup lang="ts">
import { getAll, type Activity } from '../models/activities'

const activities = getAll()
</script>
<template>
  <h1 class="title">Products</h1>
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
