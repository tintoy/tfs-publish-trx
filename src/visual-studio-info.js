const regedit	= require("regedit");
const path    	= require("path");
const _			= require("lodash");

export class VisualStudio {
	constructor() {
		this._installedVersions = [];
		this._installDirs = {};

		const vsKeys = [
			"HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\VisualStudio\\12.0\\Setup\\vs",
			"HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\VisualStudio\\14.0\\Setup\\vs"
		];
		regedit.list(vsKeys, (error, items) => {
			if (error)
				console.log(error);

			if (!items || !items.length)
				return;
			
			const installDirs = this._installDirs;
			installDirs.vs2013 = items[vsKeys[0]];
			installDirs.vs2015 = items[vsKeys[1]]

			for (let vsVersion in installDirs) {
				if (!installDirs[vsVersion] || !installDirs.hasOwnProperty(vsVersion))
					continue;
				
				if (installDirs[vsVersion].values.ProductDir && installDirs[vsVersion].values.ProductDir.value)
				{
					installDirs[vsVersion] = installDirs[vsVersion].values.ProductDir.value;
					this._installedVersions.push(vsVersion);
				}
				else
					installDirs[vsVersion] = undefined;
			}
		});
	}

	get installedVersions(): string[] {
		return _.map(this._installedVersions, version => version);
	}
}
