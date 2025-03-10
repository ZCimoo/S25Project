<script setup lang="ts">
import { ref, defineEmits } from 'vue'
const emit = defineEmits(['activity-saved'])

const title = ref('')
const date = ref(new Date().toISOString().split('T')[0])
const duration = ref('')
const location = ref('')
const type = ref('')

const submitActivity = () => {
  emit('activity-saved', {
    title: title.value,
    date: date.value,
    duration: duration.value,
    location: location.value,
    type: type.value,
  })
  resetForm()
}

const resetForm = () => {
  title.value = ''
  date.value = new Date().toISOString().split('T')[0]
  duration.value = ''
  location.value = ''
  type.value = ''
}
</script>

<template>
  <div class="box">
    <header class="form-header">Add an Exercise</header>
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input v-model="title" class="input" type="text" />
      </div>
    </div>
    <div class="field">
      <label class="label">Date</label>
      <div class="control">
        <input v-model="date" class="input" type="date" />
      </div>
    </div>
    <div class="field">
      <label class="label">Duration</label>
      <div class="control">
        <input v-model="duration" class="input" type="text" />
      </div>
    </div>
    <div class="field">
      <label class="label">Location</label>
      <div class="control">
        <input v-model="location" class="input" type="text" />
      </div>
    </div>
    <div class="field">
      <label class="label">Type</label>
      <div class="control">
        <div class="select is-fullwidth">
          <select v-model="type">
            <option value="running">Running</option>
            <option value="cycling">Cycling</option>
            <option value="swimming">Swimming</option>
            <option value="hiking">Hiking</option>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
          </select>
        </div>
      </div>
    </div>
    <footer class="form-footer">
      <button @click="submitActivity" class="button is-primary">Save</button>
      <button class="button">Cancel</button>
    </footer>
  </div>
</template>

<style scoped>
.box {
  max-width: 600px;
  margin: 0 auto;
}
</style>
