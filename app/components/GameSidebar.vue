<template>
  <div class="game-sidebar">
    <!-- Player Stats Summary -->
    <div class="player-stats">
      <div class="stat-row">
        <span class="stat-label">NET:</span>
        <span class="stat-value">${{ netWorth.toLocaleString() }}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">CASH:</span>
        <span class="stat-value">${{ liquidity.toLocaleString() }}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">DEBT:</span>
        <span class="stat-value text-red-500">${{ (financialState?.debt.totalPrincipal || 0).toLocaleString() }}</span>
      </div>
      
      <AsciiDivider class="my-2 opacity-30" />
      
      <div class="stat-row" title="Instant Action Points (Resets every quarter)">
        <span class="stat-label">INSTANT AP:</span>
        <span class="stat-value">{{ apInstant }}/{{ maxApInstant }}</span>
      </div>
      <div class="stat-row" title="Quarterly Action Points (Standard moves)">
        <span class="stat-label">QUARTERLY AP:</span>
        <span class="stat-value">{{ apQuarterly }}/{{ maxApQuarterly }}</span>
      </div>
      <div class="stat-row" title="Bandwidth (Active long-term projects)">
        <span class="stat-label">BANDWIDTH:</span>
        <span class="stat-value">{{ maxApLongTerm - apLongTerm }}/{{ maxApLongTerm }}</span>
      </div>
    </div>

    <!-- Title -->
    <div class="sidebar-title">
      MONEY PRINTER
    </div>

    <AsciiDivider />

    <!-- Navigation -->
    <nav class="nav-menu">
      <ActionLink to="/" class="nav-item">DASHBOARD</ActionLink>
      <ActionLink to="/assets" class="nav-item">ASSETS</ActionLink>
      <ActionLink to="/loans" class="nav-item">DEBT</ActionLink>
      <ActionLink to="/search" class="nav-item">MARKETPLACE</ActionLink>
       <!-- Spacer for future items -->
      <div class="nav-spacer"></div>
      
      <AsciiDivider />
      <ActionButton @click="requestLogout" class="nav-item">LOGOUT</ActionButton>
    </nav>
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue'
import { useEconomy } from '../composables/useEconomy'

const { 
  financialState, 
  fetchSummary, 
  liquidity, 
  netWorth,
  apInstant,
  maxApInstant,
  apQuarterly,
  maxApQuarterly,
  apLongTerm,
  maxApLongTerm
} = useEconomy()
const requestLogout = inject('requestLogout', () => {})

onMounted(() => {
  fetchSummary()
})
</script>

<style scoped>
.game-sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Courier New', Courier, monospace;
}

.player-stats {
  padding: 16px;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-bottom: 1px solid var(--text-color-variant);
  opacity: 0.8;
  pointer-events: none; /* Non-interactable as requested */
}

.stat-row {
  display: flex;
  justify-content: space-between;
}

.sidebar-title {
  padding: 16px;
  text-align: center; /* Centered title */
  font-weight: bold;
  font-size: 1.1rem;
  letter-spacing: 1px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  flex-grow: 1;
}

.nav-item {
  width: 100%;
  justify-content: flex-start; /* Align text left within button, or center? formatting says center usually for buttons but nav might look better left. Let's keep default center for bracketed button or override if needed. */
}

.nav-spacer {
    flex-grow: 1;
}

.text-red-500 {
    color: #ef4444;
}
</style>
