import type { DataListEnvelope } from './dataEnvelopes'
import users from '../data/users.json'

export interface User {
  userId: number
  username: string
  password: string
  firstName: string
  lastName: string
  role: string
  age: number
  gender: string
  email: string
}

export function getAll() {
  return {
    data: users.items,
    total: users.items.length,
    skip: 0,
    limit: users.items.length,
  } as DataListEnvelope<User>
}
export function getOne(id: number) {
  return users.items.find((user: User) => user.userId === id)
}
export function getName(id: number) {
  const user = users.items.find((user: User) => user.userId === id)
  return user ? `${user.firstName} ${user.lastName}` : ''
}
