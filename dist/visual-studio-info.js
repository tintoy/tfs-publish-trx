/// <reference path="typings/lodash/lodash.d.ts" />
"use strict";
var regedit = require("regedit");
var Promise = require("bluebird");
var _ = require("lodash");
var VisualStudio = (function () {
    function VisualStudio() {
        this._installedVersions = [];
    }
    /**
     * Load VS information from the registry.
     * @return A promise that resolves to the VisualStudio instance.
     */
    VisualStudio.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._configurations = {};
            _this._installedVersions = [];
            var vsKeys = [
                "HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\VisualStudio\\12.0\\Setup\\vs",
                "HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\VisualStudio\\14.0\\Setup\\vs"
            ];
            regedit.list(vsKeys, function (error, items) {
                if (error) {
                    reject(error);
                    return;
                }
                if (!items || !items.length)
                    resolve(_this);
                var vsInstallDir = _this.getInstallDir(items[vsKeys[0]]);
                if (vsInstallDir) {
                    _this._configurations.vs2013 = {
                        installDir: vsInstallDir
                    };
                    _this._installedVersions.push("vs2013");
                }
                vsInstallDir = _this.getInstallDir(items[vsKeys[1]]);
                if (vsInstallDir) {
                    _this._configurations.vs2015 = {
                        installDir: vsInstallDir
                    };
                    _this._installedVersions.push("vs2015");
                }
                resolve(_this);
            });
        });
    };
    Object.defineProperty(VisualStudio.prototype, "installedVersions", {
        get: function () {
            return _.map(this._installedVersions, function (version) { return version; });
        },
        enumerable: true,
        configurable: true
    });
    VisualStudio.prototype.getInstallDir = function (vsKey) {
        if (!vsKey)
            return null;
        if (vsKey.values.ProductDir && vsKey.values.ProductDir.value)
            return vsKey.values.ProductDir.value;
        return null;
    };
    return VisualStudio;
})();
exports.VisualStudio = VisualStudio;
