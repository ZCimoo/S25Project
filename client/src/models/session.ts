import { ref } from 'vue'
import * as myFetch from './myFetch'
import { getOne, type User } from './users'

export function api<T>(
  action: string,
  data?: any,
  method?: string,
  headers?: HeadersInit,
): Promise<T> {
  return myFetch.api<T>(action, data, method, headers)
}

const session = ref({
  user: null as User | null,
  token: null as string | null,
})

export function refSession() {
  return session
}

export const isAdmin = () => session.value?.user?.role === 'admin'

export const isLoggedIn = () => session.value?.user !== null

export function login(id: number) {
  return getOne(id).then((user) => {
    session.value.user = user as User
    console.log('session.value.token', session.value.token)
    console.log('session.value.user', session.value.user)
  })
}
export function logout() {
  session.value.user = null
  session.value.token = null
  console.log('session.value.user', session.value.user)
}
