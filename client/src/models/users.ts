import type { DataListEnvelope } from './dataEnvelopes'
import { api } from './session'

export interface User {
  userid: number
  username: string
  password: string
  firstname: string
  lastname: string
  role: string
  age: number
  gender: string
  email: string
  pfp: string
}

export function getAll() {
  return api('users')
}
export function getOne(id: number) {
  console.log('getOne', id)
  return api<User[]>(`users/${id}`).then((users) => users[0])
}

export function searchUser(searchTerm: string) {
  return api<DataListEnvelope<User>>('users/search/${searchTerm}')
}
