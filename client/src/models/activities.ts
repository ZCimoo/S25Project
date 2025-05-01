import type { DataListEnvelope } from './dataEnvelopes'
import { api } from './session'
import { ref } from 'vue'

export interface ActivityMeta {
  createdAt: string
  updatedAt: string
}
export interface Activity {
  id: number
  title: string
  date: string | null
  duration: string
  location: string
  type: string
  userid: number
  username: string
}

export function getAll() {
  return api<DataListEnvelope<Activity>>('activities')
}

export function getOne(id: number) {
  return api<Activity>(`activities/${id}`)
}

export function getByUser(userId: number) {
  return api<DataListEnvelope<Activity>>(`activities/user/${userId}`)
}

export function create(data: Activity) {
  return api<Activity>(
    'activities',
    {
      title: data.title,
      duration: data.duration,
      username: data.username,
      userid: data.userid,
      type: data.type,
      location: data.location,
    },
    'POST',
  )
}

export function update(id: number, data: Activity) {
  return api<Activity>(`activities/${id}`, data, 'PATCH')
}

export function remove(id: number) {
  return api<Activity>(`activities/${id}`, undefined, 'DELETE')
}
