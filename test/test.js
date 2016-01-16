var expect = require('chai').expect;
var resolveUris = require('../index.js').resolveUris;
var execute = require('../index.js').execute;

describe('zorba executes jsoniq', function() {
  it('should execute jsoniq without modules path', function() {
    expect(execute("1+1")).to.equal('2');
  });
  it('should execute jsoniq with a modules path', function() {
    execute("import module namespace lm='http://zorba.io/mymodule'; lm:foo()", {
      modulesPath: "modules"
    });
  });
});

describe('uris are resolved', function() {
  it('should resolve a multiple uris', function() {
    var jsoniq = "import module namespace lm='http://zorba.io/blah/'; import module namespace foo=\"http://foo.bar/baz\"; lm:foo()";
    expect(resolveUris(jsoniq, '.')).to.match(/import module namespace lm='http:\/\/zorba\.io\/blah\/' at "\/.*\/io\/zorba\/blah\/index.jq"; import module namespace foo="http:\/\/foo\.bar\/baz" at "\/.*\/bar\/foo\/baz\.jq"; lm:foo()/);
  });
  it('should resolve a directory uri with `.` as the modulesPath', function() {
    var jsoniq = "import module namespace lm='http://zorba.io/blah/'; lm:foo()";
    expect(resolveUris(jsoniq, '.')).to.match(/import module namespace lm='http:\/\/zorba\.io\/blah\/' at "\/.*\/io\/zorba\/blah\/index.jq"; lm:foo()/);
  });
  it('should resolve a file uri with `.` as the modulesPath', function() {
    var jsoniq = "import module namespace lm='http://zorba.io/blah/mymodule'; lm:foo()";
    expect(resolveUris(jsoniq, '.')).to.match(/import module namespace lm='http:\/\/zorba\.io\/blah\/mymodule' at "\/.*\/io\/zorba\/blah\/mymodule.jq"; lm:foo()/);
  });
  it('should resolve a host uri with `.` as the modulesPath', function() {
    var jsoniq = "import module namespace lm='http://zorba.io'; lm:foo()";
    expect(resolveUris(jsoniq, '.')).to.match(/import module namespace lm='http:\/\/zorba\.io' at "\/.*\/io\/zorba\/index.jq"; lm:foo()/);
  });
  it('should resolve a directory uri with a modulesPath', function() {
    var jsoniq = "import module namespace lm='http://zorba.io/blah/'; lm:foo()";
    expect(resolveUris(jsoniq, 'foo/bar')).to.match(/import module namespace lm='http:\/\/zorba\.io\/blah\/' at "\/.*\/foo\/bar\/io\/zorba\/blah\/index.jq"; lm:foo()/);
  });
  it('should resolve a file uri with a modulesPath', function() {
    var jsoniq = "import module namespace lm='http://zorba.io/blah/mymodule'; lm:foo()";
    expect(resolveUris(jsoniq, 'foo/bar')).to.match(/import module namespace lm='http:\/\/zorba\.io\/blah\/mymodule' at "\/.*\/foo\/bar\/io\/zorba\/blah\/mymodule.jq"; lm:foo()/);
  });
  it('should resolve a host uri with a modulesPath', function() {
    var jsoniq = "import module namespace lm='http://zorba.io'; lm:foo()";
    expect(resolveUris(jsoniq, 'foo/bar')).to.match(/import module namespace lm='http:\/\/zorba\.io' at "\/.*\/foo\/bar\/io\/zorba\/index.jq"; lm:foo()/);
  });
});
