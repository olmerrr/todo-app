import { defineStore } from 'pinia'
import { ref } from 'vue'

import { BASE_URL } from '../api'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])

  const fetchTodos = async () => {
    try {
      const response = await fetch(`${BASE_URL}/todos`)
      const data = await response.json()
      todos.value = data.map((todo) => ({
        ...todo,
        isFavorite: false
      }))
      loadFavorites()
    } catch (error) {
      console.error('Error fetching todos:', error)
    }
  }

  const loadFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    todos.value.forEach((todo) => {
      todo.isFavorite = favorites.includes(todo.id)
    })
  }

  const addToFavorites = (todoId) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    if (!favorites.includes(todoId)) {
      favorites.push(todoId)
      localStorage.setItem('favorites', JSON.stringify(favorites))

      const todo = todos.value.find((todo) => todo.id === todoId)
      if (todo) {
        todo.isFavorite = true
      }
    }
  }

  const addTodo = async (newTodo) => {
    try {
      const response = await fetch(`${BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      })

      if (response.ok) {
        const addedTodo = await response.json()
        todos.value.unshift({
          ...addedTodo,
          isFavorite: false
        })
      } else {
        console.error('Error adding todo:', response.statusText)
      }
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  return {
    todos,
    fetchTodos,
    addToFavorites,
    addTodo
  }
})
