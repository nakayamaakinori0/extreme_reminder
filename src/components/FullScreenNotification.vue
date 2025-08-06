<template>
  <div v-if="visible" class="full-screen-notification">
    <div class="notification-content">
      <h1 class="notification-title">時間が経過しました</h1>
      <button @click="handleClose" class="close-button">閉じる</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  visible: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const handleClose = () => {
  emit('close')
}
</script>

<style scoped>
.full-screen-notification {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.notification-content {
  text-align: center;
  color: white;
}

.notification-title {
  font-size: 48px;
  margin-bottom: 40px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.8;
  }
}

.close-button {
  padding: 16px 32px;
  font-size: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: #45a049;
}
</style>