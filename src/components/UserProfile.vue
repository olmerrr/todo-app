<template>
  <div class="user-profile" v-if="user">
    <h2>{{ user.name }}'s Profile</h2>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Phone:</strong> {{ user.phone }}</p>
    <p><strong>Address:</strong> {{ user.address.street }}, {{ user.address.city }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const { user } = props
</script>

<style scoped>
.user-profile {
  margin-bottom: 20px;
  background: #333;
  padding: 1rem;
  color: #f2f2f2;
  border-radius: 4px;
}
</style>
