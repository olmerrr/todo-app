<template>
  <h2>Create Todo</h2>
  <form @submit.prevent="onSubmit" class="create-todo">
    <BaseInput
      v-model="userId"
      placeholder="User ID"
      type="number"
      :hasError="userIdError"
      errorMessage="Invalid User ID"
    />
    <BaseInput
      v-model="title"
      placeholder="Title"
      type="text"
      :hasError="titleError"
      errorMessage="Title is required"
    />
    <BaseButton>Add Todo</BaseButton>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'
import BaseInput from './shared/BaseInput.vue'
import BaseButton from './shared/BaseButton.vue'

const userId = ref('')
const title = ref('')
const userIdError = ref(false)
const titleError = ref(false)

const todoStore = useTodoStore()

const onSubmit = async () => {
  titleError.value = !title.value
  userIdError.value = !userId.value

  if (!titleError.value && !userIdError.value) {
    const newTodo = {
      userId: Number(userId.value),
      title: title.value,
      completed: false
    }

    await todoStore.addTodo(newTodo)

    userId.value = ''
    title.value = ''
  }
}
</script>

<style scoped>
.create-todo {
  max-width: 600px;
  background: #333;
  padding: 30px 16px;
  border-radius: 5px;
}
</style>
