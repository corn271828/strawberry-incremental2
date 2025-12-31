<script setup lang="ts">
import { computed } from 'vue'
import { Resource, getResource, addResource } from './player'

const props = defineProps<{
  showCondition: boolean
  additionalDisableCondition?: boolean // set to true to disable the button
  resource: Array<[Resource, number]>
  currentUpgrade: number
  maxUpgrades?: number
  buttonTitle: string
  buttonSubtext: string
  intervalSecs: number
  onStart?: () => void
  performUpgrade: () => void
}>()

const buttonText = computed(() => {
  const levelsDisplay =
    props.maxUpgrades === undefined ? '' : ` (${props.currentUpgrade} / ${props.maxUpgrades})`

  const costDisplay = props.resource.map(([resource, cost]) => `${cost} ${resource}`).join(', ')

  return `${props.buttonTitle}${levelsDisplay} - Cost: ${costDisplay}`
})

const enoughResources = computed(() => {
  return props.resource.every(([resource, cost]) => getResource(resource) >= cost)
})

const notAtMaxUpgrades = computed(() => {
  return props.maxUpgrades === undefined || props.currentUpgrade < props.maxUpgrades
})
</script>

<template>
  <Button_with_waiting
    v-if="props.showCondition && notAtMaxUpgrades"
    :buttonText="buttonText"
    :buttonSubtext="props.buttonSubtext"
    :intervalMillis="1000 * props.intervalSecs"
    :enabled="notAtMaxUpgrades && enoughResources && !props.additionalDisableCondition"
    :onStart="
      function () {
        for (const [resource, cost] of props.resource) {
          addResource(resource, -cost)
        }
        props.onStart?.()
      }
    "
    :onFinish="
      () => {
        if (!notAtMaxUpgrades) return
        props.performUpgrade()
      }
    "
  />
</template>

<!-- Shared logic for upgrade-like buttons. Handles some boilerplate for displaying the button and deducting the strawberry cost.
  Unfortunately, you still need to incr the upgrade count in the onFinish handler.
-->
