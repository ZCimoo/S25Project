<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import { getAll, type User } from '../models/users'
import { type DataListEnvelope } from '../models/dataEnvelopes'
import { refSession, isLoggedIn, login, logout } from '@/models/session'

const router = useRouter()
const isDropdownActive = ref(false)
const currentUser = refSession().value.user

const users = ref({} as DataListEnvelope<User>)

getAll().then((response) => {
  users.value = response as DataListEnvelope<User>
})

function toggleDropdown() {
  isDropdownActive.value = !isDropdownActive.value
}

function logoutAndRedirect() {
  logout()
  router.push('/')
}
</script>

<template>
  <nav class="navbar is-info" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <RouterLink to="/" class="navbar-item"> <i class="fas fa-dumbbell"></i> </RouterLink>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink to="/" class="navbar-item"> <i class="fas fa-home"></i>Home</RouterLink>

        <RouterLink to="/my-activity" class="navbar-item"
          ><i class="fas fa-walking"></i> My Activity
        </RouterLink>
        <RouterLink to="/friend-activity" class="navbar-item">
          <i class="fas fa-user-friends"></i>Friend Activity
        </RouterLink>
        <RouterLink to="/about" class="navbar-item">
          <i class="fas fa-user-friends"></i>About
        </RouterLink>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"><i class="fas fa-clipboard"></i>Admin</a>

          <div class="navbar-dropdown">
            <RouterLink to="/admin" class="navbar-item">Admin View</RouterLink>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="isLoggedIn()">
              <span class="navbar-text">Welcome, {{ currentUser?.username ?? 'Guest' }}</span>
              <button class="button is-light" @click="logoutAndRedirect">Logout</button>
            </template>
            <template v-else>
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <div class="dropdown" :class="{ 'is-active': isDropdownActive }">
                <div class="dropdown-trigger">
                  <button
                    class="button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                    @click="toggleDropdown"
                  >
                    <span>Log in</span>
                    <span class="icon is-small">
                      <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu">
                  <div class="dropdown-content">
                    <a
                      v-for="user in users.data"
                      :key="user.userId"
                      class="dropdown-item"
                      @click="login(user.userId)"
                    >
                      {{ user.username }}
                    </a>
                    <hr class="dropdown-divider" />
                    <a class="dropdown-item is-disabled"> Other Account</a>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar-end {
  margin-right: 100px;
}
.navbar-text {
  font-weight: 750;
  margin-right: 10px;
  color: white;
}
</style>
