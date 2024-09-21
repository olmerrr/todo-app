import { ref, computed } from 'vue'

export function useTodoFilters(todos) {
  const filters = ref({
    status: 'all',
    userId: 'all',
    title: ''
  })

  const handleFilterChange = (newFilters) => {
    filters.value = { ...filters.value, ...newFilters }
  }

  const filteredTodos = computed(() => {
    let result = todos.value

    if (filters.value.status === 'completed') {
      result = result.filter((todo) => todo.completed)
    } else if (filters.value.status === 'favorites') {
      result = result.filter((todo) => todo.isFavorite)
    }

    if (filters.value.userId !== 'all') {
      result = result.filter((todo) => todo.userId === Number(filters.value.userId))
    }

    if (filters.value.title) {
      result = result.filter((todo) =>
        todo.title.toLowerCase().includes(filters.value.title.toLowerCase())
      )
    }

    return result
  })

  return {
    filters,
    handleFilterChange,
    filteredTodos
  }
}
