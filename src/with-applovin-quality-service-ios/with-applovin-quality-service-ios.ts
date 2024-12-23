import {ConfigPlugin, withXcodeProject} from "@expo/config-plugins";
import * as path from "node:path";
import * as fs from "node:fs";

const copyIosScript = (projectRoot: string, iosSetupScriptPath: string) => {
    const sourcePath = path.join(
        projectRoot,
        iosSetupScriptPath
    );
    const destinationPath = path.join(projectRoot, "ios", "AppLovinQualityServiceSetup-ios.rb");

    if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source file does not exist: ${sourcePath}`);
    }

    if (!fs.existsSync(path.dirname(destinationPath))) {
        fs.mkdirSync(path.dirname(destinationPath), {recursive: true});
    }

    fs.copyFileSync(sourcePath, destinationPath);
    console.log(`Copied ${sourcePath} to ${destinationPath}`);
};

export const withApplovinQualityServiceIos: ConfigPlugin<{
    iosSetupScriptPath: string
}> = (config, {iosSetupScriptPath}) => {
    config = withXcodeProject(config, (config) => {
        const projectRoot = config.modRequest.projectRoot;

        copyIosScript(projectRoot, iosSetupScriptPath);

        return config;
    });

    return config;
};
