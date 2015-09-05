"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var regedit = require("regedit");
var path = require("path");
var _ = require("lodash");

var VisualStudio = (function () {
	function VisualStudio() {
		var _this = this;

		_classCallCheck(this, VisualStudio);

		this._installedVersions = [];
		this._installDirs = {};

		var vsKeys = ["HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\VisualStudio\\12.0\\Setup\\vs", "HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\VisualStudio\\14.0\\Setup\\vs"];
		regedit.list(vsKeys, function (error, items) {
			if (error) console.log(error);

			if (!items || !items.length) return;

			var installDirs = _this._installDirs;
			installDirs.vs2013 = items[vsKeys[0]];
			installDirs.vs2015 = items[vsKeys[1]];

			for (var vsVersion in installDirs) {
				if (!installDirs[vsVersion] || !installDirs.hasOwnProperty(vsVersion)) continue;

				if (installDirs[vsVersion].values.ProductDir && installDirs[vsVersion].values.ProductDir.value) {
					installDirs[vsVersion] = installDirs[vsVersion].values.ProductDir.value;
					_this._installedVersions.push(vsVersion);
				} else installDirs[vsVersion] = undefined;
			}
		});
	}

	_createClass(VisualStudio, [{
		key: "installedVersions",
		get: function get() {
			return _.map(this._installedVersions, function (version) {
				return version;
			});
		}
	}]);

	return VisualStudio;
})();

exports.VisualStudio = VisualStudio;