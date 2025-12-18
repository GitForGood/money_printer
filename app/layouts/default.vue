<template>
  <div class="layout-default">
    <aside class="sidebar">
       <GameSidebar />
    </aside>
    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout-default {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-color);
  color: var(--text-color);
  overflow: hidden;
}

.sidebar {
  width: 250px;
  flex-shrink: 0;
  border-right: 1px solid var(--text-color-variant);
  display: flex;
  flex-direction: column;
}

.main-content {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 768px) {
  .layout-default {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    height: auto;
    border-right: none;
    border-bottom: 1px solid var(--text-color-variant);
  }
}
</style>
