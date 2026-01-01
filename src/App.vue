<script setup lang="ts">
import { player, Resource, maxResource } from './player.ts'
import Button_with_waiting from './Button_with_waiting.vue'
import Header from './Header.vue'
import { computed, useTemplateRef } from 'vue'

import Upgrade_Button from './Upgrade_Button.vue'

const upgrades1Dialog = useTemplateRef('upgrades1Dialog')
const upgrades2Dialog = useTemplateRef('upgrades2Dialog')
const upgrades3Dialog = useTemplateRef('upgrades3Dialog')
const upgrades4Dialog = useTemplateRef('upgrades4Dialog')

const canPick = computed(() => {
  return player.strawberries < maxResource(Resource.STRAWBERRY)
})
const strawbsPerPick = computed(
  () =>
    1 +
    player.upgrades1.strawbCountPerPick +
    2 * player.upgrades2.strawbCountPerPick +
    4 * player.upgrades3.strawbCountPerPick,
)
function pick() {
  player.strawberries = Math.min(
    player.strawberries + strawbsPerPick.value,
    maxResource(Resource.STRAWBERRY),
  )
}
function enableAutoPick() {
  setInterval(() => {
    if (canPick.value) {
      pick()
    }
  }, 1000)
}

const canChop = computed(() => {
  return player.wood < maxResource(Resource.WOOD)
})

