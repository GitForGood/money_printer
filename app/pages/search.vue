<template>
  <NuxtLayout name="three-column">
    <div class="search-page">
      <div class="header">
        <h1 class="page-title">MARKETPLACE TERMINAL</h1>
        <AsciiDivider />
      </div>

      <div class="tabs flex gap-4 mb-4">
        <EmphasizedButton 
          v-if="activeTab === 'stocks'"
          @click="activeTab = 'stocks'" 
        >STOCKS</EmphasizedButton>
        <ActionButton 
          v-else
          @click="activeTab = 'stocks'" 
        >STOCKS</ActionButton>

        <EmphasizedButton 
          v-if="activeTab === 'assets'"
          @click="activeTab = 'assets'" 
        >LOCAL ASSETS</EmphasizedButton>
        <ActionButton 
          v-else
          @click="activeTab = 'assets'" 
        >LOCAL ASSETS</ActionButton>
      </div>

      <div v-if="activeTab === 'stocks'" class="market-section">
        <TerminalPanel title="GLOBAL EQUITIES">
          <table class="market-table">
            <thead>
              <tr>
                <th @click="sortBy('ticker')" class="sortable text-left">TICKER</th>
                <th @click="sortBy('name')" class="sortable text-left">COMPANY</th>
                <th @click="sortBy('share_price')" class="sortable text-right">PRICE</th>
                <th @click="sortBy('owned_shares')" class="sortable text-right">OWNED/TOTAL</th>
                <th @click="sortBy('ownership_percent')" class="sortable text-right">OWNERSHIP (%)</th>
                <th class="text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="stock in sortedStocks" 
                :key="stock.id"
                @click="selectItem(stock, 'stock')"
                :class="{ 'selected': selectedItem?.id === stock.id }"
                class="clickable-row"
              >
                <td>{{ stock.ticker }}</td>
                <td>{{ stock.name }}</td>
                <td class="text-right">${{ stock.share_price.toLocaleString() }}</td>
                <td class="text-right">{{ stock.owned_shares.toLocaleString() }} / {{ formatLargeNumber(stock.total_shares) }}</td>
                <td class="text-right">{{ stock.ownership_percent.toFixed(1) }}%</td>
                <td class="text-right flex justify-end gap-2" @click.stop>
                  <ActionButton @click="openTradeDialog(stock, 'buy')">BUY</ActionButton>
                  <ActionButton v-if="stock.owned_shares > 0" @click="openTradeDialog(stock, 'sell')">SELL</ActionButton>
                </td>
              </tr>
            </tbody>
          </table>
        </TerminalPanel>
      </div>

      <div v-else class="market-section">
        <TerminalPanel title="AVAILABLE LISTINGS (REAL ESTATE / BUSINESS)">
          <table class="market-table">
            <thead>
              <tr>
                <th @click="sortBy('name')" class="sortable text-left">NAME</th>
                <th @click="sortBy('type')" class="sortable text-left">TYPE</th>
                <th @click="sortBy('currentValue')" class="sortable text-right">VALUATION</th>
                <th class="text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="asset in sortedAssets" 
                :key="asset.id"
                @click="selectItem(asset, 'asset')"
                :class="{ 'selected': selectedItem?.id === asset.id }"
                class="clickable-row"
              >
                <td>{{ asset.name }}</td>
                <td>{{ asset.type.toUpperCase() }}</td>
                <td class="text-right">${{ asset.currentValue.toLocaleString() }}</td>
                <td class="text-right" @click.stop>
                  <ActionButton @click="openPurchaseDialog(asset)">ACQUIRE</ActionButton>
                </td>
              </tr>
            </tbody>
          </table>
        </TerminalPanel>
      </div>
    </div>

    <!-- Trade Dialog -->
    <TerminalDialog 
      v-model:isOpen="tradeDialogOpen" 
      :title="tradeMode.toUpperCase() + ' ' + selectedStock?.ticker"
      @confirm="executeTrade"
    >
      <div v-if="selectedStock" class="trade-dialog-inner">
        <p>> PRICE PER SHARE: ${{ selectedStock.share_price }}</p>
        <p>> OWNED: {{ selectedStock.owned_shares }}</p>
        
        <div class="mt-4">
          <label>QUANTITY TO {{ tradeMode.toUpperCase() }}:</label>
          <input 
            type="number" 
            v-model.number="tradeQuantity" 
            class="terminal-input w-full mt-2"
            min="1"
            :max="tradeMode === 'sell' ? selectedStock.owned_shares : undefined"
          />
        </div>
        
        <p class="mt-4 text-green" v-if="tradeMode === 'buy'">TOTAL COST: ${{ (selectedStock.share_price * tradeQuantity).toLocaleString() }}</p>
        <p class="mt-4 text-yellow" v-else>EXPECTED PROCEEDS: ${{ (selectedStock.share_price * tradeQuantity).toLocaleString() }} (Before Tax/Slippage)</p>
      </div>
    </TerminalDialog>

    <!-- Purchase Dialog (For Local Assets) -->
    <TerminalDialog
      v-model:isOpen="purchaseDialogOpen"
      title="ASSET ACQUISITION"
      @confirm="executePurchase"
    >
      <div v-if="selectedAsset" class="purchase-dialog-inner">
        <p>> ASSET: {{ selectedAsset.name }}</p>
        <p>> VALUATION: ${{ selectedAsset.currentValue.toLocaleString() }}</p>
        <p class="mt-4 text-red">> WARNING: THIS ACTION IS PERMANENT. FUNDS WILL BE DEDUCTED IMMEDIATELY.</p>
      </div>
    </TerminalDialog>

    <!-- Detail Selection Sidebar -->
    <template #right-sidebar>
      <div class="detail-sidebar" v-if="selectedItem">
        <h2 class="detail-title">{{ activeTab === 'stocks' ? 'COMPANY DATA' : 'ASSET BRIEF' }}</h2>
        <AsciiDivider />
        
        <div class="detail-content">
          <TerminalPanel :title="selectedItem.name.toUpperCase()">
            <div v-if="activeTab === 'stocks'">
              <DataGrid class="mb-4">
                <div class="stat-item"><span class="label">TICKER:</span><span class="value">{{ selectedItem.ticker }}</span></div>
                <div class="stat-item"><span class="label">SECTOR:</span><span class="value">{{ selectedItem.sector }}</span></div>
                <div class="stat-item"><span class="label">DIV YIELD:</span><span class="value text-green">{{ (selectedItem.dividend_yield * 100).toFixed(2) }}%</span></div>
              </DataGrid>
              <p class="description font-mono text-xs opacity-70 mb-4">{{ selectedItem.description }}</p>
              
              <TerminalPanel title="MARKET STATS">
                <div class="financial-row font-mono text-sm">
                  <span>PREV CLOSE:</span>
                  <span>${{ selectedItem.prev_share_price.toLocaleString() }}</span>
                </div>
                <div class="financial-row font-mono text-sm">
                  <span>VOLATILITY:</span>
                  <span>{{ (selectedItem.volatility * 100).toFixed(1) }}%</span>
                </div>
              </TerminalPanel>
            </div>

            <div v-else>
               <DataGrid class="mb-4">
                <div class="stat-item"><span class="label">ID:</span><span class="value text-xs">{{ selectedItem.id.slice(0, 8) }}...</span></div>
                <div class="stat-item"><span class="label">TYPE:</span><span class="value">{{ selectedItem.type.toUpperCase() }}</span></div>
              </DataGrid>

              <div v-if="selectedItem.type === 'real_estate'">
                <p>> LOCATION: {{ selectedItem.location }}</p>
                <p>> CONDITION: {{ selectedItem.condition }}/100</p>
              </div>

              <div v-if="selectedItem.type === 'business'">
                <p>> SECTOR: {{ selectedItem.sector }}</p>
                <p>> REVENUE/QTR: ${{ selectedItem.revenuePerQuarter.toLocaleString() }}</p>
              </div>
            </div>
          </TerminalPanel>

          <div class="actions mt-auto pt-4">
             <EmphasizedButton 
               v-if="activeTab === 'stocks'" 
               class="w-full justify-center"
               @click="openTradeDialog(selectedItem, 'buy')"
             >EXECUTE PURCHASE</EmphasizedButton>
             <EmphasizedButton 
               v-else 
               class="w-full justify-center"
               @click="openPurchaseDialog(selectedItem)"
             >ACQUIRE LISTING</EmphasizedButton>
          </div>
        </div>
      </div>
      <div v-else class="detail-sidebar empty">
        <p class="opacity-50">> SELECT AN ITEM FOR DEEP INSPECTION</p>
      </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useMarket } from '../composables/useMarket'
