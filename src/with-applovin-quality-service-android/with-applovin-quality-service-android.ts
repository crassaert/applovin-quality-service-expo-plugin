import {ConfigPlugin, withAppBuildGradle, withProjectBuildGradle} from "@expo/config-plugins";

export const withApplovinQualityServiceAndroid: ConfigPlugin<{ apiKey: string }> = (config, {apiKey}) => {
    config = withProjectBuildGradle(config, (config) => {
        if (!config.modResults.contents.includes('https://artifacts.applovin.com/android')) {
            config.modResults.contents = config.modResults.contents.replace(
                /(buildscript([^#]+?)repositories\s*{)/,
                `$1
        maven { url 'https://artifacts.applovin.com/android' }`,
            );
        }

        if (
            !config.modResults.contents.includes(
                'com.applovin.quality:AppLovinQualityServiceGradlePlugin:',
            )
        ) {
            config.modResults.contents = config.modResults.contents.replace(
                /dependencies\s*{/,
                `dependencies {
        classpath 'com.applovin.quality:AppLovinQualityServiceGradlePlugin:+'`,
            );
        }

        return config;
    });

    config = withAppBuildGradle(config, (config) => {
        const buildGradle = config.modResults.contents;

        if (!buildGradle.includes("apply plugin: 'applovin-quality-service'")) {
            config.modResults.contents += `
apply plugin: 'applovin-quality-service'

applovin {
    apiKey "${apiKey}"
  }`;
        }

        return config;
    });

    return config;
};
