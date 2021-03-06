module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "assets": "./src/assets",
      },
      "extensions": [
        ".ios.js",
        ".android.js",
        ".js",
        ".json"
      ]
    }]
  ],
};
