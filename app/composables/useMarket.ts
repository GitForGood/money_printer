import { ref, computed } from 'vue'
import type { PublicCompany } from '../../types/market'

export const useMarket = () => {
    const companies = useState<PublicCompany[]>('marketCompanies', () => [])
    const globalTrend = useState<number>('marketTrend', () => 0)

    const loading = ref(false)

    const fetchCompanies = async () => {
        loading.value = true
        try {
            const { data } = await useFetch('/api/market/companies')
            if (data.value && data.value.companies) {
                companies.value = data.value.companies as PublicCompany[]
            }
        } catch (e) {
            console.error('Fetch companies failed', e)
        } finally {
            loading.value = false
        }
    }

    const triggerTick = async () => {
        // Manual debug trigger
        await $fetch('/api/game/tick', { method: 'POST' })
        await fetchCompanies()
    }

    // Helpers
    const topGainers = computed(() => {
        return [...companies.value]
            .sort((a, b) => {
                const changeA = (a.sharePrice - (a.prevSharePrice || a.sharePrice)) / (a.prevSharePrice || 1)
                const changeB = (b.sharePrice - (b.prevSharePrice || b.sharePrice)) / (b.prevSharePrice || 1)
                return changeB - changeA
            })
            .slice(0, 5)
    })

    return {
        companies,
        globalTrend,
        loading,
        fetchCompanies,
        triggerTick,
        topGainers
    }
}
