<template>
  <div class="data-grid">
    <slot></slot>
  </div>
</template>

<style scoped>
.data-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
  width: 100%;
}
</style>
