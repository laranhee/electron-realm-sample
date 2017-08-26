const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 })

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

process.chdir(app.getPath('userData'));

console.log(app.getPath('userData'));

var Realm = require('realm');
const os = require('os');
// const path = require('path');

const CarSchema = {
  name: 'Car',
  properties: {
    make: 'string',
    model: 'string',
    miles: { type: 'int', default: 0 },
  }
};
const PersonSchema = {
  name: 'Person',
  properties: {
    name: 'string',
    birthday: 'date',
    cars: { type: 'list', objectType: 'Car' },
    picture: { type: 'data', optional: true }, // optional property
  }
};

// Initialize a Realm with Car and Person models
let realm = new Realm({
  path: path.join(os.homedir(), 'electron-realm-sample', 'data.realm'),
  schema: [CarSchema, PersonSchema]
});

realm.write(() => {
  realm.create('Car', {
    make: 'Honda',
    model: 'Civic',
    miles: 750,
  });

  realm.create('Car', {
    make: 'Hyundai',
    model: 'Kona',
    miles: 550,
  })
});

let a = realm.objects('Car');