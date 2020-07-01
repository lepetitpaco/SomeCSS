/**
 * @name VideoBackground
 * @author lepetitpaco
 * @version 1
 * @description A Video Background ; Need to change the link inside the plugin, no setting field..
 * @authorId 152431535914614785
 * @invite fuz2Dyy
 * @donate https://paypal.me/lepetitpaco?locale.x=fr_FR
 * @website https://github.com/lepetitpaco/SomeCSS/tree/master/
 */

const config = { "info": { "name": "VideoBackground", "authors": [{ "name": "Lepetitpaco", "discord_id": "152431535914614785", "github_username": "lepetitpaco" }], "version": "2", "description": "Enables a video background.", "github": "https://github.com/lepetitpaco/SomeCSS" }, "main": "index.js", "defaultConfig": [{"type": "textbox", "id": "videoLink", "name": "Video  Link", "note": "Change the link of the video you want as a background. Has to have the file extension.", "value": "" }] };



var VideoBackground = (() => {

    return !global.ZeresPluginLibrary ? class {
        getName() { return config.info.name; } getAuthor() { return config.info.authors.map(a => a.name).join(", "); } getDescription() { return config.info.description; } getVersion() { return config.info.version; }
        showAlert() { window.mainCore.alert("Library Missing", `The Library needed for this plugin is missing, please download it from here: <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BetterDiscordAddons/master/Plugins/ZeresPluginLibrary/0PluginLibrary.plugin.js">https://github.com/rauenzi/BetterDiscordAddons/tree/master/Plugins/ZeresPluginLibrary</a>`); } load() { this.showAlert(); } start() { this.showAlert(); } stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Library) => {

            const { Settings } = Library;


            return class VideoBackground extends Plugin {
                constructor() {super();}

                onLoad(){}
                onStart() {this.loadVideo();}
                onStop() {this.unloadVideo();}

                getSettingsPanel(){
                    const panel = this.buildSettingsPanel();
                    panel.addListener(this.updateSettings.bind(this));
                    return panel.getElement();
                }

                updateSettings() {
                    this.unloadVideo();
                    this.loadVideo();
                }

                loadVideo() {
                    if (typeof (videolayer) == 'undefined') {
                        const videotagdiv = document.createElement('div');
                        videotagdiv.setAttribute('class', 'fullscreen-bg');
                        videotagdiv.setAttribute('id', 'videoDiv');
                        videotagdiv.innerHTML = '<video id="videoloop" loop muted autoplay></video>';
                        document.body.prepend(videotagdiv);
                        var source = document.getElementById("videoloop");
                        source.setAttribute('src', this.settings.videoLink);
                        document.getElementById("videoloop").setAttribute('style', 'position: fixed;top:50 %;left:50 %;z-index:-9999;min-width:100%;min-height:100%;width: auto;height: auto;transform:translate(-50%,-50%;');
                    }
                }

                unloadVideo() {
                    var videolayer = document.getElementById("videoDiv");
                    videolayer.parentNode.removeChild(videolayer);
                }
            };
        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();