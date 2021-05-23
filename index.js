import fs from 'fs'

const clone = data => {
  // JSON.parse(undefined) throws an error, so handle it explicitly
  return data === undefined ? undefined : JSON.parse(JSON.stringify(data))
}

export default class Store {
  constructor (path) {
    this.path = path
    if (fs.existsSync(path)) {
      this.Store = JSON.parse(fs.readFileSync(path, 'utf8'))
    } else {
      this.Store = {}
      this.save()
    }
  }

  get (key) {
    return clone(key ? this.Store[key] : this.Store)
  }

  set (key, value) {
    this.Store[key] = clone(value)
    this.save()
  }

  del (key) {
    delete this.Store[key]
    this.save()
  }

  save () {
    fs.writeFileSync(this.path, JSON.stringify(this.Store))
  }
}
