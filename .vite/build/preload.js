"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electron", {
  showNotification: () => electron.ipcRenderer.invoke("show-notification"),
  hideNotification: () => electron.ipcRenderer.invoke("hide-notification")
});