import { useEconomy } from '../composables/useEconomy'

const { marketData, fetchMarket, buyStock, buyAsset } = useMarket()
const { fetchSummary } = useEconomy()

const activeTab = ref('stocks')
const sortKey = ref('ticker')
const sortOrder = ref(1) // 1 asc, -1 desc

const tradeDialogOpen = ref(false)
const selectedStock = ref<any>(null)
const tradeMode = ref<'buy' | 'sell'>('buy')
const tradeQuantity = ref(1)

const purchaseDialogOpen = ref(false)
const selectedAsset = ref<any>(null)

const selectedItem = ref<any>(null)

onMounted(() => {
    fetchMarket()
})

function selectItem(item: any, type: string) {
    selectedItem.value = item
}

watch(activeTab, () => {
    selectedItem.value = null
})

const sortedStocks = computed(() => {
    if (!marketData.value?.stocks) return []
    return [...marketData.value.stocks].sort((a: any, b: any) => {
        const valA = a[sortKey.value]
        const valB = b[sortKey.value]
        if (typeof valA === 'string') {
            return valA.localeCompare(valB) * sortOrder.value
        }
        return (valA - valB) * sortOrder.value
    })
})

const sortedAssets = computed(() => {
    if (!marketData.value?.assets) return []
    return [...marketData.value.assets].sort((a: any, b: any) => {
        const valA = a[sortKey.value]
        const valB = b[sortKey.value]
        if (typeof valA === 'string') {
            return valA.localeCompare(valB) * sortOrder.value
        }
        return (valA - valB) * sortOrder.value
    })
})

