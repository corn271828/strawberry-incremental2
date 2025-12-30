<script setup lang="ts">
import { player, strawbsMax } from './player.ts'
import { computed } from 'vue'

const progressBarStyle = computed(() => {
  return {
    width: (player.strawberries / strawbsMax.value) * 100 + '%',
    height: '20px',
    'background-color': 'var(--pink)',
  }
})
</script>

<template>
  <div class="header">
    <div>🍓 : {{ player.strawberries }} / {{ strawbsMax }}</div>
    <div class="progress" style="width: 100%">
      <div class="bar" :style="progressBarStyle"></div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  border: 1px solid #ffffff;
  background-color: var(--rose-900);
  width: fit-content;
}

.strawberry-icon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
}
</style>
