/**
 * @name YoutubeBackgroundV2
 * @author lepetitpaco
 * @version 1
 * @description A Video Background ; Need to change the link inside the plugin, no setting field..
 * @authorId 152431535914614785
 * @invite fuz2Dyy
 * @donate https://paypal.me/lepetitpaco?locale.x=fr_FR
 * @website https://github.com/lepetitpaco/SomeCSS/tree/master/
 */

const config = { "info": { "name": "Youtube Background V2", "authors": [{ "name": "Lepetitpaco", "discord_id": "152431535914614785", "github_username": "lepetitpaco" }], "version": "2", "description": "A youtube Video as a background", "github": "https://github.com/lepetitpaco/SomeCSS" }, "main": "index.js", "defaultConfig": [{ "type": "textbox", "id": "videoLink", "name": "Video  Link", "note": "Change the link of the video you want as a background. Has to have the file extension.", "value": "" }] };
var YoutubeBackgroundV2 = (() => {

    return !global.ZeresPluginLibrary ? class {
        getName() { return config.info.name; } getAuthor() { return config.info.authors.map(a => a.name).join(", "); } getDescription() { return config.info.description; } getVersion() { return config.info.version; }
        showAlert() { window.mainCore.alert("Library Missing", `The Library needed for this plugin is missing, please download it from here: <a href="https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BetterDiscordAddons/master/Plugins/ZeresPluginLibrary/0PluginLibrary.plugin.js">https://github.com/rauenzi/BetterDiscordAddons/tree/master/Plugins/ZeresPluginLibrary</a>`); } load() { this.showAlert(); } start() { this.showAlert(); } stop() { }
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Library) => {

            const {BdApi, Logger, Patcher, Settings, PluginUtilities, DiscordModules, DiscordSelectors, ReactTools, DOMTools, Utilities, WebpackModules } = Library;

            var player;

            function YouTubeGetID(url) {
                var ID = '';
                url = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
                if (url[2] !== undefined) {
                    ID = url[2].split(/[^0-9a-z_\-]/i);
                    ID = ID[0];
                }
                else {
                    ID = url;
                }
                return ID;
            }

            // Load the Video
            function  initVideo() {
                player = new YT.Player("video-placeholder", {
                    width: 1920,
                    height: 1080,
                    videoId: "",
                    playerVars: {
                        color: 'white',
                        playlist: ''
                    },
                    events: {
                        onReady: onPlayerReady,
                        onStateChange: onPlayerStateChange,
                        onError: onPlayerError
                    }
                })
            }

            //Create DOM Elements
            function createFrame() {
                console.log("createFrame");

                const videoframecontainer = `
                <div id="video-placeholder" style="position:absolute; z-index:-9998;"></div>
            `;

                if (typeof (videoplaceholder) === 'undefined') {
                    var videoplaceholder = $('video-placeholder');
                    $('body').prepend(videoframecontainer);
                }
            }

            function createButtons() {
                console.log("creatButtons");

                const videoinputfield = `

            <div id="video-input-container">
                <input id="video-idinput" class="search-36MZv- search-2oPWTC searchBar-3dMhjb"></input>
            </div>
   
            `;

                const startbuttonicon = `
            <div id="video-startbutton" class="iconWrapper-2OrFZ1 clickable-3rdHwn focusable-1YV_-H">
                <svg id="video-startbuttonsvg" class="video-startbuttonsvg icon-22AiRD da-icon" x="0" y="0" aria-hidden="false" width="24" height="24" viewBox="0 0 32 32" fill="none">
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M16,0C7.164,0,0,7.164,0,16s7.164,16,16,16s16-7.164,16-16S24.836,0,16,0z M24,18h-6v6h-4v-6H8v-4h6 V8h4v6h6V18z" />
                </svg>
            </div>
            `;


                const playbuttonicon = `
            <div id="video-playbutton" class="iconWrapper-2OrFZ1 clickable-3rdHwn focusable-1YV_-H">
                <svg id="video-playbuttonsvg" class="video-playbuttonsvg icon-22AiRD da-icon" x="0" y="0" aria-hidden="false" width="24" height="24" viewBox="0 0 32 32" fill="none">
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="m16,0c-8.836,0 -16,7.164 -16,16s7.164,16 16,16s16,-7.164 16,-16s-7.164,-16 -16,-16zm-6,24l0,-16l16.008,8l-16.008,8z" />
                </svg>
            </div>
            `;


                const mutebuttonicon = `
            <div id="mute-button" class="iconWrapper-2OrFZ1 clickable-3rdHwn focusable-1YV_-H">
                <svg id="mute-toggle" class="video-mutebuttonsvg icon-22AiRD da-icon" x="0" y="0" aria-hidden="false" width="24" height="24" viewBox="0 0 32 32" fill="none">
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M19.45,4.11a1,1,0,0,0-1,.09L10.67,10H3a1,1,0,0,0-1,1V21a1,1,0,0,0,1,1h7.67l7.73,5.8A1,1,0,0,0,20,27V5A1,1,0,0,0,19.45,4.11Z" />
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" fill="currentColor" d="M27.41,16l2.29-2.29a1,1,0,0,0-1.41-1.41L26,14.59l-2.29-2.29a1,1,0,0,0-1.41,1.41L24.59,16l-2.29,2.29a1,1,0,1,0,1.41,1.41L26,17.41l2.29,2.29a1,1,0,0,0,1.41-1.41Z" />
                </svg>
            </div>
            `;

                if (typeof (inputcontainer) === 'undefined') {
                    var inputcontainer = $('video-input-container');
                    $('.toolbar-1t6TWx').prepend(videoinputfield);
                }
                if (typeof (startbutton) === 'undefined') {
                    var startbutton = $('video-startbutton');
                    $('.toolbar-1t6TWx').prepend(startbuttonicon);
                }
                if (typeof (playbutton) === 'undefined') {
                    var playbutton = $('video-playbutton');
                    $('.toolbar-1t6TWx').prepend(playbuttonicon);
                }
                if (typeof (mutebutton) === 'undefined') {
                    var mutebutton = $('mute-button');
                    $('.toolbar-1t6TWx').prepend(mutebuttonicon);
                }
            }

            // When player ready do
            function onPlayerReady(event) {

                // play video when player ready and add playing class to the button since the video starts on load
                player.playVideo();
                $('#video-playbutton').addClass("playing");
                $('#video-placeholder').addClass("playing");
                $('#video-playbutton').addClass("selected-1GqIat");

               
                // Play & Pause the video on button click
                $('#video-playbuttonsvg').on('click', function () {
                    if ($('#video-playbutton').hasClass("playing")) {
                        player.pauseVideo();
                        $('.ytp-pause-overlay').attr('style', 'z-index:9999');
                        $('#video-playbutton').addClass("paused").removeClass("playing").removeClass("selected-1GqIat");
                        $('#video-placeholder').addClass("paused").removeClass("playing");
                    } else if ($('#video-playbutton').hasClass("paused")) {
                        player.playVideo();
                        $('#video-playbutton').addClass("playing").removeClass("paused").addClass("selected-1GqIat");
                        $('#video-placeholder').addClass("playing").removeClass("paused");
                    }
                });

                //Add video to queue on button click
                $('#video-startbuttonsvg').on('click', function () {

                    var id = YouTubeGetID($('#video-idinput').val());
                    player.cueVideoById(id);
                    player.playVideo();
                })

                //Mute & Unmute the video on button click
                $('#mute-toggle').on('click', function () {

                    if ($('#mute-button').hasClass("muted")) {
                        player.unMute();
                        $('#mute-button').removeClass("muted").removeClass("selected-1GqIat");
                    } else {
                        player.mute();
                        $('#mute-button').addClass("muted").addClass("selected-1GqIat");
                    }
                });

                $('a[title*="youtube.com"]').on('click', function () {

                    console.log("linkclick")
                    $(this).attr('target', '_self');
                    var id = YouTubeGetID($(this).attr("href"));
                    player.cueVideoById(id);
                    player.playVideo();


                })
                $('a[title*="youtu.be"]').on('click', function () {

                    console.log("linkclick")
                    $(this).attr('target', '_self');
                    var id = YouTubeGetID($(this).attr("href"));
                    player.cueVideoById(id);
                    player.playVideo();

                })
            }

            function onPlayerStateChange(event) {

                // Loop Video    
                if (event.data === YT.PlayerState.ENDED) {
                    player.playVideo();
                }

                // Disable Captions
                player.unloadModule("captions");
                player.unloadModule("cc");
            }

            function onPlayerError(event) {
                $('#video-placeholder').addClass("error");
            }

            
            function onlinkclick(){
                $('a[title*="youtube.com"]').on('click', function () {

                    console.log("linkclick")
                    $(this).attr('target', '_self');
                    var id = YouTubeGetID($(this).attr("href"));
                    player.cueVideoById(id);
                    player.playVideo();


                })
                $('a[title*="youtu.be"]').on('click', function () {

                    console.log("linkclick")
                    $(this).attr('target', '_self');
                    var id = YouTubeGetID($(this).attr("href"));
                    player.cueVideoById(id);
                    player.playVideo();


                })
            }

            return class VideoBackground extends Plugin {
                constructor() {super();}

                onLoad(){}
                onStart() {
                    onlinkclick();
                    createFrame();
                    createButtons();
                    this.loadVideo();
                }
                onStop() {this.unloadVideo();}

                onSwitch(){
                    createButtons();
                    $('a[title*="youtube.com"]').on('click', function () {

                        console.log("linkclick")
                        $(this).attr('target', '_self');
                        var id = YouTubeGetID($(this).attr("href"));
                        player.cueVideoById(id);
                        player.playVideo();


                    })
                    $('a[title*="youtu.be"]').on('click', function () {

                        console.log("linkclick")
                        $(this).attr('target', '_self');
                        var id = YouTubeGetID($(this).attr("href"));
                        player.cueVideoById(id);
                        player.playVideo();

                    })
                    
                    if ($('#video-placeholder').hasClass("paused")) {  
                        $('#video-playbutton').addClass("paused").removeClass("playing").removeClass("selected-1GqIat");
                        $('#video-placeholder').addClass("paused").removeClass("playing");

                    } else {
                        $('#video-playbutton').addClass("playing").removeClass("paused").addClass("selected-1GqIat");
                        $('#video-placeholder').addClass("playing").removeClass("paused");
                    }

                    // Play & Pause the video on button click
                    $('#video-playbuttonsvg').on('click', function () {
                        if ($('#video-playbutton').hasClass("playing")) {
                            player.pauseVideo();
                            $('.ytp-pause-overlay').attr('style', 'z-index:9999');
                            $('#video-playbutton').addClass("paused").removeClass("playing").removeClass("selected-1GqIat");
                            $('#video-placeholder').addClass("paused").removeClass("playing");
                        } else if ($('#video-playbutton').hasClass("paused")) {
                            player.playVideo();
                            $('#video-playbutton').addClass("playing").removeClass("paused").addClass("selected-1GqIat");
                            $('#video-placeholder').addClass("playing").removeClass("paused");
                        }
                    });

                    $('.js-youtube-vid').on('change', function () {

                        

                    });

                    //Add video to queue on button click
                    $('#video-startbuttonsvg').on('click', function () {

                        var id = YouTubeGetID($('#video-idinput').val());
                        player.cueVideoById(id);
                        player.playVideo();
                    })

                    //Mute & Unmute the video on button click
                    $('#mute-toggle').on('click', function () {

                        if ($('#mute-button').hasClass("muted")) {
                            player.unMute();
                            $('#mute-button').removeClass("muted").removeClass("selected-1GqIat");
                        } else {
                            player.mute();
                            $('#mute-button').addClass("muted").addClass("selected-1GqIat");
                        }
                    });
                }//switch end

                
                loadVideo() {
                    $(document).ready(function () {
                        $.getScript("https://www.youtube.com/iframe_api", function () {
                            initVideo();
                            

                        });
                    })
                }

                unloadVideo() {
                    var videoplaceholder = document.getElementById("video-placeholder");
                    var inputcontainer = document.getElementById("video-input-container");
                    var startbutton = document.getElementById("video-startbutton");
                    var playbutton = document.getElementById("video-playbutton");
                    var mutebutton = document.getElementById("mute-button");

                    videoplaceholder.parentNode.removeChild(videoplaceholder);
                    inputcontainer.parentNode.removeChild(inputcontainer);
                    startbutton.parentNode.removeChild(startbutton);
                    playbutton.parentNode.removeChild(playbutton);
                    mutebutton.parentNode.removeChild(mutebutton);
                }
            };
        };
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();


