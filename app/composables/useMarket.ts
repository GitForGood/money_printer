import { ref } from 'vue'

export interface MarketStock {
    id: string;
    name: string;
    ticker: string;
    sector: string;
    share_price: number;
    prev_share_price: number;
    total_shares: number;
    owned_shares: number;
    ownership_percent: number;
}

export interface MarketAssets {
    stocks: MarketStock[];
    assets: any[]; // Non-stock assets
}

export const useMarket = () => {
    const marketData = useState<MarketAssets | null>('marketData', () => null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const fetchMarket = async () => {
        loading.value = true
        error.value = null
        try {
            const data = await $fetch<MarketAssets>('/api/assets/available')
            if (data) {
                marketData.value = data
            }
        } catch (e: any) {
            error.value = e.message || 'Failed to fetch market data'
        } finally {
            loading.value = false
        }
    }

    const buyStock = async (companyId: string, shares: number) => {
        loading.value = true
        try {
            await $fetch('/api/assets/buy', {
                method: 'POST',
                body: {
                    assetType: 'stock',
                    companyId,
                    shares
                }
            })
            await fetchMarket() // Refresh
            return { success: true }
        } catch (e: any) {
            return { success: false, error: e.message }
        } finally {
            loading.value = false
        }
    }

    const buyAsset = async (assetId: string, assetType: string) => {
        loading.value = true
        try {
            await $fetch('/api/assets/buy', {
                method: 'POST',
                body: {
                    assetType,
                    assetId
                }
            })
            await fetchMarket()
            return { success: true }
        } catch (e: any) {
            return { success: false, error: e.message }
        } finally {
            loading.value = false
        }
    }

    const sellAsset = async (assetId: string) => {
        loading.value = true
        try {
            await $fetch('/api/assets/sell', {
                method: 'POST',
                body: { assetId }
            })
            await fetchMarket()
            return { success: true }
        } catch (e: any) {
            return { success: false, error: e.message }
        } finally {
            loading.value = false
        }
    }

    return {
        marketData,
        loading,
        error,
        fetchMarket,
        buyStock,
        buyAsset,
        sellAsset
    }
}
