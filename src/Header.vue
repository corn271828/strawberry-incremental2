<script setup lang="ts">
import { player, Resource, getResource, maxResource, allResources } from './player.ts'
import { computed } from 'vue'

function resourceEnabled(resource: Resource) {
  switch (resource) {
    case Resource.STRAWBERRY:
      return true
    case Resource.WOOD:
      return player.upgrades3.unlocked
    case Resource.STONE:
      return false // change
    default:
      return true
  }
}

function resourceData(resource: Resource) {
  return {
    resource: resource,
    showIf: resourceEnabled(resource),
    text: `${resource}: ${getResource(resource)} / ${maxResource(resource)}`,
    barStyle: {
      width: (getResource(resource) / maxResource(resource)) * 100 + '%',
      height: '20px',
      'background-color': 'var(--pink)',
    },
  }
}

const allData = computed(() => {
  return allResources.map(resourceData)
})
</script>

<template>
  <div class="header">
    <template v-for="data in allData">
      <div v-if="data.showIf" class="resource-box" :key="data.resource">
        <div>{{ data.text }}</div>
        <div class="progress" style="width: 100%">
          <div class="bar" :style="data.barStyle"></div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.resource-box {
  display: flex;
  flex-direction: column;
  border: 1px solid #ffffff;
  background-color: var(--rose-900);
  width: fit-content;
  margin: 5px;
}
</style>
