<script setup lang="ts">
import { player , strawbsMax } from './player.ts'
import Button_with_waiting from './Button_with_waiting.vue'
import Header from './Header.vue'
import { computed } from 'vue'

import { useTemplateRef } from 'vue'

const upgrades1Dialog = useTemplateRef('upgrades1Dialog')
const upgrades2Dialog = useTemplateRef('upgrades2Dialog')

const canPick = computed (()  => {
  return player.strawberries < strawbsMax.value
})
const strawbsPerPick = computed(() => 1 + player.upgrades1.strawbCountPerPick
+ 3 * player.upgrades2.strawbCountPerPick
)
function pick() {
  player.strawberries = Math.min(player.strawberries + strawbsPerPick.value, strawbsMax.value)
}

const speedupForTesting = 1 // change to speed up for testing

const maxCountPerPickUpgrades1 = 5
const upgradeCountPerPickCost1 = computed(() => 5 + 2 * player.upgrades1.strawbCountPerPick
)

const maxStrawbStorageUpgrades1 = 2
const upgradeStrawbStorageCost1 = computed(() => 5 + 5 * player.upgrades1.strawbStorage)

const unlockUpgrades2Cost = 30

const maxCountPerPickUpgrades2 = 5
const upgradeCountPerPickCost2 = computed(() => 15 + 10 * player.upgrades2.strawbCountPerPick)

const maxStrawbStorageUpgrades2 = 2
const upgradeStrawbStorageCost2 = computed(() => 10 + 15 * player.upgrades2.strawbStorage)

const maxStrawbRateUpgrades2 = 2
const upgradeStrawbRateCost2 = computed(() => 20 + 20 * player.upgrades2.strawbRate)

const maxStrawbSatiation2 = 3
const upgradeStrawbSatiationCost2 = 80

</script>

