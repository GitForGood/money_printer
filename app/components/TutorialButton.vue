<template>
  <button 
    class="tutorial-button" 
    @click="$emit('click')"
    title="Open Tutorial"
    aria-label="Help"
  >
    <span class="tutorial-icon">?</span>
  </button>
</template>

<script lang="ts" setup>
// Emits click event when button is clicked
defineEmits(['click'])
</script>

<style scoped>
.tutorial-button {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid var(--text-color-variant);
  color: var(--text-color);
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  backdrop-filter: blur(4px);
}

.tutorial-button:hover {
  background: rgba(226, 122, 25, 0.3);
  border-color: var(--text-color);
  transform: scale(1.05);
}

.tutorial-button:active {
  transform: scale(0.95);
}

.tutorial-icon {
  line-height: 1;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .tutorial-button {
    top: 10px;
    right: 10px;
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
}
</style>
