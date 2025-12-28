<script setup lang="ts">
import { player } from './player.ts'
import Button_with_waiting from './Button_with_waiting.vue'
import Header from './Header.vue'
import { computed } from 'vue'

const strawbsPerPick = computed(() => 1 + player.upgrades1.strawbCountPerPick)
function pick() {
  player.strawberries += strawbsPerPick.value
}

const maxCountPerPickUpgrades1 = 5
const upgradeCountPerPickCost = computed(() => 5 + 2 * player.upgrades1.strawbCountPerPick)

const canUpgradeCountPerPick1 = computed(() => {
  return player.upgrades1.strawbCountPerPick < maxCountPerPickUpgrades1 &&
         player.strawberries >= upgradeCountPerPickCost.value
})

function upgradeCountPerPick1() {
  if (player.upgrades1.strawbCountPerPick >= maxCountPerPickUpgrades1) return
  player.upgrades1.strawbCountPerPick++
}
</script>

<template>
  <div class="app-container bg-pink-900 bg">
    <Header></Header>
    <div class="upgrades-container">
    <Button_with_waiting
      :buttonText="`Pick Strawb (+${strawbsPerPick} 🍓)`"
      buttonSubtext="Nab a ripe and juicy strawberry right off the bush!"
      :intervalMillis="1000"
      :onFinish="pick"
    />
    <Button_with_waiting
    v-if="!player.upgrades1.unlocked"
      :buttonText="`Consume Strawbs - Cost: 5 🍓`"
      buttonSubtext="Eat some delicious strawberries to recover some energy. Unlocks new upgrades!"
      :intervalMillis="2000"
      :enabled="player.strawberries >= 5"
      :onStart="function () { player.strawberries -= 5 }"
      :onFinish="function () {player.upgrades1.unlocked = true}"
    />
    <Button_with_waiting
    v-if="player.upgrades1.unlocked && player.upgrades1.strawbCountPerPick < maxCountPerPickUpgrades1"
      :buttonText="`Improve Dexterity (Level ${player.upgrades1.strawbCountPerPick} / ${maxCountPerPickUpgrades1}) - Cost: ${upgradeCountPerPickCost} 🍓`"
      buttonSubtext="Practice your picking skills to gather more strawberries each time!"
      :intervalMillis="2000"
      :enabled="canUpgradeCountPerPick1"
      :onStart="function () { player.strawberries -= upgradeCountPerPickCost }"
      :onFinish="upgradeCountPerPick1"
    />
  </div>
  </div>
</template>

<style scoped>


</style>