
var express = require('express');
var parser = require('./parser.js')
var scriptConfig = require('./script_config.js')
var app = express();
app.get('/scripts/:slug', function(req, res) {
  var slug = req.params.slug;
  if (scriptConfig.checkScript(slug, req.query.keys)) {
    var filename = scriptConfig.getFilename(slug);
    res.set({"Content-Disposition":"attachment; filename=\"" + slug + ".js\""});
    res.send(parser.parse(filename, req.query));
  } else {
    res.status(422).json({errors: ["undefined script " + slug]})
  }
});

app.get('/scripts', function(req, res) {
  res.json(scriptConfig.getAvailableScripts());
});

app.listen(3000, function () {
});
