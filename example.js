var zorba = require('.');

try {
  var r = zorba.execute("1+1");
  console.log(r);
} catch (e) {
  console.log("error");
}
