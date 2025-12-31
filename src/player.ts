import { reactive } from 'vue'

export const player = reactive({
  strawberries: 0,
  wood: 0,
  stone: 0,
  initDialogSeen: false,
  upgrades1: {
    unlocked: true,
    strawbStorage: 2,
    strawbCountPerPick: 5,
  },
  upgrades2: {
    unlocked: true,
    strawbRate: 2,
    strawbStorage: 2,
    strawbCountPerPick: 5,
    strawbSatiation: 1,
  },
  upgrades3: {
    unlocked: false,
    storage: 0,
    strawbCountPerPick: 0,
    woodCountPerChop: 0,
    autoStrawbPicker: false,
    shelter: 0,
  },
})

export enum Resource {
  STRAWBERRY = '🍓',
  WOOD = '🪵',
  STONE = '🪨',
}

export const allResources = [Resource.STRAWBERRY, Resource.WOOD, Resource.STONE]

export function getResource(resource: Resource): number {
  switch (resource) {
    case Resource.STRAWBERRY:
      return player.strawberries
    case Resource.WOOD:
      return player.wood
    case Resource.STONE:
      return player.stone
  }
}

export function maxResource(resource: Resource): number {
  switch (resource) {
    case Resource.STRAWBERRY:
      return (
        10 +
        player.upgrades1.strawbStorage * 10 +
        player.upgrades2.strawbStorage * 25 +
        player.upgrades3.storage * 60
      )
    case Resource.WOOD:
      return 10 + player.upgrades3.storage * 10
    case Resource.STONE:
      return 10
  }
}

export function addResource(resource: Resource, amount: number): void {
  switch (resource) {
    case Resource.STRAWBERRY:
      player.strawberries += amount
      break
    case Resource.WOOD:
      player.wood += amount
      break
    case Resource.STONE:
      player.stone += amount
      break
  }
}
