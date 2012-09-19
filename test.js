var JSONStore = require('./index');
var assert = require('assert');
var db = JSONStore(__dirname+'/test.json');

process.on('uncaughtException', function(err) {
  require('fs').unlinkSync(__dirname+'/test.json');
  throw err;
});

// return undefined
assert(typeof db.get('foo') == 'undefined');

// can store values
db.set('foo', 'bar');
assert(db.get('foo') == 'bar');

// serializes objects on set
var obj = {foo: 'bar'};
db.set('obj', obj);
obj.foo = 'changed';
assert(db.get('obj').foo == 'bar');

// serializes objects on get
var obj = db.get('obj');
obj.foo = 'changed';
assert(db.get('obj').foo == 'bar');

console.log('All tests passed');

require('fs').unlinkSync(__dirname+'/test.json');