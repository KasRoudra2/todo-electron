const { app, BrowserWindow, Menu, ipcMain, getPath } = require("../utils/utils.js");

const addWindow = (edit=false) => {
  // Create the browser window.
  let window = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  window.on("closed", () => {
    //window = null;
  });

  // and load the html of the app.
  window.loadFile(getPath("../layouts/addWindow.html"));

  // Open the DevTools.
  // addWindow.webContents.openDevTools()

  // Main Menu Template displayed on top

  const menuTemplate = [
    {
      label: "File",
      submenu: [
        {
          label: "Quit",
          accelerator: "CmdOrCtrl+Q",
          click() {
            app.quit();
          },
        },
      ],
    },
  ];
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
  ipcMain.on("edit-item", (e, item) => {
    console.log(item);
    window.webContents.send("edit-item", item);
  });
};

module.exports = addWindow;
