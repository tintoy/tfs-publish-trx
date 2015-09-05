"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _visualStudioInfo = require("visual-studio-info");

var regedit = require("regedit");
var path = require("path");

var installDirs = {};

var vsKeys = ["HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\VisualStudio\\12.0\\Setup\\vs", "HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\VisualStudio\\14.0\\Setup\\vs"];
regedit.list(vsKeys, function (error, items) {
    if (error) console.log(error);

    if (!items || !items.length) return;

    installDirs.vs2013 = items[vsKeys[0]];
    installDirs.vs2015 = items[vsKeys[1]];

    for (var vsVersion in installDirs) {
        if (!installDirs[vsVersion] || !installDirs.hasOwnProperty(vsVersion)) continue;

        if (installDirs[vsVersion].values.ProductDir && installDirs[vsVersion].values.ProductDir.value) installDirs[vsVersion] = installDirs[vsVersion].values.ProductDir.value;else installDirs[vsVersion] = undefined;
    }

    console.dir(installDirs);
});

var visualStudio = {
    installDir: {
        vs2013: installDirs.vs2013,
        vs2013: installDirs.vs2015
    }
};
exports.visualStudio = visualStudio;