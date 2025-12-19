<script setup lang="ts">
const user = useSupabaseUser()
const client = useSupabaseClient()

onMounted(() => {
  console.log('Supabase Client:', client)
  console.log('Supabase User:', user.value)
})
</script>

<template>
  <div class="p-4 border rounded bg-gray-50">
    <h3 class="font-bold">Supabase Status</h3>
    <p v-if="client">Client initialized ✅</p>
    <p v-else>Client NOT initialized ❌</p>
    <p>User: {{ user ? user.email : 'Not logged in' }}</p>
  </div>
</template>
