import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Vue Test Utilsの設定
config.global.stubs = {
  teleport: true
}

// Electronのモック
vi.mock('electron', () => ({
  ipcRenderer: {
    send: vi.fn(),
    on: vi.fn(),
    removeListener: vi.fn()
  }
}))