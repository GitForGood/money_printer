import { ref, computed } from 'vue'
import type { GameAsset, BaseAsset } from '../../types/assets'
import type { Loan, LoanOffer } from '../../types/loans'

export const usePortfolio = () => {
    const assets = useState<GameAsset[]>('portfolioAssets', () => [])
    const loans = useState<Loan[]>('portfolioLoans', () => [])
    const loanOffers = useState<LoanOffer[]>('portfolioLoanOffers', () => [])

    const loading = ref(false)

    const fetchAssets = async () => {
        loading.value = true
        try {
            const { data } = await useFetch('/api/assets')
            if (data.value && data.value.assets) {
                assets.value = data.value.assets as GameAsset[]
            }
        } catch (e) {
            console.error('Fetch assets failed', e)
        } finally {
            loading.value = false
        }
    }

    const fetchLoans = async () => {
        try {
            const { data } = await useFetch('/api/loans/active')
            if (data.value && data.value.loans) {
                loans.value = data.value.loans as Loan[]
            }
        } catch (e) {
            console.error('Fetch loans failed', e)
        }
    }

    const fetchLoanOffers = async () => {
        try {
            const { data } = await useFetch('/api/loans/offers')
            if (data.value && data.value.offers) {
                loanOffers.value = data.value.offers as LoanOffer[]
            }
        } catch (e) {
            console.error('Fetch offers failed', e)
        }
    }

    const buyAsset = async (assetType: string, params: any) => {
        try {
            await $fetch('/api/assets/buy', {
                method: 'POST',
                body: { assetType, ...params }
            })
            await fetchAssets()
            // Refresh market/economy state if possible, though strict separation might verify elsewhere
        } catch (e: any) {
            console.error('Failed to buy asset', e)
            // Rethrow or handle? For now alert or rethrow
            throw e
        }
    }

    const takeLoan = async (offerId: string) => {
        try {
            await $fetch('/api/loans/take', {
                method: 'POST',
                body: { offerId }
            })
            await fetchLoans()
        } catch (e: any) {
            console.error('Failed to take loan', e)
            throw e
        }
    }

    const sellAsset = async (assetId: string) => {
        try {
            await $fetch('/api/assets/sell', {
                method: 'POST',
                body: { assetId }
            })
            await fetchAssets()
        } catch (e: any) {
            console.error('Failed to sell asset', e)
            throw e
        }
    }

    const payLoan = async (loanId: string, amount: number) => {
        try {
            await $fetch('/api/loans/pay', {
                method: 'POST',
                body: { loanId, amount }
            })
            await fetchLoans()
        } catch (e: any) {
            console.error('Failed to pay loan', e)
            throw e
        }
    }

    // Computed
    const totalAssetValue = computed(() => assets.value.reduce((sum, a) => sum + (Number(a.currentValue) || 0), 0))
    const totalDebt = computed(() => loans.value.reduce((sum, l) => sum + (Number(l.remainingPrincipal) || 0), 0))

    return {
        assets,
        loans,
        loanOffers,
        loading,
        fetchAssets,
        fetchLoans,
        fetchLoanOffers,
        buyAsset,
        sellAsset,
        takeLoan,
        payLoan,
        totalAssetValue,
        totalDebt
    }
}
