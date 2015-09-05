"use strict";
var regedit = require("regedit");
var path = require("path");
var visualstudio_config_1 = require("visualstudio-config");
visualstudio_config_1.VisualStudio.loadConfiguration()
    .then(function (vs) {
    if (vs.vs2013)
        console.log(vs.vs2013.installDir);
    if (vs.vs2015)
        console.log(vs.vs2015.installDir);
})
    .catch(function (error) { return console.log(error); });
