<script setup lang="ts">
import { player } from './player.ts'
import Button_with_waiting from './Button_with_waiting.vue'
import Header from './Header.vue'
import { computed } from 'vue'

const strawbsPerPick = computed(() => 1 + player.strawbCountPerPickUpgrades1)
function pick() {
  player.strawberries += strawbsPerPick.value
  if (player.strawberries >= 5) player.upgradesUnlocked1 = true
}

const maxCountPerPickUpgrades1 = 5
const upgradeCountPerPickCost = computed(() => 5 + 2 * player.strawbCountPerPickUpgrades1)
function upgradeCountPerPick1() {
  if (player.strawbCountPerPickUpgrades1 >= maxCountPerPickUpgrades1) return
  if (player.strawberries < upgradeCountPerPickCost.value) return
  player.strawberries -= upgradeCountPerPickCost.value
  player.strawbCountPerPickUpgrades1++
}
</script>

<template>
  <div class="app-container bg-pink-900 bg">
    <Header></Header>
    <Button_with_waiting
      :buttonText="`Pick Strawb (+${strawbsPerPick})`"
      :intervalMillis="1000"
      :onFinish="pick"
    />

    <div>
      <div v-if="!player.upgradesUnlocked1">Pick 5 strawbs to unlock</div>
      <button
        v-else-if="player.strawbCountPerPickUpgrades1 < maxCountPerPickUpgrades1"
        @click="upgradeCountPerPick1"
        :disabled="upgradeCountPerPickCost > player.strawberries"
      >
        Pick more Strawbs per pick! Costs {{ upgradeCountPerPickCost }} strawbs
      </button>
    </div>
  </div>
</template>

<style scoped></style>
