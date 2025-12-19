<template>
  <div class="terminal-input-group">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    <div class="input-container" :class="{ focused: isFocused }">
      <span class="prompt">></span>
      <input
        :id="id"
        v-model="modelValue"
        :type="type"
        :placeholder="placeholder"
        class="terminal-input"
        @focus="isFocused = true"
        @blur="isFocused = false"
        v-bind="$attrs"
      />
      <span class="blinking-cursor" v-if="isFocused">_</span>
    </div>
    <div v-if="error" class="error-message">
       ! {{ error }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  error: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`
  }
})

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const isFocused = ref(false)
</script>

<style scoped>
.terminal-input-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  margin-bottom: 1rem;
}

.input-label {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9rem;
  color: var(--text-color-variant);
  text-transform: uppercase;
}

.input-container {
  display: flex;
  align-items: center;
  background-color: rgba(30, 30, 30, 0.5);
  border-bottom: 1px solid var(--text-color-variant);
  padding: 8px;
  font-family: 'Courier New', Courier, monospace;
  transition: border-color 0.2s;
}

.input-container.focused {
  border-color: var(--text-color);
  background-color: rgba(40, 40, 40, 0.7);
}

.prompt {
  margin-right: 8px;
  color: var(--text-color);
  font-weight: bold;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  color: var(--text-color);
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
  outline: none;
  padding: 0;
}

.terminal-input::placeholder {
  color: var(--text-color-variant);
  opacity: 0.5;
}

.blinking-cursor {
  color: var(--text-color);
  animation: blink 1s step-end infinite;
  margin-left: 2px;
}

.error-message {
    color: #ef4444; /* text-red */
    font-size: 0.8rem;
    font-family: 'Courier New', Courier, monospace;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
