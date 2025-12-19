<template>
  <NuxtLayout name="auth">
    <div class="login-page">
      <div class="welcome-content">
        <p class="tagline">
          > AUTHENTICATION REQUIRED<br>
          > ENTER CREDENTIALS TO ACCESS TERMINAL
        </p>

        <AsciiDivider />

        <form @submit.prevent="handleEmailLogin" class="login-form">
          <TerminalInput
            v-model="email"
            label="EMAIL IDENTITY"
            type="email"
            placeholder="trader@market.cap"
            :error="errors.email"
          />
          
          <TerminalInput
            v-model="password"
            label="ACCESS CODE"
            type="password"
            placeholder="********"
            :error="errors.password"
          />

          <div class="actions">
             <EmphasizedButton type="submit" class="w-full justify-center" :disabled="isLoading">
              {{ isLoading ? 'CONNECTING...' : 'INITIATE SESSION' }}
            </EmphasizedButton>
          </div>
        </form>
        <!-- OAuth disabled for now -->
        <!--
        <div class="alt-methods">
            <p class="separator">- OR CONNECT VIA -</p>
            <div class="provider-buttons">
                <BracketedButton @click="handleOAuth('github')" class="w-full justify-center opacity-50" title="Module Offline">
                    GITHUB
                </BracketedButton>
                <BracketedButton @click="handleOAuth('google')" class="w-full justify-center opacity-50" title="Module Offline">
                    GOOGLE
                </BracketedButton>
            </div>
        </div>
        -->

        <div class="register-link">
            <p>NEW USER?</p>
            <ActionLink to="/register" class="text-sm">CREATE IDENTITY</ActionLink>
        </div>

        <div class="footer-note">
          <p>System Status: ONLINE</p>
          <p>v0.1.0-alpha</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'

const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errors = reactive({
    email: '',
    password: ''
})

// Watch user to redirect if they become logged in
watchEffect(() => {
  if (user.value) {
    router.push('/')
  }
})

async function handleEmailLogin() {
    errors.email = ''
    errors.password = ''
    
    if (!email.value) {
        errors.email = 'IDENTITY REQUIRED'
        return
    }
    if (!password.value) {
        errors.password = 'ACCESS CODE REQUIRED'
        return
    }

    isLoading.value = true
    try {
        const { error } = await client.auth.signInWithPassword({
            email: email.value,
            password: password.value
        })
        
        if (error) {
            console.error(error)
            errors.password = 'AUTHENTICATION FAILED: INVALID CREDENTIALS'
        }
    } catch (e) {
        errors.password = 'SYSTEM ERROR: CONNECTION FAILED'
    } finally {
        isLoading.value = false
    }
}

async function handleOAuth(provider: string) {
  // OAuth temporarily disabled - User focusing on Email Auth
  alert(`Provider module '${provider.toUpperCase()}' is currently offline. using EMAIL protocol only.`)
  return
}
</script>

<style scoped>
.tagline {
  font-family: 'Courier New', Courier, monospace;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  color: var(--text-color);
  font-weight: bold;
}

.login-form {
    margin: 1.5rem 0;
}

.actions {
  margin-top: 1rem;
}

.alt-methods {
    margin-top: 2rem;
    text-align: center;
}

.separator {
    font-size: 0.8rem;
    color: var(--text-color-variant);
    margin-bottom: 1rem;
}

.provider-buttons {
    display: flex;
    gap: 1rem;
}

.register-link {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    font-size: 0.9rem;
}

.footer-note {
  font-size: 0.8rem;
  color: var(--text-color-variant);
  margin-top: 2rem;
  text-align: center;
}

.w-full { width: 100%; }
.justify-center { justify-content: center; }
.opacity-50 { opacity: 0.5; }
.text-sm { font-size: 0.8rem; }
</style>

