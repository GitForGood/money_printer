<template>
  <Teleport to="body">
    <div v-if="isOpen" class="dialog-overlay" @click="handleOverlayClick">
      <div class="dialog-container" @click.stop ref="dialogContainer">
        <TerminalPanel :title="title">
          <div class="dialog-content">
            <p v-if="message" class="dialog-message">
              {{ message }}
            </p>
            <slot></slot>
            
            <AsciiDivider />
            
            <div class="dialog-actions">
              <BracketedButton ref="abortBtnRef" @click="handleCancel">ABORT</BracketedButton>
              <EmphasizedButton @click="handleConfirm">PROCEED</EmphasizedButton>
            </div>
          </div>
        </TerminalPanel>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'CONFIRMATION REQUIRED',
  },
  message: {
    type: String,
    default: '',
  },
  closeOnOverlay: {
      type: Boolean,
      default: true
  }
})

const emit = defineEmits(['update:isOpen', 'confirm', 'cancel'])

const dialogContainer = ref(null)
const abortBtnRef = ref<any>(null)

const { activate, deactivate } = useFocusTrap(dialogContainer, {
  immediate: false,
  allowOutsideClick: true, // we handle overlay click manually
})

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    await nextTick()
    activate()
    // Explicitly focus Abort button for safety
    const el = abortBtnRef.value?.$el || abortBtnRef.value
    if (el && el.focus) {
        el.focus()
    }
  } else {
    deactivate()
  }
})

function handleCancel() {
  emit('cancel')
  emit('update:isOpen', false)
}

function handleConfirm() {
  emit('confirm')
  emit('update:isOpen', false)
}

function handleOverlayClick() {
    if (props.closeOnOverlay) {
        handleCancel()
    }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.dialog-container {
  width: 90%;
  max-width: 500px;
  /* Terminal Panel handles the visual border/bg */
}

.dialog-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dialog-message {
  font-family: 'Courier New', Courier, monospace;
  color: var(--text-color);
  line-height: 1.5;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 8px;
}
</style>
