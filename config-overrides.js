const { alias } = require("react-app-rewire-alias");

module.exports = function override(config) {
	alias({
		"@src": "src",
		"@assets": "src/assets",
		"@helpers": "src/helpers",
		"@localization": "src/localization",
		"@store": "src/store",
		"@constants": "src/constants",
	})(config);

	return config;
};
