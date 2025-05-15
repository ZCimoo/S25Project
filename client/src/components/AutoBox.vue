<script setup lang="ts">
import { ref } from 'vue'
import { Oruga, type OptionsProp } from '@oruga-ui/oruga-next'
import { type User, getAll, searchUser } from '@/models/users'
import { type DataListEnvelope } from '@/models/dataEnvelopes'

const newUserId = ref('')

const options = ref<
  {
    value: number
    label: string
  }[]
>([])

async function getAsyncData(value: string) {
  const response = await searchUser(value)
  options.value = response.items.map((user) => ({
    value: user.userid,
    label: user.username,
  }))
}

const selected = ref()
</script>

<template>
  <section>
    <o-field label="Find a name">
      <o-autocomplete
        v-model="newUserId"
        :options="options"
        backend-filtering
        :debounce="500"
        @input="getAsyncData"
        placeholder="Select a user"
        icon="search"
        clearable
        open-on-focus
      >
        >
        <template #empty> No results found </template>
      </o-autocomplete>

      <p><b>Selected:</b> {{ selected }}</p>
    </o-field>
  </section>
</template>

<style scoped></style>
