"use strict";
var regedit = require("regedit");
var path = require("path");
var visual_studio_info_1 = require("./visual-studio-info");
var visualStudio = new visual_studio_info_1.VisualStudio();
visualStudio.load()
    .then(function (vs) {
    for (var _i = 0, _a = vs.installedVersions; _i < _a.length; _i++) {
        var installedVersion = _a[_i];
        console.log(installedVersion);
    }
})
    .catch(function (error) { return console.log(error); });
