<script setup lang="ts">
import { player } from './player.ts'
</script>

<template>
  <div class="header">
    <span> {{ player.strawberries }} 🍓 </span>
  </div>
</template>

<style scoped>
.header {
  display: flex;
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
