import { ref, reactive } from 'vue'

export const player = reactive({
  strawberries: 0,
  upgrades1: {
    unlocked: false,
    strawbStorage: 0,
    strawbRate: 0,  
    strawbCountPerPick: 0,
  }
})
