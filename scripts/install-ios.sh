#!/bin/bash
set -e

if [[ "$EAS_BUILD_PLATFORM" == "ios" ]]; then
echo "Running AppLovinQualityServiceSetup-ios.rb "

SCRIPT_PATH="./ios/AppLovinQualityServiceSetup-ios.rb"

if [ -f "$SCRIPT_PATH" ]; then
    ruby "$SCRIPT_PATH"
    echo "AppLovinQualityServiceSetup-ios.rb executed successfully."
else
    echo "Error: Script not found at $SCRIPT_PATH"
    exit 1
fi
fi
