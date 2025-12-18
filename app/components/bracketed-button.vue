<template>
  <component
    :is="componentType"
    class="bracketed-button"
    v-bind="componentProps"
    :disabled="props.disabled"
    @click="handleClick"
  >
    <span class="bracket">[</span>
    <span class="content"><slot></slot></span>
    <span class="bracket">]</span>
  </component>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    default: 'button',
  }
})

const emit = defineEmits(['click'])

const componentType = computed(() => {
  if (props.to) return 'NuxtLink'
  if (props.href) return 'a'
  return 'button'
})

const componentProps = computed(() => {
  if (props.to) return { to: props.to }
  if (props.href) return { href: props.href }
  return { type: props.type }
})

function handleClick(event: Event) {
  if (props.disabled) {
    event.preventDefault()
    event.stopPropagation()
    return
  }
  emit('click', event)
}
</script>

<style scoped>
.bracketed-button {
  color: var(--text-color);
  font-size: 16px;
  font-family: 'Courier New', Courier, monospace;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0px;
  padding: 4px 12px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  transition: gap 0.1s ease-in-out, padding 0.1s ease-in-out, color 0.1s;
  /* Add explicit width constraints if needed, but flex normally handles content */
}

/* Ensure NuxtLink/a behave like button in layout */
.bracketed-button:focus {
    outline: none;
}

.bracketed-button:hover, .bracketed-button:focus-visible {
  gap: 8px;
  padding: 4px 4px;
}

.bracketed-button:active {
  gap: 4px; /* Halfway state for press */
  padding: 4px 8px;
}

.bracketed-button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

.bracket {
    font-weight: bold;
}
</style>