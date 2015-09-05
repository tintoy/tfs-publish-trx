"use strict";

const regedit = require("regedit");
const path    = require("path");

import {VisualStudio} from "./visual-studio-info";

const visualStudio = new VisualStudio();

visualStudio.load()
	.then(vs => {
		for (const installedVersion of vs.installedVersions) {
			console.log(installedVersion);
		}
	})
	.catch(error => console.log(error));
