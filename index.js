const { Plugin } = require('powercord/entities');
const { getModule, spotify } = require('powercord/webpack');
const Modules = getModule(['initialize', 'wasAutoPaused'], false);

module.exports = class FuckAutoPause extends Plugin {
   startPlugin() {
      Modules._wasAutoPaused = Modules.__proto__.wasAutoPaused;
      Modules.__proto__.wasAutoPaused = () => false;
      spotify._pause = spotify.pause;
      spotify.pause = () => void 0;
   }

   pluginWillUnload() {
      Modules.__proto__.wasAutoPaused = Modules._wasAutoPaused;
      spotify.pause = spotify._pause;
   }
};