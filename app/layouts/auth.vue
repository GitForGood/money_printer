<template>
  <div class="layout-auth">
    <div class="auth-container">
        <h1 class="game-title">MONEY PRINTER</h1>
        <AsciiDivider />
        <slot />
    </div>
  </div>
</template>

<style scoped>
.layout-auth {
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-color);
  color: var(--text-color);
  align-items: center;
  justify-content: center;
}

.auth-container {
    border: 1px solid var(--text-color);
    padding: 2rem;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    background-color: rgba(10, 10, 10, 0.95);
}

.game-title {
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    font-size: 2rem;
    margin-bottom: 0px;
}
</style>
