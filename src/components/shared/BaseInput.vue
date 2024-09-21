<template>
  <div class="form-group">
    <input
      :type="type"
      v-model.trim="inputValue"
      @input="$emit('update:modelValue', inputValue)"
      :class="{ 'input-error': hasError }"
      :placeholder="placeholder"
    />
    <span v-if="hasError" class="error-message">{{ errorMessage }}</span>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  hasError: {
    type: Boolean,
    default: false
  },
  errorMessage: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  }
})

const inputValue = ref(props.modelValue)

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue
  }
)
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
  position: relative;
}

.form-group:last-of-type {
  margin-bottom: 25px;
}

input {
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 100%;
}

input::placeholder {
  color: #353535;
}

.error-message {
  color: #c62d2d;
  font-size: 14px;
  position: absolute;
  left: 5px;
  bottom: -20px;
}
</style>
