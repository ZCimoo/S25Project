import { ref, computed, watchEffect } from 'vue'

const users = ref([
  { username: 'Zachary', password: 'password1', userId: 'zcimo', role: 'admin' },
  { username: 'Kamala Harris', password: 'password2', userId: 'vp', role: 'user' },
  { username: 'John Smith', password: 'password3', userId: 'jsmith', role: 'user' },
])

const currentUser = ref<{
  username: string
  password: string
  userId: string
  role: string
} | null>(null)
const isLoggedIn = ref(false)
const userId = ref<string | null>(null)
const username = ref<string | null>(null)

const userRole = computed(() => currentUser.value?.role || 'user')
function switchUser(user: { username: string; password: string; userId: string; role: string }) {
  currentUser.value = user
  userId.value = user.userId
  username.value = user.username
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
    username,
    switchUser,
    handleLogout,
    hasPermission,
  }
}
