import { ref } from 'vue'

export const useGameData = () => {
    const user = useState('user', () => null as any)
    const userProfile = useState('userProfile', () => null as any)

    const loading = ref(false)

    const fetchProfile = async () => {
        loading.value = true
        try {
            const { data } = await useFetch('/api/player/profile')
            if (data.value) {
                userProfile.value = data.value
            }
        } catch (e) {
            console.error('Failed to fetch profile', e)
        } finally {
            loading.value = false
        }
    }

    return {
        user,
        userProfile,
        loading,
        fetchProfile
    }
}
