import { describe, it, expect, vi } from 'vitest'
import { mockNuxtImport } from '@nuxt/test-utils/runtime'
import { useEconomy } from '../../../app/composables/useEconomy'
import { ref } from 'vue'

// Mock useState
mockNuxtImport('useState', () => {
    return (key: string, init: () => any) => {
        return ref(init())
    }
})

// Mock useFetch
const { mockUseFetch } = vi.hoisted(() => {
    return {
        mockUseFetch: vi.fn()
    }
})

mockNuxtImport('useFetch', () => {
    return mockUseFetch
})

describe('useEconomy', () => {
    it('should initialize with default state', () => {
        const { financialState, netWorth, liquidity, loading } = useEconomy()

        expect(financialState.value).toBeNull()
        expect(netWorth.value).toBe(0)
        expect(liquidity.value).toBe(0)
        expect(loading.value).toBe(false)
    })

    it('should fetch and update state', async () => {
        const mockData = {
            state: {
                netWorth: 100000,
                liquidity: {
                    cash: 50000,
                    liquidStockValue: 25000
                }
            }
        }

        mockUseFetch.mockResolvedValue({
            data: ref(mockData)
        })

        const { fetchSummary, financialState, netWorth, liquidity, loading } = useEconomy()

        const promise = fetchSummary()
        expect(loading.value).toBe(true)

        await promise

        expect(loading.value).toBe(false)
        expect(financialState.value).toEqual(mockData.state)
        expect(netWorth.value).toBe(100000)
        expect(liquidity.value).toBe(75000) // 50000 + 25000
    })

    it('should handle fetch errors', async () => {
        mockUseFetch.mockRejectedValue(new Error('Network error'))
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })

        const { fetchSummary, loading } = useEconomy()

        await fetchSummary()

        expect(loading.value).toBe(false)
        expect(consoleSpy).toHaveBeenCalled()
        consoleSpy.mockRestore()
    })
})
