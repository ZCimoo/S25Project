import { ref, computed, watchEffect } from 'vue'
import { getAll, type User } from './users'

const users = getAll()

export const currentUser = ref<User | null>(null)
const isLoggedIn = ref(false)
const userId = ref<number | null>(null)
const username = ref<string | null>(null)

const userRole = computed(() => currentUser.value?.role || 'user')
function switchUser(userIdToSwitch: number) {
  const foundUser = users.data.find((u) => u.userId === userIdToSwitch)
  if (foundUser) {
    currentUser.value = foundUser
    username.value = foundUser.username
    isLoggedIn.value = true
    console.log('userId', userId.value)
    console.log('isLoggedIn', isLoggedIn.value)
  } else {
    console.log('User not found')
  }
}

function handleLogout() {
  currentUser.value = null
  isLoggedIn.value = false
  console.log('userId', userId.value)
  console.log('isLoggedOut', !isLoggedIn.value)
}

function hasPermission(requiredRole: string) {
  return userRole.value === requiredRole || userRole.value === 'admin'
}

watchEffect(() => {
  isLoggedIn.value = currentUser.value !== null
  userId.value = currentUser.value?.userId || null
})

export function useUserSwitching() {
  return {
    users,
    currentUser,
    isLoggedIn,
    userId,
    userRole,
    username,
    switchUser,
    handleLogout,
    hasPermission,
  }
}
