/**
 * Tutorial System Types
 */

export type PageId = 'dashboard' | 'assets' | 'loans' | 'search'

export interface TutorialContent {
    pageId: PageId
    title: string
    content: string
    tips?: string[]
}

export interface TutorialState {
    id: string
    user_id: string
    page_id: PageId
    completed: boolean
    completed_at: string | null
    created_at: string
}

export interface TutorialStateResponse {
    states: TutorialState[]
}

export interface MarkTutorialCompleteRequest {
    pageId: PageId
}

export interface MarkTutorialCompleteResponse {
    success: boolean
    state: TutorialState
}
