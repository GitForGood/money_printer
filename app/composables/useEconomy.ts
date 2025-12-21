import { ref, computed } from 'vue'
import type { FinancialState, EconomySummaryResponse } from '../../types/economy'

export const useEconomy = () => {
    const financialState = useState<FinancialState | null>('financialState', () => null)
    const loading = ref(false)

    const fetchSummary = async () => {
        loading.value = true
        try {
            const { data } = await useFetch<EconomySummaryResponse>('/api/economy/summary')
            if (data.value) {
                financialState.value = data.value.state
            }
        } catch (e) {
            console.error('Failed to fetch economy summary', e)
        } finally {
            loading.value = false
        }
    }

    // Helpers
    const netWorth = computed(() => financialState.value?.netWorth || 0)
    const liquidity = computed(() => (financialState.value?.liquidity.cash || 0) + (financialState.value?.liquidity.liquidStockValue || 0))

    // Action Points
    const apInstant = computed(() => financialState.value?.stats?.apInstant || 0)
    const maxApInstant = computed(() => financialState.value?.stats?.maxApInstant || 0)
    const apQuarterly = computed(() => financialState.value?.stats?.apQuarterly || 0)
    const maxApQuarterly = computed(() => financialState.value?.stats?.maxApQuarterly || 0)
    const apLongTerm = computed(() => financialState.value?.stats?.apLongTerm || 0)
    const maxApLongTerm = computed(() => financialState.value?.stats?.maxApLongTerm || 0)

    const qtrIncome = computed(() => financialState.value?.qtrIncome || 0)
    const qtrExpense = computed(() => financialState.value?.qtrExpense || 0)

    return {
        financialState,
        netWorth,
        liquidity,
        apInstant,
        maxApInstant,
        apQuarterly,
        maxApQuarterly,
        apLongTerm,
        maxApLongTerm,
        qtrIncome,
        qtrExpense,
        loading,
        fetchSummary
    }
}
