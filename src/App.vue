<script setup lang="ts">
import { player, Resource, maxResource } from './player.ts'
import Button_with_waiting from './Button_with_waiting.vue'
import Header from './Header.vue'
import { computed, useTemplateRef } from 'vue'

import Upgrade_Button from './Upgrade_Button.vue'

const upgrades1Dialog = useTemplateRef('upgrades1Dialog')
const upgrades2Dialog = useTemplateRef('upgrades2Dialog')

const canPick = computed(() => {
  return player.strawberries < maxResource(Resource.STRAWBERRY)
})
const strawbsPerPick = computed(
  () => 1 + player.upgrades1.strawbCountPerPick + 2 * player.upgrades2.strawbCountPerPick,
)
function pick() {
  player.strawberries = Math.min(
    player.strawberries + strawbsPerPick.value,
    maxResource(Resource.STRAWBERRY),
  )
}

const canChop = computed(() => {
  return player.wood < maxResource(Resource.WOOD)
})
const woodPerChop = computed(() => 1)
function chop() {
  player.wood = Math.min(player.wood + woodPerChop.value, maxResource(Resource.WOOD))
}
</script>

<template>
  <div class="app-container bg-pink-900 bg">
    <Header></Header>
    <dialog v-if="!player.initDialogSeen" open>
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
        <button
          @click="
            () => {
              player.initDialogSeen = true
            }
          "
        >
          Continue
        </button>
      </form>
    </dialog>
    <div class="upgrades-container">
      <Button_with_waiting
        :buttonText="`Pick Strawb (+${strawbsPerPick} ${Resource.STRAWBERRY})`"
        buttonSubtext="Nab ripe and juicy strawberries right off the bush!"
        :enabled="canPick"
        :intervalMillis="2000 / (1 + player.upgrades2.strawbRate * 0.25)"
        :onFinish="pick"
      />
      <Upgrade_Button
        :showCondition="true"
        :resource="Resource.STRAWBERRY"
        :cost="5"
        :currentUpgrade="player.upgrades1.unlocked ? 1 : 0"
        :maxUpgrades="1"
        buttonTitle="Eat Strawbs"
        buttonSubtext="Eat some delicious strawberries to recover some energy!"
        :intervalSecs="2"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades1.unlocked = true
            upgrades1Dialog?.showModal()
          }
        "
      />
      <dialog ref="upgrades1Dialog">
        <p>
          As you consume the strawberries, a warmth spreads through your body, easing the pain from
          your injury. You feel a renewed sense of strength and clarity, as if the fruit has
          unlocked something within you.
        </p>

        <p>
          Still, you are aware of the dangers that could lurk in this abandoned field. You need to
          fix your injury and gather more resources if you hope to survive.
        </p>

        <form method="dialog">
          <button>Continue</button>
        </form>
      </dialog>
      <Upgrade_Button
        :showCondition="player.upgrades1.unlocked"
        :resource="Resource.STRAWBERRY"
        :cost="5 + 2 * player.upgrades1.strawbCountPerPick"
        :currentUpgrade="player.upgrades1.strawbCountPerPick"
        :maxUpgrades="5"
        buttonTitle="Practice Dexterity"
        buttonSubtext="Practice your picking skills to gather more strawberries each time!"
        :intervalSecs="2"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades1.strawbCountPerPick++
          }
        "
      />
      <Upgrade_Button
        :showCondition="player.upgrades1.unlocked"
        :resource="Resource.STRAWBERRY"
        :cost="5 + 5 * player.upgrades1.strawbStorage"
        :currentUpgrade="player.upgrades1.strawbStorage"
        :maxUpgrades="2"
        buttonTitle="Dig a hole"
        buttonSubtext="Increase your strawberry storage capacity by digging a hole to stash more!"
        :intervalSecs="2"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades1.strawbStorage++
          }
        "
      />
      <Upgrade_Button
        :showCondition="player.upgrades1.unlocked"
        :resource="Resource.STRAWBERRY"
        :cost="30"
        :currentUpgrade="player.upgrades2.unlocked ? 1 : 0"
        :maxUpgrades="1"
        buttonTitle="First Aid"
        buttonSubtext="Apply a makeshift strawberry poultice to your wound to stop the bleeding!"
        :intervalSecs="5"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades2.unlocked = true
            upgrades2Dialog?.showModal()
          }
        "
      />
      <dialog ref="upgrades2Dialog">
        <p>
          The poultice made from crushed strawberries works wonders on your wound. The bleeding
          stops, and the pain subsides to a dull ache. With your injury tended to, you can now focus
          on gathering resources and preparing for the challenges ahead.
        </p>

        <p>
          Your next order of business is to build a shelter. Thankfully, there's some nearby
          brushwood that you can use. But you're going to need a lot of energy to do it!
        </p>

        <form method="dialog">
          <button>Continue</button>
        </form>
      </dialog>
      <Upgrade_Button
        :showCondition="player.upgrades2.unlocked"
        :resource="Resource.STRAWBERRY"
        :cost="15 + 10 * player.upgrades2.strawbCountPerPick"
        :currentUpgrade="player.upgrades2.strawbCountPerPick"
        :maxUpgrades="5"
        buttonTitle="Engage Multitasking"
        buttonSubtext="Make full use of all your limbs to pick more strawberries!"
        :intervalSecs="3"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades2.strawbCountPerPick++
          }
        "
      />
      <Upgrade_Button
        :showCondition="player.upgrades2.unlocked"
        :resource="Resource.STRAWBERRY"
        :cost="10 + 15 * player.upgrades2.strawbStorage"
        :currentUpgrade="player.upgrades2.strawbStorage"
        :maxUpgrades="2"
        buttonTitle="Build Strawberry Storage"
        buttonSubtext="Build a small storage shed to store your strawberries! (It's made of strawberries, so it attracts birds...)"
        :intervalSecs="3"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades2.strawbStorage++
          }
        "
      />
      <Upgrade_Button
        :showCondition="player.upgrades2.unlocked"
        :resource="Resource.STRAWBERRY"
        :cost="20 + 20 * player.upgrades2.strawbRate"
        :currentUpgrade="player.upgrades2.strawbRate"
        :maxUpgrades="2"
        buttonTitle="Optimize Picking Rhythm"
        buttonSubtext="Find the perfect rhythm to pick strawberries faster!"
        :intervalSecs="3"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades2.strawbRate++
          }
        "
      />
      <Upgrade_Button
        :showCondition="player.upgrades2.unlocked"
        :resource="Resource.STRAWBERRY"
        :cost="80"
        :currentUpgrade="player.upgrades2.strawbSatiation"
        :maxUpgrades="2"
        buttonTitle="Devour Strawbs"
        buttonSubtext="Satiate your hunger to regain your energy!"
        :intervalSecs="5"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades2.strawbSatiation++
            if (player.upgrades2.strawbSatiation >= 2) player.upgrades3.unlocked = true
          }
        "
      />
      <Button_with_waiting
        v-if="player.upgrades3.unlocked"
        :buttonText="`Gather wood (+${woodPerChop} ${Resource.WOOD})`"
        buttonSubtext="Chop some nearby brushwood to gather fine, dry wood!"
        :enabled="canChop"
        :intervalMillis="3000"
        :onFinish="chop"
      />
    </div>
  </div>
</template>

<style scoped></style>
