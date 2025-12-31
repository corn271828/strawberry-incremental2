<script setup lang="ts">
import { ref, computed } from 'vue'
const props = defineProps({
  buttonText: String,
  buttonSubtext: String,
  barText: String,
  intervalMillis: {
    type: Number,
    required: true,
  },
  enabled: {
    type: Boolean,
    required: false,
    default: true,
  },
  onStart: {
    type: Function,
    required: false,
  },
  onFinish: {
    type: Function,
    required: true,
  },
})

const speedupForTesting = 5 // change to speed up for testing

const isInProgress = ref(false)
const lastClicked = ref(0)
function onClick() {
  lastClicked.value = Date.now()
  isInProgress.value = true
  props.onStart?.()
  setTimeout(() => {
    isInProgress.value = false
    props.onFinish()
  }, props.intervalMillis / speedupForTesting)
}

const progressBarStyle = computed(() => {
  return {
    'transition-duration': props.intervalMillis / speedupForTesting + 'ms',
    'transition-timing-function': isInProgress.value ? 'linear' : 'steps(1, jump-start)',
    width: isInProgress.value ? '100%' : '0%',
    height: '20px',
    'background-color': 'var(--pink)',
  }
})
</script>

<template>
  <button @click="onClick" :disabled="isInProgress || !props.enabled">
    <h3 style="font-weight: bold">{{ props.buttonText }}</h3>
    <p>{{ props.buttonSubtext }}</p>
    <div class="progress" style="width: 100%">
      <div class="bar" :style="progressBarStyle"></div>
    </div>
  </button>
</template>

<style>
button {
  width: 100%;
  background-color: var(--black-soft);
  min-height: 60px;
  margin: 5px;

  &:disabled {
    background-color: var(--black);
  }
}
</style>
