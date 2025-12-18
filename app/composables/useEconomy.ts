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

    return {
        financialState,
        netWorth,
        liquidity,
        loading,
        fetchSummary
    }
}
