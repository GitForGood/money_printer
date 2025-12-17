<template>
  <div class="flex justify-center h-screen">
    <!--
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    -->

    <bracketed-button @click="openBuyMenu">BUY</bracketed-button>
    <bracketed-button>SELL</bracketed-button>
    <bracketed-button @click="watch">{{ watched ? 'HIDE' : 'SHOW'}}</bracketed-button>
    
    <sidebar />
    <bracketed-button>SELL</bracketed-button>
  </div>
</template>

<script lang="ts" setup>
  const watched = ref(false)
  const { open } = useSidebar()

  function watch() {
    watched.value = !watched.value
  }

  function openBuyMenu() {
    open(null, 'Buy Money')
  }
</script>