import type { DataListEnvelope } from './dataEnvelopes'
import activities from '../data/activities.json'

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
    data: activities.items,
    total: activities.items.length,
    skip: 0,
    limit: activities.items.length,
  } as DataListEnvelope<Activity>
}

export function getOne(id: number) {
  return activities.items.find((activity: Activity) => activity.id === id)
}

export function addActivity(activity: Activity): void {
  activities.items.push(activity)
}
