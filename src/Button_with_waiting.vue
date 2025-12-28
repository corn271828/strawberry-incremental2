<script setup>
import { onUpdated, ref } from 'vue'
const props = defineProps({
  buttonText: String,
  barText: String,
  intervalMillis: Number,
  onFinish: {
    type: Function,
    required: true,
  },
})

import ProgressBar from 'primevue/progressbar'

const isActive = ref(false)
const lastClicked = ref(null)
function onClick() {
  lastClicked.value = Date.now()
  isActive.value = true
  setTimeout(() => {
    isActive.value = false
    props.onFinish()
  }, props.intervalMillis)
}
</script>

<template>
  <button @click="onClick" :disabled="isActive">
    {{ props.buttonText }}
    <ProgressBar
      :value="isActive ? 100 : 0"
      :pt:value:style="{
        'transition-duration': props.intervalMillis / 1000 + 's',
        'transition-timing-function': isActive ? 'linear' : 'steps(1, jump-start)',
      }"
    >
      {{ props.barText }}
    </ProgressBar>
  </button>
</template>
<style scoped></style>
