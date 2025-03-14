import { ref, computed, watchEffect } from 'vue'

const users = ref([
  { username: 'Zachary', password: 'password1', userId: '1', role: 'admin' },
  { username: 'Kamala Harris', password: 'password2', userId: '2', role: 'user' },
  { username: 'John Smith', password: 'password3', userId: '3', role: 'user' },
])

const currentUser = ref(null)
const isLoggedIn = ref(false)
const userId = ref<string | null>(null)

const userRole = computed(() => currentUser.value?.role || 'guest') // Default to 'guest'

function switchUser(user: { username: string; password: string; userId: string; role: string }) {
  currentUser.value = user
  userId.value = user.userId
  isLoggedIn.value = true
  console.log('userId', userId.value)
  console.log('isLoggedIn', isLoggedIn.value)
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
    switchUser,
    handleLogout,
    hasPermission,
  }
}
