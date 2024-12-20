import {ConfigPlugin} from "@expo/config-plugins";
import {withAppLovinQualityServiceAndroid} from "./withAppLovinQualityServiceAndroid";
import {withAppLovinQualityServiceIos} from "./withAppLovinQualityServiceIos";
import type {withAppLovinQualityServiceParams} from "../types/types";

export const withAppLovinQualityService: ConfigPlugin<withAppLovinQualityServiceParams> = (config, {apiKey}) => {
    config = withAppLovinQualityServiceAndroid(config, {apiKey});
    config = withAppLovinQualityServiceIos(config);

    return config;
};
