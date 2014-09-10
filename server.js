/*******************************************
 * dawdle - a lazy, last-minute, rushed implementation
 * of Peter Norvig's "A simple scheme interpreter", Part I
 * https://github.com/olsonjeffery/dawdle
 *
 * Copyright 2014, Jeff Olson <olson.jeffery@gmail.com>
 * Licensed under the 3-clause BSD license, see LICENSE.txt
 * for details
 *******************************************/

var express = require('express');

// start server
var port = 8080;
console.log("Starting dawdle demo app on port " + port);
var app = express();
app.use("/", express.static(__dirname));
app.listen(8080);
