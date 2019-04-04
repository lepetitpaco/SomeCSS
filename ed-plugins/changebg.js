const Plugin = require('../plugin');

module.exports = new Plugin({
    name: 'Change BG',
    author: 'Paco',
    description: "Changes the bg",
    color: 'red',

    load: async function() {
        setInterval(
            function() {
                var start = Date.now();
                document.documentElement.style.setProperty("--background-url", 'url(https://somecss.lepetitpaco.fr/backgrounds/test/randomimg.php?v='+start+')');
            },60000);
    }
  
    
});