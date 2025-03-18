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
  const addActivity = (activity) => {
    activity.id = activities.value.length + 1 // Generate a new ID
    activities.value.unshift(activity) // Add to the beginning of the list
  }

  return { activities, addActivity }
}
