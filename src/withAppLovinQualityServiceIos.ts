import {ConfigPlugin, withXcodeProject} from "@expo/config-plugins";

export const withAppLovinQualityServiceIos: ConfigPlugin = (config) => {
    config = withXcodeProject(config, (config) => {
        const project = config.modResults;
        const scriptFileName = 'AppLovinQualityServiceSetup-ios.rb';
        const rubyScriptPath = `"${`$\{SRCROOT}/../scripts/${scriptFileName}`}"`;

        const buildPhaseName = 'Run AppLovin Quality Service Setup Script';

        const buildPhaseExists = project.hash.project.objects.PBXShellScriptBuildPhase
            ? Object.values(project.hash.project.objects.PBXShellScriptBuildPhase).some((phase: any) =>
                phase.name?.includes(buildPhaseName),
            )
            : false;

        if (!buildPhaseExists) {
            const scriptPhase = project.addBuildPhase(
                [],
                'PBXShellScriptBuildPhase',
                buildPhaseName,
                null,
                {
                    shellPath: '"/bin/sh"',
                    shellScript: `cp ${rubyScriptPath} ${scriptFileName} && ruby ${scriptFileName}`,
                },
            );

            if (!scriptPhase) {
                throw new Error(`Failed to add ${buildPhaseName} phase to Xcode project.`);
            }
        }

        return config;
    });

    return config;
}
