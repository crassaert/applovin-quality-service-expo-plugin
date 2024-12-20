"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAppLovinQualityServiceIos = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const withAppLovinQualityServiceIos = (config) => {
    config = (0, config_plugins_1.withXcodeProject)(config, (config) => {
        const project = config.modResults;
        const scriptFileName = 'AppLovinQualityServiceSetup-ios.rb';
        const rubyScriptPath = `"${`$\{SRCROOT}/../scripts/${scriptFileName}`}"`;
        const buildPhaseName = 'Run AppLovin Quality Service Setup Script';
        const buildPhaseExists = project.hash.project.objects.PBXShellScriptBuildPhase
            ? Object.values(project.hash.project.objects.PBXShellScriptBuildPhase).some((phase) => { var _a; return (_a = phase.name) === null || _a === void 0 ? void 0 : _a.includes(buildPhaseName); })
            : false;
        if (!buildPhaseExists) {
            const scriptPhase = project.addBuildPhase([], 'PBXShellScriptBuildPhase', buildPhaseName, null, {
                shellPath: '"/bin/sh"',
                shellScript: `cp ${rubyScriptPath} ${scriptFileName} && ruby ${scriptFileName}`,
            });
            if (!scriptPhase) {
                throw new Error(`Failed to add ${buildPhaseName} phase to Xcode project.`);
            }
        }
        return config;
    });
    return config;
};
exports.withAppLovinQualityServiceIos = withAppLovinQualityServiceIos;
