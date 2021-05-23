import assert from 'assert'
import { join, dirname } from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import JSONStore from './index.js'

const file = join(dirname(fileURLToPath(import.meta.url)), 'test.json')

const db = new JSONStore(file)

process.on('exit', () => fs.unlinkSync(file))

assert.strictEqual(typeof db.get('foo'), 'undefined')

// can store values
db.set('foo', 'bar')
assert.strictEqual(db.get('foo'), 'bar')

// serializes objects on set
let obj = { foo: 'bar' }
db.set('obj', obj)
obj.foo = 'changed'
assert.strictEqual(db.get('obj').foo, 'bar')

// serializes objects on get
obj = db.get('obj')
obj.foo = 'changed'
assert.strictEqual(db.get('obj').foo, 'bar')

console.log('All tests passed')
