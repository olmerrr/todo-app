<template>
  <div>
    <div class="title">description</div>

    <div class="login-form">
      <div class="sub-title">description</div>

      <form @submit.prevent="onSubmit" class="form">
        <BaseInput
          placeholder="Username"
          v-model="username"
          :hasError="usernameError"
          errorMessage="Invalid username"
          type="text"
        />

        <BaseInput
          placeholder="Phone Number"
          v-model="phoneNumber"
          :hasError="phoneNumberError"
          errorMessage="Invalid phone number"
          type="tel"
        />

        <BaseButton>Login</BaseButton>
        <p v-if="loginError" class="error-message">Login error</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useUserStore } from '../stores/userStore'
import BaseInput from './shared/BaseInput.vue'
import BaseButton from './shared/BaseButton.vue'

const username = ref('')
const phoneNumber = ref('')
const loginError = ref(false)
const usernameError = ref(false)
const phoneNumberError = ref(false)
const router = useRouter()
const userStore = useUserStore()

onMounted(async () => await userStore.fetchUsers())

const validateUsername = (value) => /^[a-zA-Z\s]+$/.test(value)
const validatePhoneNumber = (value) => /^[0-9+()\-\s]+( x\d+)?$/.test(value)

const onSubmit = async () => {
  usernameError.value = !validateUsername(username.value)
  phoneNumberError.value = !validatePhoneNumber(phoneNumber.value)

  if (!usernameError.value && !phoneNumberError.value) {
    const user = userStore.users.find((u) => {
      return u.username === username.value && u.phone === phoneNumber.value
    })

    if (user) {
      userStore.setCurrentUser(user)
      router.push('/dashboard')
    } else {
      loginError.value = true
    }
  }
}
</script>

<style>
:root {
  --form-bgc: #c3c3c3;
}

.login-form {
  width: 448px;
  margin: 0 auto;
  padding: 0 25px 30px;
  background: var(--form-bgc);
  border-radius: 0 0 5px 5px;
  position: relative;
}

.title {
  text-align: center;
  color: #5f5f5f;
  background-color: #a5a5a5;
  padding: 15px 40px;
  border-radius: 5px 5px 0 0;
}

.sub-title {
  font-size: 15px;
  padding: 15px 0;
}

.error-message {
  position: absolute;
  bottom: 0;
  left: 25px;
  color: #c62d2d;
}

.form {
  background: var(--form-bgc);
}

@media (max-width: 460px) {
  .login-form {
    max-width: 280px;
  }
}
</style>
