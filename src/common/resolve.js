var resolve = require('json-refs').resolveRefs;
var YAML = require('yaml-js');
var fs = require('fs');

function resolveYaml(){
  var mainYamlPath = './api/swagger/main-swagger.yaml';
  var root = YAML.load(fs.readFileSync(mainYamlPath).toString());
  var options = {
    processContent: function (content) {
      return YAML.load(content);
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