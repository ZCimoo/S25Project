import { ref } from 'vue'
import { getAll, type Activity } from './activities'

const activities = ref(getAll())

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
    activity.id = activities.value.data.length + 1
    activities.value.data.unshift(activity)
  }

  return { activities, addActivity }
}
