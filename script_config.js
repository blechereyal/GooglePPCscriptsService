var u = require('underscore');

var availableScripts = {
  budget: {
    parameters: {
      campaign_name: {type: "string"}
    }, 
    file: "./script_templates/budget.js"
  }
};

var checkParams = function(slug, parameters) {
  if (u.isEqual(parameters, availableScripts[slug].parameters.keys)) {
    return true;
  } else {
    return false;
  }
};

exports.checkScript = function(slug, parameters) {
  if (availableScripts[slug] === undefined) {
    return false 
  } else {
    return checkParams(slug, parameters);
  }
}

exports.getFilename = function(slug) {
  return availableScripts[slug].file;
}

exports.getAvailableScripts = function() {
  var hash = {scripts: []};
  u.each(availableScripts, function(config, slug){
    var newScript = {}
    // TODO: change this
    newScript.url = "localhost:3000/script/" + slug;
    newScript.slug = slug;
    newScript.required_parameters = config.parameters;
    hash.scripts.push(newScript);
  });

  return hash;
};