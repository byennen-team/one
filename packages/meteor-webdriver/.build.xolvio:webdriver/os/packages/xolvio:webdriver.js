(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                       //
// packages/xolvio:webdriver/server.js                                                                   //
//                                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                         //
/*jshint -W117, -W030, -W016 */                                                                          // 1
/* global                                                                                                // 2
 DEBUG:true                                                                                              // 3
 */                                                                                                      // 4
                                                                                                         // 5
wdio = {};                                                                                               // 6
                                                                                                         // 7
DEBUG = !!process.env.VELOCITY_DEBUG;                                                                    // 8
                                                                                                         // 9
(function () {                                                                                           // 10
  'use strict';                                                                                          // 11
                                                                                                         // 12
  if (process.env.NODE_ENV !== 'development' || process.env.VELOCITY === '0' || process.env.IS_MIRROR) { // 13
    return;                                                                                              // 14
  }                                                                                                      // 15
                                                                                                         // 16
  wdio.instance = Npm.require('webdriverio');                                                            // 17
                                                                                                         // 18
  wdio.chai = Npm.require('chai');                                                                       // 19
                                                                                                         // 20
  wdio.getGhostDriverClient = function (options) {                                                       // 21
    // TODO find the phantomjs installation                                                              // 22
    // exec phantomjs --webdriver 4444                                                                   // 23
    wdio.client = wdio.instance.remote(options).init();                                                  // 24
    return wdio.client;                                                                                  // 25
  };                                                                                                     // 26
                                                                                                         // 27
})();                                                                                                    // 28
///////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