function sortBy(key: string) {
    if (sortKey.value === key) {
        sortOrder.value *= -1
    } else {
        sortKey.value = key
        sortOrder.value = 1
    }
}

function formatLargeNumber(n: number) {
    if (n >= 1000000000) return (n / 1000000000).toFixed(1) + 'B'
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
    return n.toLocaleString()
}

function openTradeDialog(stock: any, mode: 'buy' | 'sell') {
    selectedStock.value = stock
    tradeMode.value = mode
    tradeQuantity.value = 1
    tradeDialogOpen.value = true
}

async function executeTrade() {
    if (!selectedStock.value) return
    
    if (tradeMode.value === 'buy') {
        const res = await buyStock(selectedStock.value.id, tradeQuantity.value)
        if (res.success) {
            await fetchSummary()
        }
    } else {
        // Selling stock requires finding the specific asset record(s)
        // For simplicity, we assume we have a way to sell by share count or use usePortfolio logic.
        // For now, let's notify user we need a specific 'sellStock' method if we want to sell by count.
        alert('Stock selling by specific count is being implemented. Use Asset Portfolio to sell individual positions.')
    }
}

function openPurchaseDialog(asset: any) {
    selectedAsset.value = asset
    purchaseDialogOpen.value = true
}

async function executePurchase() {
    if (!selectedAsset.value) return
    const res = await buyAsset(selectedAsset.value.id, selectedAsset.value.type)
    if (res.success) {
        await fetchSummary()
    }
}
</script>

<style scoped>
.search-page {
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

.tab-btn {
    font-family: 'Courier New', Courier, monospace;
    padding: 8px 16px;
    background: transparent;
    border: 1px solid var(--text-color-variant);
    color: var(--text-color-variant);
    cursor: pointer;
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
    margin-top: 16px;
}

.description {
    line-height: 1.4;
}

.financial-row {
    display: flex;
     justify-content: space-between;
     padding: 2px 0;
 }

.stat-item {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
}

.pt-4 { padding-top: 1rem; }
.mt-auto { margin-top: auto; }
.text-xs { font-size: 0.75rem; }
.opacity-50 { opacity: 0.5; }
.opacity-70 { opacity: 0.7; }

.tab-btn.active {
    background: var(--primary-color);
    color: #000;
}

.market-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
}

.market-table th, .market-table td {
    padding: 12px 8px;
    border-bottom: 1px solid rgba(226, 122, 25, 0.2);
}

.sortable {
    cursor: pointer;
}

.sortable:hover {
    color: #fff;
}

.terminal-input {
    background: #000;
    border: 1px solid var(--text-color-variant);
    color: var(--text-color);
    padding: 8px;
    font-family: 'Courier New', Courier, monospace;
}

.text-left { text-align: left; }
.text-right { text-align: right; }
.flex { display: flex; }
.justify-end { justify-content: flex-end; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mb-4 { margin-bottom: 1rem; }
.w-full { width: 100%; }
.text-green { color: #22c55e; }
.text-yellow { color: #eab308; }
.text-red { color: #ef4444; }
</style>
