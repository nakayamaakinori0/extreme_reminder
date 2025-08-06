<template>
  <div id="app">
    <TimerInput
      :is-running="isRunning"
      :remaining-time="remainingTime"
      @start="handleStart"
      @stop="handleStop"
    />
    <FullScreenNotification
      :visible="showNotification"
      @close="handleCloseNotification"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TimerInput from './components/TimerInput.vue'
import FullScreenNotification from './components/FullScreenNotification.vue'
import { Timer } from './services/Timer'

const timer = new Timer()
const isRunning = ref(false)
const remainingTime = ref(0)
const showNotification = ref(false)

let updateInterval: NodeJS.Timeout | null = null

const handleStart = (minutes: number) => {
  timer.start(minutes, () => {
    showNotification.value = true
    isRunning.value = false
    stopUpdateInterval()
    
    // Electronで最前面表示を強制
    if (window.electron) {
      window.electron.showNotification()
    }
  })
  
  isRunning.value = true
  startUpdateInterval()
}

const handleStop = () => {
  timer.stop()
  isRunning.value = false
  stopUpdateInterval()
}

const handleCloseNotification = () => {
  showNotification.value = false
  
  // Electronで通常表示に戻す
  if (window.electron) {
    window.electron.hideNotification()
  }
}

const startUpdateInterval = () => {
  updateInterval = setInterval(() => {
    remainingTime.value = timer.getRemainingTime()
  }, 100)
}

const stopUpdateInterval = () => {
  if (updateInterval) {
    clearInterval(updateInterval)
    updateInterval = null
  }
}

onMounted(() => {
  // 初期状態の設定
})

onUnmounted(() => {
  stopUpdateInterval()
  timer.stop()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
}
</style>