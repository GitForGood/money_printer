<template>
  <NuxtLayout name="three-column">
    <!-- Center: Asset List -->
    <div class="assets-center-view">
        <div class="header">
            <h1 class="page-title">ASSET PORTFOLIO</h1>
            <AsciiDivider />
        </div>

        <TerminalPanel title="HOLDINGS">
            <table class="data-table">
                <thead>
                    <tr>
                        <th class="text-left">NAME/TICKER</th>
                        <th class="text-left">TYPE</th>
                        <th class="text-right">VALUE</th>
                        <th class="text-right">ACQUIRED</th>
                        <th class="text-right">ROI</th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="asset in assets" 
                        :key="asset.id" 
                        @click="selectAsset(asset)"
                        :class="{ 'selected': selectedAsset?.id === asset.id }"
                        class="clickable-row"
                    >
                        <td>{{ getAssetName(asset) }}</td>
                        <td>{{ asset.type.toUpperCase() }}</td>
                        <td class="text-right">${{ asset.currentValue.toLocaleString() }}</td>
                        <td class="text-right">{{ asset.acquiredAt }}</td>
                        <td class="text-right" :class="getRoiColor(asset)">
                            {{ calculateRoi(asset) }}%
                        </td>
                    </tr>
                </tbody>
            </table>
        </TerminalPanel>
    </div>

    <!-- Right: Detail View -->
    <template #right-sidebar>
        <div class="detail-sidebar" v-if="selectedAsset">
            <h2 class="detail-title">ASSET ANALYSIS</h2>
            <AsciiDivider />
            
            <div class="detail-content">
                <DataGrid class="mb-4">
                    <div class="stat-item"><span class="label">ID:</span><span class="value">{{ selectedAsset.id }}</span></div>
                    <div class="stat-item"><span class="label">TYPE:</span><span class="value">{{ selectedAsset.type.toUpperCase() }}</span></div>
                </DataGrid>

                <TerminalPanel :title="getAssetName(selectedAsset) + ' STATS'">
                    <div class="financial-row">
                         <span>CURRENT VALUE:</span>
                         <span>${{ selectedAsset.currentValue.toLocaleString() }}</span>
                    </div>
                     <div class="financial-row">
                         <span>COST BASIS:</span>
                         <span>${{ selectedAsset.baseValue.toLocaleString() }}</span>
                    </div>
                    <div class="financial-row">
                         <span>UNREALIZED P/L:</span>
                         <span :class="getRoiColor(selectedAsset)">
                             {{ (selectedAsset.currentValue - selectedAsset.baseValue) > 0 ? '+' : '' }}
                             ${{ (selectedAsset.currentValue - selectedAsset.baseValue).toLocaleString() }}
                             ({{ calculateRoi(selectedAsset) }}%)
                         </span>
                    </div>
                </TerminalPanel>

                <!-- Specific Fields per Asset Type -->
                <div class="mt-4" v-if="selectedAsset.type === 'real_estate'">
                    <TerminalPanel title="PROPERTY DETAILS">
                         <div class="stat-item"><span class="label">LOCATION:</span><span class="value">{{ selectedAsset.location }}</span></div>
                         <div class="stat-item"><span class="label">CONDITION:</span><span class="value">{{ selectedAsset.condition }}/100</span></div>
                         <div class="stat-item" v-if="selectedAsset.isRenovating"><span class="label">STATUS:</span><span class="value text-yellow">RENOVATING...</span></div>
                    </TerminalPanel>
                </div>

                <div class="mt-4" v-if="selectedAsset.type === 'stock'">
                    <TerminalPanel title="POSITION">
                         <div class="stat-item"><span class="label">SHARES:</span><span class="value">{{ selectedAsset.shares }}</span></div>
                         <div class="stat-item"><span class="label">AVG COST:</span><span class="value">${{ selectedAsset.costBasisPerShare }}</span></div>
                    </TerminalPanel>
                </div>

                <div class="mt-4" v-if="selectedAsset.type === 'business'">
                    <TerminalPanel title="OPERATIONS">
                         <div class="stat-item"><span class="label">SECTOR:</span><span class="value">{{ selectedAsset.sector }}</span></div>
                         <div class="stat-item"><span class="label">REVENUE/QTR:</span><span class="value text-green">+${{ selectedAsset.revenuePerQuarter?.toLocaleString() }}</span></div>
                         <div class="stat-item"><span class="label">EXPENSE/QTR:</span><span class="value text-red">-${{ selectedAsset.expensePerQuarter?.toLocaleString() }}</span></div>
                         <div class="stat-item"><span class="label">NET/QTR:</span><span class="value" :class="(selectedAsset.revenuePerQuarter - selectedAsset.expensePerQuarter) >= 0 ? 'text-green' : 'text-red'">
                            ${{ (selectedAsset.revenuePerQuarter - selectedAsset.expensePerQuarter)?.toLocaleString() }}
                         </span></div>
                    </TerminalPanel>
                </div>

                <div class="actions mt-auto pt-4">
                    <EmphasizedButton class="w-full justify-center mb-2" @click="handleSell">SELL ASSET</EmphasizedButton>
                    <ActionButton class="w-full justify-center" v-if="selectedAsset.type === 'real_estate'">RENOVATE</ActionButton>
                    <ActionButton class="w-full justify-center" v-if="selectedAsset.type === 'real_estate'">REFINANCE</ActionButton>
                </div>
            </div>
        </div>
        <div class="detail-sidebar empty" v-else>
            <p>> SELECT AN ASSET TO INSPECT</p>
        </div>
    </template>

    <!-- Dialogs -->
    <TerminalDialog
      v-model:isOpen="isConfirmOpen"
      title="ASSET LIQUIDATION"
      :message="confirmMessage"
      @confirm="executeSell"
    />

    <TerminalDialog
      v-model:isOpen="isAlertOpen"
      title="SYSTEM NOTIFICATION"
      :message="alertMessage"
      :show-cancel="false"
    />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { usePortfolio } from '../composables/usePortfolio'
