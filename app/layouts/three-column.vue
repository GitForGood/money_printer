<template>
  <div class="layout-three-col">
    <aside class="left-sidebar">
      <GameSidebar />
    </aside>

    <main class="center-stage">
      <slot />
    </main>

    <aside class="right-sidebar">
      <slot name="right-sidebar">
         <div class="p-4 border-b border-[var(--text-color)]">DETAILS</div>
         <!-- Default placeholder for details -->
      </slot>
    </aside>
  </div>
</template>

<style scoped>
.layout-three-col {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-color);
  color: var(--text-color);
  overflow: hidden;
}

.left-sidebar {
  width: var(--sidebar-width);
  flex-shrink: 0;
  border-right: 1px solid var(--text-color-variant);
  overflow-y: auto;
}

.center-stage {
  flex-grow: 1;
  overflow-y: auto;
  padding: 16px;
  /* border-right set by next element if flexible, but let's be explicit */
  border-right: 1px solid var(--text-color-variant);
}

.right-sidebar {
  width: 300px;
  flex-shrink: 0;
  overflow-y: auto;
  background-color: rgba(0,0,0,0.2); /* Slight tint difference? */
}

@media (max-width: 1024px) {
    /* Tablet: Collapse right sidebar to bottom or stack? 
       Let's stack right sidebar below content for now or hide it behind a toggle. 
       GDD says: Mobile: Stacked view. Swipe between portfolios/news/actions. 
       For now, let's wrap. 
    */
    .layout-three-col {
        flex-wrap: wrap;
    }
    .left-sidebar {
        width: 100%;
        height: auto;
        border-right: none;
        border-bottom: 1px solid var(--text-color-variant);
        max-height: 200px; 
    }
    .center-stage {
        width: 100%;
        border-right: none;
        flex-grow: 1;
    }
    .right-sidebar {
        width: 100%;
        height: auto;
        border-top: 1px solid var(--text-color-variant);
        max-height: 300px;
    }
}
</style>
