var zorba = require('.');

try {
  // Simple jsoniq
  var r = zorba.execute("1 + 1");
  console.log(r);

  // JSON IQ with local import modules
  r = zorba.execute("import module namespace lm='http://zorba.io/mymodule'; lm:foo()", {
    modulesPath: "modules"
  });
  console.log(r);
} catch (e) {
  console.error(e);
}
