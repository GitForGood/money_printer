import { ref } from 'vue'
import type { TutorialState, TutorialContent, PageId, TutorialStateResponse, MarkTutorialCompleteResponse } from '../../types/tutorial'
import { getTutorial } from '../config/tutorials'

/**
 * Composable for managing tutorial state and interactions
 */
export function useTutorial() {
    const tutorialStates = ref<TutorialState[]>([])
    const loading = ref(false)
    const error = ref<string | null>(null)

    /**
     * Fetch tutorial state from the API
     */
    async function fetchTutorialState() {
        loading.value = true
        error.value = null

        try {
            const response = await $fetch<TutorialStateResponse>('/api/player/tutorial-state')
            tutorialStates.value = response.states
        } catch (e: any) {
            console.error('Error fetching tutorial state:', e)
            error.value = e.message || 'Failed to load tutorial state'
        } finally {
            loading.value = false
        }
    }

    /**
     * Mark a tutorial as completed
     */
    async function markTutorialComplete(pageId: PageId) {
        try {
            const response = await $fetch<MarkTutorialCompleteResponse>('/api/player/tutorial-state', {
                method: 'POST',
                body: { pageId }
            })

            if (response.success) {
                // Update local state
                const index = tutorialStates.value.findIndex(s => s.page_id === pageId)
                if (index !== -1) {
                    tutorialStates.value[index] = response.state
                }
            }

            return response.success
        } catch (e: any) {
            console.error('Error marking tutorial complete:', e)
            return false
        }
    }

    /**
     * Check if a tutorial should be shown (not yet completed)
     */
    function shouldShowTutorial(pageId: PageId): boolean {
        const state = tutorialStates.value.find(s => s.page_id === pageId)
        return state ? !state.completed : true // Show if not found or not completed
    }

    /**
     * Get tutorial content for a specific page
     */
    function getTutorialContent(pageId: PageId): TutorialContent {
        return getTutorial(pageId)
    }

    /**
     * Check if tutorial state has been loaded
     */
    function isLoaded(): boolean {
        return tutorialStates.value.length > 0
    }

    return {
        tutorialStates,
        loading,
        error,
        fetchTutorialState,
        markTutorialComplete,
        shouldShowTutorial,
        getTutorialContent,
        isLoaded
    }
}
