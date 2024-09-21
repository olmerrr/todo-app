import { defineStore } from 'pinia'
import { ref } from 'vue'

import { BASE_URL } from '../api'

export const useUserStore = defineStore('user', () => {
  const users = ref([])
  const currentUser = ref(null)

  const fetchUsers = async () => {
    const response = await fetch(`${BASE_URL}/users`)
    users.value = await response.json()
  }

  const setCurrentUser = (user) => {
    currentUser.value = user
  }

  return { users, currentUser, fetchUsers, setCurrentUser }
})
