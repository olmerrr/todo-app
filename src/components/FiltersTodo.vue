<template>
  <div class="filters-todo">
    <select v-model="localFilters.status" @change="emitFilters">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="uncompleted">Uncompleted</option>
      <option value="favorites">Favorites</option>
    </select>

    <select v-model="localFilters.userId" @change="emitFilters">
      <option value="all">All Users</option>
      <option v-for="userId in uniqueUserIds" :key="userId" :value="userId">
        {{ userId }}
      </option>
    </select>

    <input
      type="text"
      v-model="localFilters.title"
      placeholder="Search by title"
      @input="emitFilters"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()

const props = defineProps({
  onFilterChange: Function
})

const localFilters = ref({
  status: 'all',
  userId: 'all',
  title: ''
})

const uniqueUserIds = computed(() => {
  const userIds = todoStore.todos.map((todo) => todo.userId)
  return [...new Set(userIds)]
})

const emitFilters = () => {
  props.onFilterChange(localFilters.value)
}
</script>

<style scoped>
.filters-todo {
  padding: 20px 0 0;
  display: flex;
  justify-content: center;
}
</style>
