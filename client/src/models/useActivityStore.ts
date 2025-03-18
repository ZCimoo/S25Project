import { ref } from 'vue'

const activities = ref([
  {
    id: 1,
    title: 'Running',
    date: '2023-10-01',
    duration: '30 mins',
    location: 'Park',
    type: 'Cardio',
    userId: 'zcimo',
    username: 'Zachary',
  },
  {
    id: 2,
    title: 'Swimming',
    date: '2023-10-02',
    duration: '45 mins',
    location: 'Pool',
    type: 'Cardio',
    userId: 'vp',
    username: 'Kamala Harris',
  },
  {
    id: 3,
    title: 'Cycling',
    date: '2023-10-03',
    duration: '60 mins',
    location: 'Trail',
    type: 'Cardio',
    userId: 'jsmith',
    username: 'John Smith',
  },
])

export const useActivityStore = () => {
  const addActivity = (activity: {
    id: number
    title: string
    date: string
    duration: string
    location: string
    type: string
    userId: string
    username: string
  }) => {
    activity.id = activities.value.length + 1
    activities.value.unshift(activity)
  }

  return { activities, addActivity }
}
