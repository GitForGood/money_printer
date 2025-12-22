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
      <ActionButton @click="handleBankruptcy" class="nav-item bankruptcy-btn">DECLARE BANKRUPTCY</ActionButton>
      <ActionButton @click="requestLogout" class="nav-item">LOGOUT</ActionButton>
    </nav>

    <!-- Bankruptcy Confirm Dialog -->
    <TerminalDialog
      v-model:isOpen="isBankruptcyDialogOpen"
      title="DECLARE BANKRUPTCY"
      :message="bankruptcyMessage"
      @confirm="executeBankruptcy"
    />

    <!-- Bankruptcy Result Dialog -->
    <TerminalDialog
      v-model:isOpen="isResultDialogOpen"
      title="SYSTEM NOTIFICATION"
      :message="resultMessage"
      :show-cancel="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, ref } from 'vue'
import { useEconomy } from '../composables/useEconomy'
import { useRouter } from 'vue-router'

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
const router = useRouter()

const isBankruptcyDialogOpen = ref(false)
const isResultDialogOpen = ref(false)
const resultMessage = ref('')

const bankruptcyMessage = `> WARNING: CRITICAL ACTION DETECTED

This will PERMANENTLY:
- Liquidate ALL assets (stocks, real estate, businesses)
- Erase ALL outstanding debts
- Reset cash to beginner template ($10,000)
- Reset all stats (AP, karma, heat, reputation)
- Reset ALL tutorial progress

This action is IRREVERSIBLE.

Do you wish to proceed?`

function handleBankruptcy() {
  isBankruptcyDialogOpen.value = true
}

async function executeBankruptcy() {
  try {
    const response = await $fetch('/api/player/bankruptcy', {
      method: 'POST'
    })

    if (response.success) {
      resultMessage.value = '> BANKRUPTCY DECLARED\n\nAll assets liquidated. Debts cleared. Profile reset to beginner state. You may now rebuild your empire.'
      isResultDialogOpen.value = true

      // Refresh economy data
      await fetchSummary()

      // Redirect to dashboard after a delay
      setTimeout(() => {
        router.push('/')
      }, 3000)
    } else {
      resultMessage.value = '> BANKRUPTCY FAILED\n\nSystem error. Profile reset could not be completed.'
      isResultDialogOpen.value = true
    }
  } catch (error) {
    console.error('Bankruptcy error:', error)
    resultMessage.value = '> BANKRUPTCY FAILED\n\nCritical system error encountered.'
    isResultDialogOpen.value = true
  }
}

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

.bankruptcy-btn {
  opacity: 0.6;
  font-size: 0.85rem;
}

.bankruptcy-btn:hover {
  opacity: 1;
  border-color: #ef4444;
}

.text-red-500 {
    color: #ef4444;
}
</style>
