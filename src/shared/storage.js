/**
 * 简单包装一 sessionStorage 和 localStorage 的使用
 */
class Storage {
  static serialize(data) {
    return JSON.stringify(data);
  }
  static deserialize(data) {
    return JSON.parse(data);
  }

  static set(storage, key, data) {
    storage.setItem(key, this.serialize(data));
  }

  static get(storage, key) {
    const serializedData = storage.getItem(key);
    return serializedData ? this.deserialize(serializedData) : undefined;
  }

  static remove(storage, key) {
    storage.removeItem(key);
  }

  static clear(storage) {
    storage.clear();
  }
}
/**
 * eg: SessionStorage.set('name','giscafer')
 */
export class SessionStorage {
  static clear() {
    Storage.clear(window.sessionStorage);
  }
  static remove(key) {
    Storage.remove(window.sessionStorage, key);
  }
  static set(key, value) {
    Storage.set(window.sessionStorage, key, value);
  }
  static get(key) {
    return Storage.get(window.sessionStorage, key);
  }
}
/**
 * eg: LocalStorage.set('name','giscafer')
 */
export class LocalStorage {
  static clear() {
    Storage.clear(window.localStorage);
  }
  static remove(key) {
    Storage.remove(window.localStorage, key);
  }
  static set(key, value) {
    Storage.set(window.localStorage, key, value);
  }
  static get(key) {
    return Storage.get(window.localStorage, key);
  }
}
