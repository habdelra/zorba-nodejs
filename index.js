var NativeExtension = require('bindings')('zorba');
var INDEX_JQ = 'index.jq';
var JQ_EXTENSION = '.jq';
function resolveUris(jsoniq, modulePath) {
  modulePath = modulePath || '';
  var resolvedJsonIq = jsoniq.replace(/import module namespace [^=]+=['"]http[s]*:\/\/([^'"\/]+)([^'"]+)*['"]/g, function(match, host, path) {
    path = !path ? '/index' : path;
    path = path.slice(-1) === '/' ? path + INDEX_JQ : path + JQ_EXTENSION;
    path = path.charAt(0) === '/' ? path.substring(1) : path;
    var hostSplit = host.split('.');
    var absolutePath = __dirname + ( !modulePath || modulePath === '.'  ? '' :  '/' + modulePath );
    for(var i = hostSplit.length - 1; i >= 0; i--) {
      absolutePath += '/' + hostSplit[i];
    }
    absolutePath += '/' + path;

    return match + ' at "' + absolutePath + '"';
  });
  return resolvedJsonIq;
}

module.exports = {
  resolveUris: resolveUris,
  execute: function(jsoniq, opts) {
    if (opts && opts.modulesPath) {
      return NativeExtension.execute(resolveUris(jsoniq, opts.modulesPath));
    }
    return NativeExtension.execute(jsoniq);
  }
};
