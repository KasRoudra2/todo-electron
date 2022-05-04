const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

const getPath = (args) => path.join(__dirname, args);

module.exports = { app, BrowserWindow, Menu, ipcMain, getPath };
