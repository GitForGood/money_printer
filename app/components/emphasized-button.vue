<template>
  <BracketedButton
    class="emphasized-button"
    v-bind="props"
    @click="emit('click', $event)"
  >
    <slot></slot>
  </BracketedButton>
</template>

<script lang="ts" setup>
import BracketedButton from './bracketed-button.vue'

// Re-declare props to pass them through or use $attrs 
// Ideally we just want to wrap it.
const props = defineProps({
  disabled: { type: Boolean, default: false },
  to: { type: [String, Object], default: null },
  href: { type: String, default: null },
  type: { type: String, default: 'button' },
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.emphasized-button {
  border: 1px solid var(--text-color);
  box-shadow: 0 0 2px var(--text-color);
  /* Adjust padding to account for border if necessary, 
     but BracketedButton handles padding logic. 
     We might want to slightly increase base padding if the border makes it look cramped,
     but let's stick to the base logic first. */
  transition: box-shadow 0.1s ease-in-out, gap 0.1s ease-in-out, padding 0.1s ease-in-out;
  background: rgba(0,0,0,0.2); /* Slight dark bg to make glow pop? Or usually transparent */
}

/* 
  Target the hover state. 
  Since BracketedButton handles the gap/padding transition on itself, 
  we just need to handle the extra visual flair here.
*/
.emphasized-button:hover, .emphasized-button:focus-visible {
  box-shadow: 0 0 8px var(--text-color), inset 0 0 4px rgba(226, 122, 25, 0.2);
  background: rgba(226, 122, 25, 0.1); /* Slight fill of theme color */
}

.emphasized-button:active {
  box-shadow: 0 0 4px var(--text-color);
}
</style>
