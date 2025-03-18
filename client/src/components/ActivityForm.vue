<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'
const emit = defineEmits(['activity-saved', 'cancel'])
const props = defineProps<{ showForm: boolean }>()

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

const cancelForm = () => {
  emit('cancel')
  resetForm()
}
</script>

<template>
  <div v-if="props.showForm" class="modal is-active" @click.self="cancelForm">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box modal-form">
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
                <option value="Running">Running</option>
                <option value="Cycling">Cycling</option>
                <option value="Swimming">Swimming</option>
                <option value="Hiking">Hiking</option>
                <option value="Strength">Strength</option>
                <option value="Cardio">Cardio</option>
              </select>
            </div>
          </div>
        </div>
        <footer class="form-footer">
          <button @click="submitActivity" class="button is-primary">Save</button>
          <button @click="cancelForm" class="button">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-form {
  max-width: 400px;
  margin: 0 auto;
}
.form-footer {
  display: flex;
  justify-content: space-between;
}
</style>
