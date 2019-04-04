const Plugin = require("../plugin");

const toggleCSS = () => {
	const css = window.ED.plugins.css_loader;
	if (window.customCss || window.cssWatcher) css.unload();
	else css.load();
};

module.exports = new Plugin({
	name: "Quick Hide CSS", /* Human-readable plugin name. */
	author: "jakuski", /* [Optional] Put your name here to give yourself credit for making it :) */
	description: "Quickly hide your custom theme if you wanna take a screenshot for a normie cock sucking discord server.", /* Description of what this plugin does. */
	preload: false, /* [Optional] If true, load this before Discord has finished starting up */
	color: "#f44336", /* [Optional] The color that this plugin shows in logs and in the plugin settings tab. Any valid CSS color will work here. */
	load: () => document.onkeyup = (key) => {
		if (key.ctrlKey && key.which === 66) toggleCSS();
	},
	unload: () => document.onkeyup = null
});
