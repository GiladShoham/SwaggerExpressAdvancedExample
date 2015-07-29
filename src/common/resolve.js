var resolve = require('json-refs').resolveRefs;
var YAML = require('js-yaml');
var fs = require('fs');

function resolveYaml(){
  var mainYamlPath = './api/swagger/main-swagger.yaml';
  var root = YAML.safeLoad(fs.readFileSync(mainYamlPath).toString());
  var options = {
    processContent: function (content) {
      return YAML.safeLoad(content);
    }
  };
  return resolve(root, options).then(function (results) {
    //console.log(JSON.stringify(results.resolved, null, 2));
    var parsedSwagger = results.resolved
    var parsedSwagger = JSON.stringify(parsedSwagger, null, 2);
    return parsedSwagger;
  });
}

module.exports = {
  resolveYaml: resolveYaml
};