const woodPerChop = computed(() => 1 + player.upgrades3.woodCountPerChop)

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
        ref="pickStrawbButton"
        :buttonText="`Pick Strawb (+${strawbsPerPick} ${Resource.STRAWBERRY})`"
        buttonSubtext="Nab ripe and juicy strawberries right off the bush!"
        :enabled="canPick"
        :intervalMillis="1500 / (1 + player.upgrades2.strawbRate * 0.25)"
        :onFinish="pick"
      />
      <Upgrade_Button
        :showCondition="true"
        :resource="[[Resource.STRAWBERRY, 5]]"
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
        :resource="[[Resource.STRAWBERRY, 5 + 2 * player.upgrades1.strawbCountPerPick]]"
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
        :resource="[[Resource.STRAWBERRY, 5 + 5 * player.upgrades1.strawbStorage]]"
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
        :resource="[[Resource.STRAWBERRY, 30]]"
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
          Your hunger is still sapping your energy though, so you should probably eat some more
          strawbs first.
        </p>

        <form method="dialog">
          <button>Continue</button>
        </form>
      </dialog>
      <Upgrade_Button
        :showCondition="player.upgrades2.unlocked"
        :resource="[[Resource.STRAWBERRY, 15 + 10 * player.upgrades2.strawbCountPerPick]]"
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
        :resource="[[Resource.STRAWBERRY, 10 + 15 * player.upgrades2.strawbStorage]]"
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
        :resource="[[Resource.STRAWBERRY, 20 + 20 * player.upgrades2.strawbRate]]"
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
        :resource="[[Resource.STRAWBERRY, 80]]"
        :currentUpgrade="player.upgrades2.strawbSatiation"
        :maxUpgrades="2"
        buttonTitle="Devour Strawbs"
        buttonSubtext="Satiate your hunger to regain your energy!"
        :intervalSecs="5"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades2.strawbSatiation++
            if (player.upgrades2.strawbSatiation >= 2) {
              player.upgrades3.unlocked = true
              upgrades3Dialog?.showModal()
            }
          }
        "
      />
      <dialog ref="upgrades3Dialog">
        <p>
          With your hunger finally sated, you feel a surge of vitality coursing through your veins.
          The world around you seems sharper, more vibrant. (Or something. Github Copilot helped
          write this, if you couldn't tell. )
        </p>

        <p>
          In any case, your next order of business is to build a shelter, lest the coming night
          catch you unprepared. Thankfully, there's plenty of brushwood around to help you get
          started!
        </p>
        <form method="dialog">
          <button>Continue</button>
        </form>
      </dialog>
      <Upgrade_Button
        :additionalDisableCondition="!canChop"
        :showCondition="player.upgrades3.unlocked"
        :resource="[[Resource.STRAWBERRY, 20]]"
        :currentUpgrade="0"
        :maxUpgrades="undefined"
        :buttonTitle="`Gather wood (+${woodPerChop} ${Resource.WOOD})`"
        buttonSubtext="Chop some nearby brushwood to gather fine, dry wood! Requires some energy."
        :intervalSecs="2"
        :onStart="undefined"
        :performUpgrade="chop"
      />
      <Upgrade_Button
        :showCondition="player.upgrades3.unlocked"
        :resource="[
          [Resource.STRAWBERRY, 40 + 30 * player.upgrades3.strawbCountPerPick],
          [Resource.WOOD, 5 + 5 * player.upgrades3.strawbCountPerPick],
        ]"
        :currentUpgrade="player.upgrades3.strawbCountPerPick"
        :maxUpgrades="5"
        buttonTitle="Wooden multi-arms"
        buttonSubtext="Craft extra wooden arms to help you pick even more strawberries!"
        :intervalSecs="5"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades3.strawbCountPerPick++
          }
        "
      />
      <Upgrade_Button
        :showCondition="player.upgrades3.unlocked"
        :resource="[
          [Resource.STRAWBERRY, 40 + 30 * player.upgrades3.storage],
          [Resource.WOOD, 4 + 4 * player.upgrades3.storage],
        ]"
        :currentUpgrade="player.upgrades3.storage"
        :maxUpgrades="3"
        buttonTitle="Storage shed"
        buttonSubtext="Upgrade your shed to store more strawberries and wood! Also makes it bird-proof"
        :intervalSecs="5"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades3.storage++
          }
        "
      />
      <Upgrade_Button
        :showCondition="player.upgrades3.unlocked"
        :resource="[
          [Resource.STRAWBERRY, 60 + 25 * player.upgrades3.woodCountPerChop],
          [Resource.WOOD, 3 + 3 * player.upgrades3.woodCountPerChop],
        ]"
        :currentUpgrade="player.upgrades3.woodCountPerChop"
        :maxUpgrades="5"
        buttonTitle="Strawberry Axe"
        buttonSubtext="Craft an axe out of strawberries to chop more wood per chop!"
        :intervalSecs="5"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades3.woodCountPerChop++
          }
        "
      />
      <Upgrade_Button
        :showCondition="player.upgrades3.unlocked"
        :resource="[
          [Resource.STRAWBERRY, 260],
          [Resource.WOOD, 30],
        ]"
        :currentUpgrade="player.upgrades3.autoStrawbPicker ? 1 : 0"
        :maxUpgrades="1"
        buttonTitle="Auto Strawb Picker"
        buttonSubtext="Build a contraption that automatically picks strawberries for you!"
        :intervalSecs="5"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades3.autoStrawbPicker = true
            enableAutoPick()
          }
        "
      />
      <Upgrade_Button
        :showCondition="player.upgrades3.unlocked"
        :resource="[
          [Resource.STRAWBERRY, 260],
          [Resource.WOOD, 40],
        ]"
        :currentUpgrade="player.upgrades3.shelter"
        :maxUpgrades="2"
        buttonTitle="Construct Shelter"
        buttonSubtext="Build your shelter to survive the night! It may only be made of sticks and strawberries, but it's better than nothing."
        :intervalSecs="10"
        :onStart="undefined"
        :performUpgrade="
          () => {
            player.upgrades3.shelter++
            if (player.upgrades3.shelter >= 2) {
              upgrades4Dialog?.showModal()
            }
          }
        "
      />
      <dialog ref="upgrades4Dialog">
        <p>
          Wow, you did it! Your shelter stands firm against the chill of the night. And the next
          night, and the night after. You spend the rest of your fulfilling life living in your
          makeshift shelter, collecting strawberries and wood until the day you pass away.
        </p>

        <p>
          (In all seriousness, this is where the game ends for now. More content may be added in the
          future!)
        </p>
        <form method="dialog">
          <button>Continue</button>
        </form>
      </dialog>
    </div>
  </div>
</template>

<style scoped></style>
