import { ref, computed } from 'vue'
import { defineStore} from 'pinia'
//第一个是命名空间
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const Useclick = defineStore("clickTest",()=>{
  const click_total = ref(0);
  function increment() {
    click_total.value++
  }
  console.log(click_total.value);
  return {click_total,increment};
})

