import { app, BrowserWindow, Menu, Tray,ipcMain,screen } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let tray
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    webPreferences: {webSecurity: false},//跨域
    height: 600,
    useContentSize: true,
    width: 1000,
    frame:false
  })

  mainWindow.loadURL(winURL)
  // console.log("setTray");
  setTray();

  mainWindow.on('close', (e) => {
  
      e.preventDefault()
      mainWindow.hide()

  })
}

app.on('ready', function(){
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
 
  createWindow()
  ipcMain.on('min', e=> mainWindow.minimize());
  ipcMain.on('max', function(){
    console.log('最大化')
			let sw = screen.getPrimaryDisplay().workAreaSize.width
			let sh = screen.getPrimaryDisplay().workAreaSize.height
			if (mainWindow.getSize()[0] === sw && mainWindow.getSize()[1] === sh) {
				// 还原并居中
				mainWindow.setBounds({
					x: (sw - 1000) / 2, // 为了居中
					y: (sh - 700) / 2, //  为了居中
					width: 1000, // 自己设置的最小宽度
					height: 700
				})
			} else {
				// 最大
				mainWindow.maximize()
			}
  });
  ipcMain.on('close', e=> mainWindow.close());
})


app.on('window-all-closed', () => {
  console.log("window-all-closed");
  if (process.platform !== 'darwin') {
 
    // app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

let template = [
{
      label: 'Help',
      role: 'help',
      submenu: [{
          label: 'create by wankang',
          // click: function () {
          //     electron.shell.openExternal('https://forum.iptchain.net')
          // }
      }]
  }
]
function setTray(){
    tray = new Tray(__static+"/icon.ico");
    const trayContextMenu = Menu.buildFromTemplate([
      {
        label: '打开',
        click: () => {
          mainWindow.show();
        }
      }, {
        label: '退出',
        click: () => {
          app.exit();
        }
      }
    ]);

    tray.setToolTip('myApp');
    tray.on('click', () => {
      console.log("mainWindowshow..")
      console.log(mainWindow)
      mainWindow.show();
      console.log("mainWindowshow..success")

    });
    tray.on('right-click', () => {
      tray.popUpContextMenu(trayContextMenu);
    });
}
