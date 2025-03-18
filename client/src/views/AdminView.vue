<script setup lang="ts">
import MyActivity from './MyActivity.vue'
import { useUserSwitching } from '../models/useUserSwitching'

const { users } = useUserSwitching()
</script>

<template>
  <div class="container">
    <div>
      <button class="button is-primary">
        <span><i class="fas fa-plus"></i></span>
        <span>Add User</span>
      </button>
    </div>

    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <tr>
        <th>Username</th>
        <th>Handle</th>
        <th>Role</th>
        <th></th>
      </tr>
      <tr v-for="user in users" :key="user.userId">
        <td>{{ user.username }}</td>
        <td>@{{ user.userId }}</td>
        <td>{{ user.role }}</td>
        <td>
          <button class="button"><i class="fas fa-edit"></i></button>
          <button class="button"><i class="fas fa-trash"></i></button>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.user-list {
  margin-top: 20px;
}
.container {
  margin-top: 20px;
}
.button.is-primary {
  color: white;
}
</style>
