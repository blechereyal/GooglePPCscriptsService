var fs = require('fs');

exports.parse = function(file, parameters) {
  var data = fs.readFileSync(file, 'utf-8');

  var newValue = data.replace(/\{\{\splaceholder:(.+)\s\}\}/, function(m, group) {
    return parameters[group];
  });

  return newValue;
};

