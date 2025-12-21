<template>
  <NuxtLayout name="default">
    <div class="dashboard-page">
      <div class="header">
        <h1 class="page-title">EXECUTIVE DASHBOARD</h1>
        <AsciiDivider />
      </div>

      <div class="stats-grid">
        <TerminalPanel title="FINANCIAL OVERVIEW">
          <DataGrid>
            <div class="stat-item">
              <span class="label">NET WORTH:</span>
              <span class="value">$1,042,000</span>
            </div>
            <div class="stat-item">
              <span class="label">LIQUID CASH:</span>
              <span class="value">$42,000</span>
            </div>
            <div class="stat-item">
              <span class="label">TOTAL DEBT:</span>
              <span class="value text-red">$500,000</span>
            </div>
            <div class="stat-item">
              <span class="label">QTR INCOME:</span>
              <span class="value text-green">+$125,000</span>
            </div>
            <div class="stat-item">
              <span class="label">QTR EXPENSE:</span>
              <span class="value text-red">-$80,000</span>
            </div>
          </DataGrid>
        </TerminalPanel>

        <TerminalPanel title="SYSTEM NOTIFICATIONS">
          <ul class="notifications-list">
             <li>> Market volatility detected in Tech sector.</li>
             <li>> Loan payment due in 15 days.</li>
             <li>> New asset opportunity available: 'Downtown Complex'.</li>
          </ul>
        </TerminalPanel>
      </div>

      <div class="actions-section mt-4">
        <TerminalPanel title="QUICK ACTIONS">
           <div class="flex gap-4">
              <ActionLink to="/assets">MANAGE ASSETS</ActionLink>
              <ActionLink to="/loans">MANAGE DEBT</ActionLink>
              <EmphasizedButton>END TURN (NEXT QUARTER)</EmphasizedButton>
           </div>
        </TerminalPanel>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useEconomy } from '../composables/useEconomy'

const { financialState, netWorth, liquidity, fetchSummary, loading } = useEconomy()

onMounted(() => {
  fetchSummary()
})
</script>

<style scoped>
.dashboard-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}

.page-title {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  margin: 0;
}

.stats-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  flex-grow: 1;
}

@media (max-width: 1024px) {
    .stats-grid {
        grid-template-columns: 1fr;
    }
}

.stat-item {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px dashed var(--text-color-variant);
  padding: 4px 0;
}

.label {
    opacity: 0.8;
}

.value {
    font-weight: bold;
}

.text-red {
    color: #ef4444;
}

.text-green {
    color: #22c55e;
}

.notifications-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-family: 'Courier New', Courier, monospace;
}
</style>
