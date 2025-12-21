<template>
  <NuxtLayout name="three-column">
    <!-- Center: Loan List -->
    <div class="loans-center-view">
        <div class="header">
            <h1 class="page-title">DEBT INSTRUMENTS</h1>
            <AsciiDivider />
        </div>

        <TerminalPanel title="ACTIVE LOANS">
            <table class="data-table">
                <thead>
                    <tr>
                        <th class="text-left">LENDER</th>
                        <th class="text-right">PRINCIPAL</th>
                        <th class="text-right">REMAINING</th>
                        <th class="text-right">RATE (D)</th>
                        <th class="text-right">TERM</th>
                    </tr>
                </thead>
                <tbody>
                    <tr 
                        v-for="loan in loans" 
                        :key="loan.id" 
                        @click="selectLoan(loan)"
                        :class="{ 'selected': selectedLoan?.id === loan.id }"
                        class="clickable-row"
                    >
                        <td>{{ loan.lenderName }}</td>
                        <td class="text-right">${{ loan.principal.toLocaleString() }}</td>
                        <td class="text-right">${{ loan.remainingPrincipal.toLocaleString() }}</td>
                        <td class="text-right">{{ (loan.interestRateDaily * 100).toFixed(2) }}%</td>
                        <td class="text-right">{{ loan.termDays > 0 ? loan.termDays + 'd' : '∞' }}</td>
                    </tr>
                </tbody>
            </table>
        </TerminalPanel>
    </div>

    <!-- Right: Detail View -->
    <template #right-sidebar>
        <div class="detail-sidebar" v-if="selectedLoan">
            <h2 class="detail-title">LOAN DETAILS</h2>
            <AsciiDivider />
            
            <div class="detail-content">
                <DataGrid class="mb-4">
                    <div class="stat-item"><span class="label">ID:</span><span class="value">{{ selectedLoan.id }}</span></div>
                    <div class="stat-item"><span class="label">ORIGINATION:</span><span class="value">{{ selectedLoan.originationDate }}</span></div>
                    <div class="stat-item"><span class="label">LENDER:</span><span class="value">{{ selectedLoan.lenderName }}</span></div>
                </DataGrid>

                <TerminalPanel title="FINANCIALS">
                    <div class="financial-row">
                         <span>PRINCIPAL:</span>
                         <span>${{ selectedLoan.principal.toLocaleString() }}</span>
                    </div>
                     <div class="financial-row">
                         <span>REMAINING:</span>
                         <span>${{ selectedLoan.remainingPrincipal.toLocaleString() }}</span>
                    </div>
                    <div class="financial-row">
                         <span>RATE (DAILY):</span>
                         <span>{{ (selectedLoan.interestRateDaily * 100).toFixed(4) }}%</span>
                    </div>
                </TerminalPanel>

                <div class="mt-4" v-if="selectedLoan.collateralAssetId">
                    <TerminalPanel title="COLLATERAL">
                         <div class="collateral-info">
                            <span>ASSET ID:</span>
                            <span>{{ selectedLoan.collateralAssetId }}</span>
                            <!-- In real app, look up asset details -->
                         </div>
                    </TerminalPanel>
                </div>

                <div class="actions mt-auto pt-4">
                    <EmphasizedButton class="w-full justify-center mb-2" @click="handlePayment">MAKE PAYMENT</EmphasizedButton>
                    <BracketedButton class="w-full justify-center">REFINANCE</BracketedButton>
                </div>
            </div>
        </div>
        <div class="detail-sidebar empty" v-else>
            <p>> SELECT A LOAN TO VIEW DETAILS</p>
        </div>
    </template>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { usePortfolio } from '~/composables/usePortfolio'
import { useEconomy } from '~/composables/useEconomy'

const { loans, fetchLoans, payLoan, loading } = usePortfolio()
const { fetchSummary } = useEconomy()

const selectedLoan = ref<any>(null)

onMounted(async () => {
    await fetchLoans()
    if (loans.value.length > 0) {
        selectedLoan.value = loans.value[0]
    }
})

function selectLoan(loan: any) {
    selectedLoan.value = loan
}

async function handlePayment() {
    if (!selectedLoan.value) return
    
    const amountStr = prompt(`Enter payment amount (Remaining: $${selectedLoan.value.remainingPrincipal.toLocaleString()}):`, selectedLoan.value.remainingPrincipal.toString())
    if (!amountStr) return
    
    const amount = parseFloat(amountStr)
    if (isNaN(amount) || amount <= 0) {
        alert('Invalid amount')
        return
    }

    try {
        await payLoan(selectedLoan.value.id, amount)
        await fetchSummary() // Update sidebar cash/debt
        // Refresh local selected state
        selectedLoan.value = loans.value.find((l: any) => l.id === selectedLoan.value.id) || loans.value[0] || null
    } catch (e) {
        alert('Payment failed. See console.')
    }
}
</script>

<style scoped>
.loans-center-view {
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
    border-bottom: 1px solid rgba(226, 122, 25, 0.2); /* var(--text-color) with opacity */
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
    color: #fff; /* Highlight text? */
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
</style>
