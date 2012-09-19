JSONStore
=========

Simple json store for node. Saves changes on disk immediately and blocking, so only relevant for cli applications and such.

Usage
-----

```javascript
var JSONStore = require('json-store');
var db = JSONStore('./index.json');

db.set('foo', 'bar');
db.get('foo');                // bar

db.set('obj', {foo: 'bar'});
db.get('obj').foo             // bar
```