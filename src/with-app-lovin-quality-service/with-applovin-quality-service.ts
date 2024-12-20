import {ConfigPlugin} from "@expo/config-plugins";
import type {withAppLovinQualityServiceParams} from "../types/types";
import {
    withApplovinQualityServiceAndroid
} from '../with-applovin-quality-service-android/with-applovin-quality-service-android'
import {withApplovinQualityServiceIos} from "../with-applovin-quality-service-ios/with-applovin-quality-service-ios";

const withApplovinQualityService: ConfigPlugin<withAppLovinQualityServiceParams> = (config, {apiKey}) => {
    config = withApplovinQualityServiceAndroid(config, {apiKey});
    config = withApplovinQualityServiceIos(config);

    return config;
};

export default withApplovinQualityService
