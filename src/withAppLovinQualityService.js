"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAppLovinQualityService = void 0;
const withAppLovinQualityServiceAndroid_1 = require("./withAppLovinQualityServiceAndroid");
const withAppLovinQualityServiceIos_1 = require("./withAppLovinQualityServiceIos");
const withAppLovinQualityService = (config, { apiKey }) => {
    config = (0, withAppLovinQualityServiceAndroid_1.withAppLovinQualityServiceAndroid)(config, { apiKey });
    config = (0, withAppLovinQualityServiceIos_1.withAppLovinQualityServiceIos)(config);
    return config;
};
exports.withAppLovinQualityService = withAppLovinQualityService;
