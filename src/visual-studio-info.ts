/// <reference path="typings/lodash/lodash.d.ts" />

"use strict";

const regedit		= require("regedit");

import * as Promise	from "bluebird";
import * as _		from "lodash";

/** The configurations for all installed versions of Visual Studio */
interface VisualStudioVersions {
	/** Configuration for Visual Studio 2013 (v12.0), if present */	
	vs2013?: VisualStudioConfiguration;
	
	/** Configuration for Visual Studio 2015 (v14.0), if present */	
	vs2015?: VisualStudioConfiguration;
}

/** The configuration for a specific version of Visual Studio */
interface VisualStudioConfiguration {
	/** The main product install directory */
	installDir: string;
}

export class VisualStudio {
	private _installedVersions:	string[] = [];
	private	_configurations:	VisualStudioVersions;

	constructor() { }

	/** 
	 * Load VS information from the registry.
	 * @return A promise that resolves to the VisualStudio instance. 
	 */
	load(): Promise<VisualStudio> {
		return new Promise<VisualStudio>((resolve, reject) => {
			this._configurations = {};
			this._installedVersions = [];
			
			const vsKeys = [
				"HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\VisualStudio\\12.0\\Setup\\vs",
				"HKLM\\SOFTWARE\\Wow6432Node\\Microsoft\\VisualStudio\\14.0\\Setup\\vs"
			];
			regedit.list(vsKeys, (error, items) => {
				if (error)
				{
					reject(error);
					
					return;
				}
	
				if (!items || !items.length)
					resolve(this);
				
				let vsInstallDir = this.getInstallDir(
					items[vsKeys[0]]
				);
				if (vsInstallDir)
				{
					this._configurations.vs2013 = {
						installDir: vsInstallDir
					};
					this._installedVersions.push("vs2013");
				}
					
				vsInstallDir = this.getInstallDir(
					items[vsKeys[1]]
				);
				if (vsInstallDir)
				{
					this._configurations.vs2015 = {
						installDir: vsInstallDir
					};
					this._installedVersions.push("vs2015");
				}
				
				resolve(this);
			});
		});
	}

	get installedVersions(): string[] {
		return _.map(this._installedVersions, version => version);
	}
	
	private getInstallDir(vsKey: any): string {
		if (!vsKey)
			return null;
			
		if (vsKey.values.ProductDir && vsKey.values.ProductDir.value)
			return vsKey.values.ProductDir.value;
			
		return null;
	}
}
