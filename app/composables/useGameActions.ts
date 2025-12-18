import { ref } from 'vue'
import type { GameAction } from '../../types/actions'

export const useGameActions = () => {
    const loading = ref(false)

    const performAction = async (actionId: string, targetId?: string, params?: any) => {
        loading.value = true
        try {
            const result = await $fetch('/api/actions/perform', {
                method: 'POST',
                body: { actionId, targetId, parameters: params }
            })

            // Ideally we refresh other states here if successful
            // but simpler to let UI decide what to refresh
            return result
        } catch (e) {
            console.error('Action failed', e)
            throw e
        } finally {
            loading.value = false
        }
    }

    return {
        loading,
        performAction
    }
}
