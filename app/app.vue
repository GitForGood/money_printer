
<template>
  <div class="app-root">
    <!-- Unauthenticated View: Welcome Screen -->
    <NuxtLayout name="auth" v-if="!isLoggedIn">
      <div class="welcome-content">
        <p class="tagline">
          > A realistic simulation of extreme wealth accumulation.<br>
          > Acquire Assets. Leverage Debt. Avoid Taxes.<br>
          > Number Go Up.
        </p>

        <AsciiDivider />

        <div class="actions">
          <EmphasizedButton @click="handleLogin" class="w-full justify-center">
            LOGIN
          </EmphasizedButton>
          <BracketedButton @click="handleLogin" class="w-full justify-center">
            REGISTER
          </BracketedButton>
        </div>

        <div class="footer-note">
          <p>System Status: ONLINE</p>
          <p>v0.1.0-alpha</p>
        </div>
      </div>
    </NuxtLayout>

    <!-- Authenticated View: Game Pages -->
    <div v-else class="authenticated-view">
        <NuxtPage />
        
        <!-- Global Logout Dialog -->
        <TerminalDialog
            v-model:isOpen="showLogoutDialog"
            title="TERMINATE SESSION?"
            message="You are about to disconnect from the secure terminal. Unsaved protocols will be lost. Are you sure you want to proceed?"
            @confirm="confirmLogout"
        />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(false)
const showLogoutDialog = ref(false)

// Provide logout function to children (Sidebar)
provide('requestLogout', () => {
    showLogoutDialog.value = true
})

function handleLogin() {
  console.log('Simulating login sequence...')
  isLoggedIn.value = true
  router.push('/')
}

function confirmLogout() {
  isLoggedIn.value = false
  router.push('/')
}
</script>

<style scoped>
.tagline {
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  color: var(--text-color);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
  width: 100%;
}

.footer-note {
  font-size: 0.8rem;
  color: var(--text-color-variant);
  margin-top: 2rem;
  text-align: center;
}

.w-full { width: 100%; }
.justify-center { justify-content: center; }
</style>
