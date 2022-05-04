const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  getPath,
} = require("../utils/utils.js");
const addWindow = require("./addWindow.js");

const mainWindow = () => {
  // Create the browser window.
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPath("preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.on("closed", () => {
    app.quit();
  });

  // and load the html of the app.
  window.loadFile(getPath("../layouts/mainWindow.html"));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Main Menu Template displayed on top

  const menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "Add",
          accelerator: "CmdOrCtrl+N",
          click() {
            addWindow();
          },
        },
        {
          label: "Clear All",
          click() {
            window.webContents.send("clear-items");
          },
        },
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Q",
          click() {
            app.quit();
          },
        },
        {
          role: "reload",
        },
      ],
    },
  ];
  process.platform === "darwin" && menuTemplate.unshift({});

  if (process.env.NODE_ENV !== "production") {
    //Open the DevTools.
    menuTemplate.push({
      label: "Dev Tools",
      click(item, currentWindow) {
        currentWindow.openDevTools();
      },
    });
  }

  // Create a Main Menu
  const menu = Menu.buildFromTemplate(menuTemplate);
  window.setMenu(menu);

  ipcMain.on("add-item", (e, item) => {
    window.webContents.send("add-item", item);
  });
  ipcMain.on("edited-item", (e, item) => {
    window.webContents.send("edited-item", item);
  });
};

module.exports = mainWindow;
