<template>
  <NuxtLink
    :to="to"
    class="bracketed-base emphasized-base"
    :class="{ disabled }"
    @click="handleClick"
  >
    <BaseBracketed><slot /></BaseBracketed>
  </NuxtLink>
</template>

<script setup lang="ts">
const props = defineProps<{
  to: string | object
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

function handleClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>
