import { ref } from 'vue'
import { getAll, type Activity } from './activities'
import { type DataListEnvelope } from './dataEnvelopes'

const activities = ref({} as DataListEnvelope<Activity>)
getAll().then((data) => {
  activities.value = data
})

export const useActivityStore = () => {
  const addActivity = (activity: {
    id: number
    title: string
    date: string
    duration: string
    location: string
    type: string
    userId: number
    username: string
  }) => {
    activity.id = activities.value.items.length + 1
    activities.value.items.unshift(activity)
  }

  return { activities, addActivity }
}
