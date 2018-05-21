var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var apiRoutes = require("./routing/apiRoutes.js");
var htmlRoutes = require("./routing/htmlRoutes.js");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

apiRoutes(app);
htmlRoutes(app);

app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
