<script setup lang="ts">
import { player } from './player.ts'
</script>

<template>
  <div class="header">
    <span> {{ player.strawberries }} </span>
    <img src="./assets/strawb.png" alt="Strawberry" class="strawberry-icon" />
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  border: 1px solid #ffffff;
  background-color: #fe8787;
  width: fit-content;
}

.strawberry-icon {
  width: 16px;
  height: 16px;
  margin-left: 8px;
}
</style>
