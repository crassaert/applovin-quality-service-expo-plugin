"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAppLovinQualityServiceAndroid = void 0;
const config_plugins_1 = require("@expo/config-plugins");
const withAppLovinQualityServiceAndroid = (config, { apiKey }) => {
    config = (0, config_plugins_1.withProjectBuildGradle)(config, (config) => {
        if (!config.modResults.contents.includes('https://artifacts.applovin.com/android')) {
            config.modResults.contents = config.modResults.contents.replace(/(buildscript([^#]+?)repositories\s*{)/, `$1
        maven { url 'https://artifacts.applovin.com/android' }`);
        }
        if (!config.modResults.contents.includes('com.applovin.quality:AppLovinQualityServiceGradlePlugin:')) {
            config.modResults.contents = config.modResults.contents.replace(/dependencies\s*{/, `dependencies {
        classpath 'com.applovin.quality:AppLovinQualityServiceGradlePlugin:+'`);
        }
        return config;
    });
    config = (0, config_plugins_1.withAppBuildGradle)(config, (config) => {
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
exports.withAppLovinQualityServiceAndroid = withAppLovinQualityServiceAndroid;
