/// <reference path="typings/lodash/lodash.d.ts" />
"use strict";
var regedit = require("regedit");
var Promise = require("bluebird");
var VisualStudio = (function () {
    function VisualStudio() {
    }
    /**
     * Load VS information from the registry.
     * @param refresh {boolean} Refresh the configuration if it has already been loaded?
     * @return A promise that resolves to the VisualStudio instance.
     */
    VisualStudio.loadConfiguration = function (refresh) {
        var _this = this;
        if (refresh === void 0) { refresh = false; }
        if (this.loader && !refresh)
            return this.loader;
        this.loader = new Promise(function (resolve, reject) {
            var configurations = {};
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
                    resolve(configurations);
                var vsInstallDir = _this.getInstallDir(items[vsKeys[0]]);
                if (vsInstallDir) {
                    configurations.vs2013 = {
                        installDir: vsInstallDir
                    };
                }
                vsInstallDir = _this.getInstallDir(items[vsKeys[1]]);
                if (vsInstallDir) {
                    configurations.vs2015 = {
                        installDir: vsInstallDir
                    };
                }
                resolve(configurations);
            });
        });
        return this.loader;
    };
    /**
     * Get the product installation directory from the specified Visual Studio registry key.
     * @param vsKey {} The Visual Studio registry key.
     * @return The "ProductDir" registry value, or null if not present (or vsKey is null).
     */
    VisualStudio.getInstallDir = function (vsKey) {
        if (!vsKey)
            return null;
        if (vsKey.values.ProductDir && vsKey.values.ProductDir.value)
            return vsKey.values.ProductDir.value;
        return null;
    };
    return VisualStudio;
})();
exports.VisualStudio = VisualStudio;
