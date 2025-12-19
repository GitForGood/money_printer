<template>
  <div class="app-root">
    <NuxtPage />
    
    <!-- Global Logout Dialog -->
    <TerminalDialog
        v-model:isOpen="showLogoutDialog"
        title="TERMINATE SESSION?"
        message="You are about to disconnect from the secure terminal. Unsaved protocols will be lost. Are you sure you want to proceed?"
        @confirm="confirmLogout"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'

const showLogoutDialog = ref(false)
const router = useRouter()
const client = useSupabaseClient()

function handleLogoutRequest() {
    showLogoutDialog.value = true
}

// Provide logout function to all children (used by GameSidebar in various layouts)
provide('requestLogout', handleLogoutRequest)

async function confirmLogout() {
    await client.auth.signOut()
    showLogoutDialog.value = false
    router.push('/login')
}
</script>

<style>
/* Global styles can go here or in assets/css/main.css */
.app-root {
  min-height: 100vh;
}
</style>
