import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  showNotification: () => ipcRenderer.invoke('show-notification'),
  hideNotification: () => ipcRenderer.invoke('hide-notification'),
});
