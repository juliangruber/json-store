import fs from 'fs'

const clone = data => {
  // JSON.parse(undefined) throws an error, so handle it explicitly
  return data === undefined ? undefined : JSON.parse(JSON.stringify(data))
}

export default class Store {
  constructor (path) {
    this._path = path
    if (fs.existsSync(path)) {
      this._store = JSON.parse(fs.readFileSync(path, 'utf8'))
    } else {
      this._store = {}
      this._save()
    }
  }

  get (key) {
    return clone(key ? this._store[key] : this._store)
  }

  set (key, value) {
    this._store[key] = clone(value)
    this._save()
  }

  del (key) {
    delete this._store[key]
    this._save()
  }

  _save () {
    fs.writeFileSync(this._path, JSON.stringify(this._store))
  }
}
