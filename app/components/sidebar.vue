<template>
  <div class="fixed inset-0 z-50 pointer-events-none overflow-hidden">
    <!-- Backdrop -->
      <div 
        v-if="isOpen"
        class="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-auto"
        @click="close"
      />

    <!-- Sidebar Panel -->
      <div 
        v-if="isOpen"
        ref="target"
        class="absolute right-0 top-0 h-full bg-white shadow-2xl flex flex-col pointer-events-auto w-full md:w-[480px] xl:w-[600px] border-l border-gray-100"
      >
        <!-- Top Bar -->
        <div class="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0 bg-white/80 backdrop-blur">
          <h2 class="text-xl font-bold font-mono tracking-tight uppercase">{{ title }}</h2>
          <bracketed-button @click="close">CLOSE</bracketed-button>
        </div>

        <!-- Content Area -->
        <div class="flex-1 overflow-y-auto p-6">
          <component :is="view" v-bind="data" v-if="view" />
          <slot v-else>
            <!-- Default slot content if no dynamic view is set -->
            <div class="text-gray-400 text-center mt-10 font-mono text-sm">
              [NO SIGNAL]
            </div>
          </slot>
        </div>
      </div>
    </div>
</template>

<script lang="ts" setup>
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const { isOpen, close, view, title, data } = useSidebar()
const target = ref(null)

const { activate, deactivate } = useFocusTrap(target)

watch(isOpen, async (val) => {
  if (val) {
    await nextTick()
    activate()
  } else {
    deactivate()
  }
})

onKeyStroke('Escape', (e) => {
  if (isOpen.value) {
    e.preventDefault()
    close()
  }
})
</script>

<style scoped>
/* Ensure the sidebar is above everything */
</style>