import { ref, reactive, computed } from 'vue'

export const player = reactive({
  strawberries: 0,
  upgrades1: {
    unlocked: false,
    strawbStorage: 0,
    strawbCountPerPick: 0,
  },
  upgrades2: {
    unlocked: false,
    strawbRate: 0,
    strawbStorage: 0,
    strawbCountPerPick: 0,
    strawbSatiation: 0,
  },
  upgrades3: {
    unlocked: false
  }
})

export const strawbsMax = computed (() => 10 + player.upgrades1.strawbStorage * 10 + player.upgrades2.strawbStorage * 25 )