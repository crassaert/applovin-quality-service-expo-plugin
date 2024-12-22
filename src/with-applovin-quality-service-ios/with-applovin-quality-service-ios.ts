import { ConfigPlugin, withXcodeProject } from "@expo/config-plugins";
import { spawnSync } from "child_process";
import * as path from "node:path";
import * as fs from "node:fs";

const copyIosScript = (projectRoot: string) => {
    const sourcePath = path.resolve(
        __dirname,
        "../../scripts/AppLovinQualityServiceSetup-ios.rb"
    );
    const destinationPath = path.join(projectRoot, "ios", "AppLovinQualityServiceSetup-ios.rb");

    if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source file does not exist: ${sourcePath}`);
    }

    // Create the destination directory if it doesn't exist
    if (!fs.existsSync(path.dirname(destinationPath))) {
        fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
    }

    // Copy the file
    fs.copyFileSync(sourcePath, destinationPath);
    console.log(`Copied ${sourcePath} to ${destinationPath}`);
};

export const withApplovinQualityServiceIos: ConfigPlugin = (config) => {
    config = withXcodeProject(config, (config) => {
        copyIosScript(config.modRequest.projectRoot);

        const scriptPath = path.join(config.modRequest.projectRoot, "ios", "AppLovinQualityServiceSetup-ios.rb");

        const result = spawnSync("ruby", [scriptPath], { encoding: "utf-8" });

        if (result.error) {
            console.error("Failed to run AppLovin Quality Service script:", result.error.message);
            throw result.error;
        }

        if (result.stderr) {
            console.error("Error output:", result.stderr);
        }

        return config;
    });

    return config;
};
