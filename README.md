# @crassaert/applovin-quality-service-expo-plugin

Add required packages to include AppLovin Quality Service/ Ad Review into an expo app.
This feature is not available into the former react native package so I decided to share my code with you.

If you want more informations, please check the [AppLovin Ad Review page](https://developers.applovin.com/en/max/ad-review/overview/)

## Install
Prior to this plugin install, you need to have `react-native-applovin-max` npm package installed and configured.
Then, you just have to install the plugin.

```sh
npx expo install @crassaert/applovin-quality-service-expo-plugin

# npm
npm install @crassaert/applovin-quality-service-expo-plugin

# yarn
yarn add @crassaert/applovin-quality-service-expo-plugin
```

## Configuration in app.json / app.config.js
### Plugin
Add the plugin to the **front** of the [plugin array](https://docs.expo.dev/versions/latest/config/app/). It should be added automatically if you ran `npx expo install`. Just make sure it is the first plugin in the array and to configure any desired plugin props:

**app.json**
```json
{
  "plugins": [
    [
      "@crassaert/applovin-quality-service-expo-plugin",
      {
        "apiKey": "myapikey",
        "iosSetupScriptPath": "scripts/AppLovinQualityServiceSetup-ios.rb"
      }
    ]
  ]
}
```

or

**app.config.js**
```js
export default {
  ...
  plugins: [
    [
      "@crassaert/applovin-quality-service-expo-plugin",
      {
        apikey: "myapikey",
        iosSetupScriptPath: "scripts/AppLovinQualityServiceSetup-ios.rb"
      }
    ]
  ]
};
```

### iOS additionnal step
In order to Ad Review work on iOS, you have to execute script between prebuild and build.

To do it automatically, the best way is to add a script on your package.json, thanks to eas hook system :

``` json title="package.json"
{
    scripts: {
        ...
        "eas-build-post-install": "[[ \"$EAS_BUILD_PLATFORM\" == \"ios\" ]] && ruby $EAS_BUILD_WORKINGDIR/ios/AppLovinQualityServiceSetup-ios.rb",
        ...
    }
}
```

#### Plugin Prop
You can pass props to the plugin config object to configure:

| Plugin Prop          |              |                                                   |
|----------------------|--------------|---------------------------------------------------|
| `apiKey`             | **required** | Your API key available in your AppLovin dashboard |
| `iosSetupScriptPath` | **required** | Your AppLovinQualityServiceSetup-ios.rb path      |

Feel free to contribute or open issues.
