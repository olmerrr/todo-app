<template>
  <div class="dashboard">
    <div class="container">
      <h1>Dashboard</h1>

      <UserProfile v-if="currentUser" :user="currentUser" />
      <CreateTodo />
      <FiltersTodo :onFilterChange="handleFilterChange" />
      <TodoList :todos="filteredTodos" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '../stores/userStore'
import { useTodoStore } from '../stores/todoStore'
import TodoList from '../components/TodoList.vue'
import UserProfile from '../components/UserProfile.vue'
import FiltersTodo from '../components/FiltersTodo.vue'
import CreateTodo from '../components/CreateTodo.vue'
import { useTodoFilters } from '../composables/useTodoFilters'

const router = useRouter()
const userStore = useUserStore()
const todoStore = useTodoStore()
const currentUser = ref(userStore.currentUser)

const todos = ref([])

onMounted(async () => {
  if (!currentUser.value) {
    router.push('/')
  } else {
    await todoStore.fetchTodos()
    todos.value = todoStore.todos
  }
})

const { handleFilterChange, filteredTodos } = useTodoFilters(todos)
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
