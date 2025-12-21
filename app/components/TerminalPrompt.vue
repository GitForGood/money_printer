<template>
  <Teleport to="body">
    <div v-if="isOpen" class="dialog-overlay" @click="handleOverlayClick">
      <div class="dialog-container" @click.stop ref="dialogContainer">
        <TerminalPanel :title="title">
          <div class="dialog-content">
            <p v-if="message" class="dialog-message">
              {{ message }}
            </p>
            
            <div class="input-wrapper">
              <TerminalInput
                v-model="inputValue"
                :label="inputLabel"
                :placeholder="inputPlaceholder"
                :type="inputType"
                @keyup.enter="handleConfirm"
              />
            </div>
            
            <AsciiDivider />
            
            <div class="dialog-actions">
              <ActionButton ref="abortBtnRef" @click="handleCancel">ABORT</ActionButton>
              <EmphasizedButton @click="handleConfirm">PROCEED</EmphasizedButton>
            </div>
          </div>
        </TerminalPanel>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick } from 'vue'
import { useFocusTrap } from '@vueuse/integrations/useFocusTrap'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'INPUT REQUIRED',
  },
  message: {
    type: String,
    default: '',
  },
  inputLabel: {
    type: String,
    default: 'VALUE',
  },
  inputPlaceholder: {
    type: String,
    default: '',
  },
  inputType: {
    type: String,
    default: 'text',
  },
  initialValue: {
    type: [String, Number],
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
const inputValue = ref(props.initialValue)

const { activate, deactivate } = useFocusTrap(dialogContainer, {
  immediate: false,
  allowOutsideClick: true,
})

watch(() => props.isOpen, async (newVal) => {
  if (newVal) {
    inputValue.value = props.initialValue
    await nextTick()
    activate()
    // Focus the input instead of abort button for prompts
    const inputEl = dialogContainer.value ? (dialogContainer.value as HTMLElement).querySelector('input') : null
    if (inputEl) {
        (inputEl as HTMLInputElement).focus()
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
  emit('confirm', inputValue.value)
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

.input-wrapper {
    margin: 8px 0;
}

.dialog-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 8px;
}
</style>
