import { ref } from 'vue'

export function useActivityStore() {
  const activities = ref<
    Array<{
      id: number
      title: string
      date: string
      duration: string
      location: string
      type: string
      userId: string
    }>
  >([
    {
      id: 1,
      title: 'Running',
      date: '2023-10-01',
      duration: '30 mins',
      location: 'Park',
      type: 'Cardio',
      userId: '1',
    },
    {
      id: 2,
      title: 'Swimming',
      date: '2023-10-02',
      duration: '45 mins',
      location: 'Pool',
      type: 'Cardio',
      userId: '2',
    },
    {
      id: 3,
      title: 'Cycling',
      date: '2023-10-03',
      duration: '60 mins',
      location: 'Trail',
      type: 'Cardio',
      userId: '3',
    },
  ])

  const addActivity = (activity) => {
    activities.value.push(activity)
  }

  return { activities, addActivity }
}
