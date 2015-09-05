"use strict";

const regedit = require("regedit");
const path    = require("path");

import {VisualStudio, VisualStudioConfiguration} from "visualstudio-config";

VisualStudio.loadConfiguration()
	.then(vs => {
		if (vs.vs2013)
			console.log(vs.vs2013.installDir);
		
		if (vs.vs2015)
			console.log(vs.vs2015.installDir);
	})
	.catch(error => console.log(error));
