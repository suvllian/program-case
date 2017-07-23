/**
 * 本地存储实现，优先本地存储localStorage，如果浏览器不支持，降级为cookie
 */

var store = {},
    win = window,
    doc = win.document,
    localStorageName = 'localStorage',
    scriptTag = 'script',
    storage;

store.disable = false;

store.set = (key, value) => {};
store.get = (key, defaultVal) => {};
store.has = key => { return store.get(key) !== undefined; };
store.remove = key => {};
store.clear = () => {};
store.getAll = () => {};
store.forEach = () => {};
store.serialize = value => { return JSON.stringify(value); };

store.transact = (key, defaultVal, transactionFn) => {
  if (transactionFn == null) {
    transactionFn = defaultVal;
    defaultVal = null;
  }

  if (defaultVal == null) {
    defaultVal = {};
  }
  var val = store.get(key, defaultVal);
  transactionFn(val);
  store.set(key, val);
};

store.deserialize = value => {
  if (typeof value != 'string') {
    return undefined;
  }

  try {
    return JSON.parse(value);
  }
	catch (e) {
  return value || undefined;
}
};

function isLocalStorageNameSupported() {
  try {
    return (localStorageName in win && win[localStorageName]);
  }
	catch (e) {
  return false;
}
}

if (isLocalStorageNameSupported()) {
  storage = win[localStorageName];

  store.set = (key, val) => {
    if (val === undefined) {
      return store.remove(key);
    }
    storage.setItem(key, store.serialize(val));
    return val;
  };

  store.get = (key, defaultVal) => {
    var val = store.deserialize(storage.getItem(key));
    return (val === undefined ? defaultVal : val);
  };

  store.remove = key => { storage.removeItem(key); };

  store.clear = () => { storage.clear(); };

  store.getAll = () => {
    var ret = {};
    store.forEach((key, val) => {
      ret[key] = val;
    });
    return ret;
  };

  store.forEach = callback => {
    for (let i = 0; i < storage.length; i++) {
      let key = storage.key(i);
      callback(key, store.get(key));
    }
  };
}
else {
  let cookie = require('js-cookie');

  store.set = (key, val) => {
    if (val === undefined) {
      return cookie.remove(key);
    }

    cookie.set(key, val);
    return val;
  };

  store.get = (key, defaultVal) => {
    let val = cookie.get(key);
    return (val === undefined ? defaultVal : val);
  };

  store.remove = key => { cookie.remove(key); };
}

try {
  let testKey = 'storeJs';
  store.set(testKey, testKey);
  if (store.get(testKey) != testKey) {
    store.disable = true;
  }

  store.remove(testKey);
}
catch (e) {
  store.disable = true;
}

store.enable = !store.disabled;

export default store;
