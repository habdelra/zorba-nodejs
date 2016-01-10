# zorba-nodejs

This is a native nodejs binding for the Zorba that is inspired by https://github.com/Rod-O/zorba-node. This library leverages [Nan](https://github.com/nodejs/nan) so that it is supported on all versions of Node.js and Io.js. A prerequisite for this library is that Zorba is installed. Zorba can be installed using `brew install zorba` on a Mac, as well as `apt-get` on Linux. Visit the Zorba documentation for more information: http://www.zorba.io/download.

After `npm install` this package, you can confirm that it works by executing:
```
$ node example.js
```

You should see the following output (this executes the statement `"1+1"` in JSONiq):

```
2
```

An example of this library's usage is:

```js
var zorba = require('zorba-node');

try {
  var result = zorba.execute('let $days-left := days-from-duration(xs:date("2016-02-14") - current-date()) return $days-left || " days left"');
  console.log(result);
} catch (e) {
  console.error(e);
}
```

When there is an error in your query--like the following code:

```js
try {
  console.log(require('zorba-node').execute('1 + WHAAAAAAAA'));
} catch(e) {
  console.error(e);
}
```

Then the output looks something like this, so that you can troubleshoot the query:

```
(no URI):1,6: dynamic error [err:XPDY0002]: "context item": undeclared variable
[Error: { "type": "xquery", "file": "", "lines": "1", "characters": "6-16", "error": "context item: undeclared variable" }]
```
