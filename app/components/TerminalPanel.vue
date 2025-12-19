<template>
  <div class="terminal-panel">
    <div v-if="title" class="panel-header">
      <span class="header-decoration">></span>
      <h3 class="panel-title">{{ title }}</h3>
      <div class="header-line"></div>
    </div>
    <div class="panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  title: {
    type: String,
    default: '',
  }
})
</script>

<style scoped>
.terminal-panel {
  border: 1px solid var(--text-color);
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.panel-header {
  display: flex;
  align-items: center;
  padding: 8px;
  gap: 8px;
}

.header-decoration {
  color: var(--text-color-variant, #b37c49);
}

.panel-title {
  margin: 0;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.1em;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--text-color);
  white-space: nowrap;
}

.header-line {
  flex-grow: 1;
  height: 1px;
  background-color: var(--text-color-variant, #b37c49);
  /* Dotted or dashed for terminal look? */
  background-image: linear-gradient(to right, var(--text-color-variant) 33%, rgba(255,255,255,0) 0%);
  background-position: bottom;
  background-size: 6px 1px;
  background-repeat: repeat-x;
  background-color: transparent;
}

.panel-content {
  padding: 16px;
  flex-grow: 1;
  overflow: auto;
}
</style>
