<template>
  <NuxtLayout name="auth">
    <div class="confirm-page">
      <div class="welcome-content">
        <p class="tagline">
          > RESOLVING IDENTITY PROTOCOL...<br>
          > SYNCING WITH DATABASE
        </p>
        <AsciiDivider />
        <div class="loader">
          [<span class="pulse">##########</span>]
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const user = useSupabaseUser()
const router = useRouter()

// Watch user to redirect once session is established
watch(user, (user) => {
  if (user) {
    router.push('/')
  }
}, { immediate: true })
</script>

<style scoped>
.confirm-page {
  text-align: center;
}

.tagline {
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  color: var(--text-color);
  font-weight: bold;
}

.loader {
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.2rem;
  margin-top: 2rem;
}

.pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
}
</style>
