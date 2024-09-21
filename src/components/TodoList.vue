<template>
  <div>
    <h2>Todo List</h2>

    <ul v-if="props.todos.length > 0">
      <li v-for="todo in props.todos" :key="todo.id" class="todo">
        <input type="checkbox" v-model="todo.completed" />
        <span :class="{ completed: todo.completed }">{{ todo.title }}</span>
        <BaseButton
          @click="addToFavorites(todo)"
          :class="{ 'disabled-btn': todo.isFavorite }"
          class="add-to-favorite-btn"
        >
          {{ todo.isFavorite ? 'Already Favorite' : 'Add to Favorites' }}
        </BaseButton>
      </li>
    </ul>

    <h3 v-else class="error-msg">Nothing found, try change filter or create new Todo</h3>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import BaseButton from './shared/BaseButton.vue'

const props = defineProps({
  todos: {
    type: Array,
    required: true
  }
})

const addToFavorites = (todo) => {
  todo.isFavorite = true

  const favorites = JSON.parse(localStorage.getItem('favorites')) || []
  if (!favorites.includes(todo.id)) {
    favorites.push(todo.id)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
.todo {
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.add-to-favorite-btn {
  width: 130px;
  padding: 5px;
}

.disabled-btn {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-msg {
  color: rgb(227, 40, 40);
  font-size: 16px;
  font-weight: 600;
}
</style>
