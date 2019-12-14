const path = require("path");

module.exports = {
	outputDir: path.resolve(__dirname, "client/build"),
	devServer: {
		proxy: {
			"/send": {
				target: process.env.API_PROXY_URL
			}
		}
	}
};