import { useEconomy } from '../composables/useEconomy'

const { assets, fetchAssets, sellAsset, loading } = usePortfolio()
const { fetchSummary } = useEconomy()

const selectedAsset = ref<any>(null)
const isConfirmOpen = ref(false)
const isAlertOpen = ref(false)
const confirmMessage = ref('')
const alertMessage = ref('')

onMounted(async () => {
    await fetchAssets()
    if (assets.value.length > 0) {
        selectedAsset.value = assets.value[0]
    }
})

function selectAsset(asset: any) {
    selectedAsset.value = asset
}

function handleSell() {
    if (!selectedAsset.value) return
    
    confirmMessage.value = `Sell ${selectedAsset.value.name || selectedAsset.value.ticker} for its current value?`
    isConfirmOpen.value = true
}

async function executeSell() {
    try {
        const id = selectedAsset.value.id
        await sellAsset(id)
        await fetchSummary() // Update net worth/cash in sidebar
        selectedAsset.value = assets.value.find((a: any) => a.id !== id) || null
    } catch (e) {
        alertMessage.value = 'ASSET LIQUIDATION FAILURE. SYSTEM ERROR INDICATED.'
        isAlertOpen.value = true
    }
}

function getAssetName(asset: any) {
    if (asset.type === 'stock' && asset.ticker) {
        return asset.name || asset.ticker
    }
    return asset.name
}

function calculateRoi(asset: any) {
    const cost = Number(asset.baseValue || 0)
    const current = Number(asset.currentValue || 0)
    if (cost === 0) return '0.00'
    const profit = current - cost
    return ((profit / cost) * 100).toFixed(2)
}

function getRoiColor(asset: any) {
    const cost = Number(asset.baseValue || 0)
    const current = Number(asset.currentValue || 0)
    if (current > cost) return 'text-green'
    if (current < cost) return 'text-red'
    return ''
}
</script>

<style scoped>
.assets-center-view {
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
}

.data-table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Courier New', Courier, monospace;
}

.data-table th, .data-table td {
    padding: 8px;
    border-bottom: 1px solid rgba(226, 122, 25, 0.2); 
}

.data-table th {
    font-weight: bold;
    color: var(--text-color-variant);
}

.clickable-row {
    cursor: pointer;
}

.clickable-row:hover {
    background-color: rgba(226, 122, 25, 0.1);
}

.clickable-row.selected {
    background-color: rgba(226, 122, 25, 0.2);
    color: #fff; 
}

.text-left { text-align: left; }
.text-right { text-align: right; }

.detail-sidebar {
    padding: 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
}

.detail-title {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0;
}

.detail-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
}

.financial-row {
     display: flex;
    justify-content: space-between;
    padding: 4px 0;
}

.w-full { width: 100%; }
.justify-center { justify-content: center; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mt-auto { margin-top: auto; }
.pt-4 { padding-top: 1rem; }

.text-red {
    color: #ef4444;
}
.text-green {
    color: #22c55e;
}
.text-yellow {
    color: #eab308;
}
</style>
