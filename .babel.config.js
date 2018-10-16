module.exports = () => ({
  "presets": [["@babel/preset-env", {
    "targets": {
      "ie": 11
    },
    "modules": false
  }], "@babel/preset-react"],
  "env": {
    "test": {
      "presets": [["@babel/preset-env", {
        "targets": {
          "ie": 11
        }
      }], "@babel/preset-react"]
    }
  }
});

