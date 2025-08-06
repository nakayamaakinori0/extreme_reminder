<template>
  <div class="timer-input">
    <div v-if="!isRunning" class="input-section">
      <input
        v-model.number="minutes"
        type="number"
        min="1"
        placeholder="分"
        class="time-input"
      />
      <button @click="handleStart" class="btn btn-start">開始</button>
    </div>
    
    <div v-else class="running-section">
      <div class="remaining-time">{{ formattedTime }}</div>
      <button @click="handleStop" class="btn btn-stop">停止</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  isRunning?: boolean
  remainingTime?: number
}

const props = withDefaults(defineProps<Props>(), {
  isRunning: false,
  remainingTime: 0
})

const emit = defineEmits<{
  start: [minutes: number]
  stop: []
}>()

const minutes = ref(5)

const formattedTime = computed(() => {
  const totalSeconds = Math.floor(props.remainingTime / 1000)
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
})

const handleStart = () => {
  if (minutes.value >= 1) {
    emit('start', minutes.value)
  }
}

const handleStop = () => {
  emit('stop')
}
</script>

<style scoped>
.timer-input {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.input-section {
  display: flex;
  gap: 10px;
  align-items: center;
}

.time-input {
  width: 80px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-start {
  background-color: #4CAF50;
  color: white;
}

.btn-start:hover {
  background-color: #45a049;
}

.btn-stop {
  background-color: #f44336;
  color: white;
}

.btn-stop:hover {
  background-color: #da190b;
}

.running-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.remaining-time {
  font-size: 48px;
  font-weight: bold;
  font-variant-numeric: tabular-nums;
}
</style>