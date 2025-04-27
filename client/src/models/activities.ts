import type { DataListEnvelope } from './dataEnvelopes'
import activitiesJson from '../data/activities.json'
import { ref } from 'vue'

const activities = ref<Activity[]>(activitiesJson.items)
export interface ActivityMeta {
  createdAt: string
  updatedAt: string
}
export interface Activity {
  id: number
  title: string
  date: string
  duration: string
  location: string
  type: string
  userId: number
  username: string
}

export function getAll() {
  return {
    data: activities.value,
    total: activities.value.length,
    skip: 0,
    limit: activities.value.length,
  } as DataListEnvelope<Activity>
}

export function getOne(id: number) {
  return activities.value.find((activity: Activity) => activity.id === id)
}

export function addActivity(activity: Activity): void {
  activities.value.push(activity)
}
