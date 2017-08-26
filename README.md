# electron-realm-sample

This is a Electron with Realm sample based on [electron-quick-start](https://github.com/electron/electron-quick-start) and [Realm JS](https://realm.io/docs/javascript/latest/).

realm-js is not supported to Electron. (2017. 08. 26.)

So, this use [electron-rebuild](https://github.com/electron/electron-rebuild).

```sh
./node_modules/.bin/electron-rebuild -f -w realm
```

In runtime, `Realm` makes `realm-object-server` directory in process cwd, It cause runtime error(permission error) when you execute distributed app with Electron.

So, have to change cwd.

```js
process.chdir(app.getPath('userData')); // just sample
```

* Note : realm-js officially support Node in windows. But It only works on `>= Windows 8.1`.

That's the reason why I stop research. I want to run my electron app on `>= Windows 7`