<template>
  <div class="app-container bg-pink-900 bg">
    <Header></Header>
    <dialog open>
      <p>
        You wake up in an abandoned field, the sun beating down on your back. As you rub your eyes,
        you realize with a start that you have no memory of who you are or how you got here. As you
        try to sit up, a sharp pain shoots through your side, causing you to gasp and fall back
        down. You notice a deep gash on your side, still fresh and bleeding. You are alone, injured,
        and completely vulnerable in this desolate place.
      </p>

      <p>
        A nearby bush of ripe strawberries catches your eye, offering a glimmer of hope for
        survival.
      </p>

      <form method="dialog">
        <button>Continue</button>
      </form>
    </dialog>
    <div class="upgrades-container">
      <Button_with_waiting
        :buttonText="`Pick Strawb (+${strawbsPerPick} 🍓)`"
        buttonSubtext="Nab a ripe and juicy strawberry right off the bush!"
        :enabled="canPick"
        :intervalMillis="2000 / (1 + player.upgrades2.strawbRate * 0.25) / speedupForTesting"
        :onFinish="pick"
      />
      <Button_with_waiting
        v-if="!player.upgrades1.unlocked"
        :buttonText="`Eat Strawbs - Cost: 5 🍓`"
        buttonSubtext="Eat some delicious strawberries to recover some energy!"
        :intervalMillis="2000 / speedupForTesting"
        :enabled="player.strawberries >= 5"
        :onStart="
          function () {
            player.strawberries -= 5
          }
        "
        :onFinish="
          function () {
            player.upgrades1.unlocked = true;
            upgrades1Dialog?.showModal();
          }
        "
      />
    <dialog ref="upgrades1Dialog">
      <p>
        As you consume the strawberries, a warmth spreads through your body, easing the pain from
        your injury. You feel a renewed sense of strength and clarity, as if the fruit has unlocked
        something within you.  
      </p>

      <p>
        Still, you are aware of the dangers that could lurk in this abandoned field. 
        You need to fix your injury and gather more resources if you hope to survive.
      </p>

      <form method="dialog">
        <button>Continue</button>
      </form>
    </dialog>
    <div v-if="player.upgrades1.unlocked" class="upgrades1-container">
      <Button_with_waiting
        v-if="
          player.upgrades1.strawbCountPerPick < maxCountPerPickUpgrades1
        "
        :buttonText="`Practice Dexterity (Level ${player.upgrades1.strawbCountPerPick} / ${maxCountPerPickUpgrades1}) - Cost: ${upgradeCountPerPickCost1} 🍓`"
        buttonSubtext="Practice your picking skills to gather more strawberries each time!"
        :intervalMillis="2000 / speedupForTesting"
        :enabled="
    player.upgrades1.strawbCountPerPick < maxCountPerPickUpgrades1 &&
    player.strawberries >= upgradeCountPerPickCost1"
        :onStart="
          function () {
            player.strawberries -= upgradeCountPerPickCost1
          }
        "
        :onFinish=" () => {if (player.upgrades1.strawbCountPerPick >= maxCountPerPickUpgrades1) return
  player.upgrades1.strawbCountPerPick++}"
      />
      <Button_with_waiting
        v-if="
          player.upgrades1.strawbStorage < maxStrawbStorageUpgrades1
        "
        :buttonText="`Dig a hole (Level ${player.upgrades1.strawbStorage} / ${maxStrawbStorageUpgrades1}) - Cost: ${upgradeStrawbStorageCost1} 🍓`"
        buttonSubtext="Increase your strawberry storage capacity by digging a hole to stash more!"
        :intervalMillis="2000 / speedupForTesting"
        :enabled="
    player.upgrades1.strawbStorage < maxStrawbStorageUpgrades1 &&
    player.strawberries >= upgradeStrawbStorageCost1"
        :onStart="
          function () {
            player.strawberries -= upgradeStrawbStorageCost1
          }
        "
        :onFinish="() =>  {if (player.upgrades1.strawbStorage >= maxStrawbStorageUpgrades1) return
  player.upgrades1.strawbStorage++}"
      />
      <Button_with_waiting
        v-if="!player.upgrades2.unlocked"
        :buttonText="`First Aid  - Cost: ${unlockUpgrades2Cost} 🍓`"
        buttonSubtext="Apply a makeshift strawberry poultice to your wound to stop the bleeding!"
        :intervalMillis="2000 / speedupForTesting"
        :enabled="player.strawberries >= unlockUpgrades2Cost"
        :onStart="
          function () {
            player.strawberries -= unlockUpgrades2Cost
          }
        "
        :onFinish="
          function () {
            player.upgrades2.unlocked = true;
            upgrades2Dialog?.showModal();
          }
        "
      />
    </div>
    <dialog ref="upgrades2Dialog">
      <p>
        The poultice made from crushed strawberries works wonders on your wound. 
        The bleeding stops, and the pain subsides to a dull ache.
        With your injury tended to, you can now focus on gathering resources and preparing for the challenges ahead.
      </p>

      <p>
        Your next order of business is to build a shelter. Thankfully, 
        there's some nearby brushwood that you can use. But you're 
       going to need a lot of energy to do it!
      </p>

      <form method="dialog">
        <button>Continue</button>
      </form>
    </dialog>
    <div v-if="player.upgrades2.unlocked" class="upgrades2-container">

      <Button_with_waiting
        v-if="
          player.upgrades2.strawbCountPerPick < maxCountPerPickUpgrades2
        "
        :buttonText="`Engage Multitasking (Level ${player.upgrades2.strawbCountPerPick} / ${maxCountPerPickUpgrades2}) - Cost: ${upgradeCountPerPickCost2} 🍓`"
        buttonSubtext="Make full use of all your limbs to pick more strawberries!"
        :intervalMillis="3000 / speedupForTesting"
        :enabled="
    player.upgrades2.strawbCountPerPick < maxCountPerPickUpgrades2 &&
    player.strawberries >= upgradeCountPerPickCost2"
        :onStart="
          function () {
            player.strawberries -= upgradeCountPerPickCost2
          }
        "
        :onFinish=" () => 
{  if (player.upgrades2.strawbCountPerPick >= maxCountPerPickUpgrades2) return
  player.upgrades2.strawbCountPerPick++}"
      />
      <Button_with_waiting
        v-if="
          player.upgrades2.strawbStorage < maxStrawbStorageUpgrades2
        "
        :buttonText="`Build Strawberry Storage (Level ${player.upgrades2.strawbStorage} / ${maxStrawbStorageUpgrades2}) - Cost: ${upgradeStrawbStorageCost2} 🍓`"
        buttonSubtext="Build a small storage shed to store your strawberries! (It's made of strawberries, so it attracts birds...)"
        :intervalMillis="3000 / speedupForTesting"
        :enabled="
    player.upgrades2.strawbStorage < maxStrawbStorageUpgrades2 &&
    player.strawberries >= upgradeStrawbStorageCost2"
        :onStart="
          function () {
            player.strawberries -= upgradeStrawbStorageCost2
          }
        "
        :onFinish="
        () => 
  {if (player.upgrades2.strawbStorage >= maxStrawbStorageUpgrades2) return
  player.upgrades2.strawbStorage++}"
        ></Button_with_waiting>


    <Button_with_waiting
        v-if="
          player.upgrades2.strawbRate < maxStrawbRateUpgrades2
        "
        :buttonText="`Optimize Picking Rhythm (Level ${player.upgrades2.strawbRate} / ${maxStrawbRateUpgrades2}) - Cost: ${upgradeStrawbRateCost2} 🍓`"
        buttonSubtext="Find the perfect rhythm to pick strawberries faster!"
        :intervalMillis="3000 / speedupForTesting"
        :enabled="player.upgrades2.strawbRate < maxStrawbRateUpgrades2 && player.strawberries >= upgradeStrawbRateCost2"
       :onStart="
          function () {
            player.strawberries -= upgradeStrawbRateCost2
          }
        "
        :onFinish="
        () => {if (player.upgrades2.strawbRate >= maxStrawbRateUpgrades2) return
          ; 
          player.upgrades2.strawbRate++
        }"
></Button_with_waiting>
      <Button_with_waiting
        v-if="player.upgrades2.strawbSatiation < maxStrawbSatiation2"
        :buttonText="`Devour Strawbs (Level ${player.upgrades2.strawbSatiation} / ${maxStrawbSatiation2}) - Cost: ${upgradeStrawbSatiationCost2} 🍓`"
        buttonSubtext="Satiate your hunger to regain your energy."
        :intervalMillis="5000 / speedupForTesting"
        :enabled="player.strawberries >= upgradeStrawbSatiationCost2"
        :onStart="
          function () {
            player.strawberries -= upgradeStrawbSatiationCost2
          }
        "
        :onFinish="
          function () {
          player.upgrades2.strawbSatiation++;
          if (player.upgrades2.strawbSatiation >= maxStrawbSatiation2) 
          player.upgrades3.unlocked = true;
          }
        "
      />
</div>

  </div>
  </div>
</template>

<style scoped></style>
