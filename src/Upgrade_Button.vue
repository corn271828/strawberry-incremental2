<script setup lang="ts">
import { computed } from 'vue'
import { Resource, getResource, addResource } from './player'

const props = defineProps<{
  showCondition: boolean
  resource: Resource
  cost: number
  currentUpgrade: number
  maxUpgrades: number
  buttonTitle: string
  buttonSubtext: string
  intervalSecs: number
  onStart?: () => void
  performUpgrade: () => void
}>()

const buttonText = computed(() => {
  const levelsDisplay =
    props.maxUpgrades === 0 ? '' : ` (${props.currentUpgrade} / ${props.maxUpgrades})`

  return `${props.buttonTitle}${levelsDisplay} - Cost: ${props.cost} ${props.resource}`
})
</script>

<template>
  <Button_with_waiting
    v-if="props.showCondition && props.currentUpgrade < props.maxUpgrades"
    :buttonText="buttonText"
    :buttonSubtext="props.buttonSubtext"
    :intervalMillis="1000 * props.intervalSecs"
    :enabled="props.currentUpgrade < props.maxUpgrades && getResource(props.resource) >= props.cost"
    :onStart="
      function () {
        addResource(resource, -props.cost)
        props.onStart?.()
      }
    "
    :onFinish="
      () => {
        if (props.currentUpgrade >= props.maxUpgrades) return
        props.performUpgrade()
      }
    "
  />
</template>

<!-- Shared logic for upgrade-like buttons. Handles some boilerplate for displaying the button and deducting the strawberry cost.
  Unfortunately, you still need to incr the upgrade count in the onFinish handler.
-->
