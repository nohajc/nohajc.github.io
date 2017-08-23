// ==UserScript==
// @name         Jeste Lepsi TV
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.xn--lep-tma39c.tv/onlinetv/*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

// prevent conflict of different jQuery instances
this.$ = this.jQuery = jQuery.noConflict(true);


// a minimal jQuery library for reacting to innerHTML changes
(function($) {
  $.fn.change = function(cb, e) {
    e = e || { subtree:true, childList:true, characterData:true };
    $(this).each(function() {
      function callback(changes) { cb.call(node, changes, this); }
      var node = this;
      (new MutationObserver(callback)).observe(node, e);
    });
  };
})(jQuery);

(function() {
    function ifElemAdded(changes, selector, handler) {
        for (var i = 0; i < changes.length; i++) {
            var elem = $(changes[0].addedNodes).filter(selector).eq(0);
            if (elem.length == 1) {
                handler(elem);
                break;
            }
        }
    }

    // Override clappr.js with our patched version that supports HEVC
    var scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = 'https://nohajc.github.io/clappr-hevc/clappr.js';
    document.head.appendChild(scriptTag);

    // Wait for the settings screen to appear
    $("#wrap").change(function(changes) {
        ifElemAdded(changes, "#settings", function(elem) {
            elem.find("div.settings_menu").append('<div data-menu="system" class="settings_menu_item global_pointer" onclick="settings.ClickMenu(\'system\');">Systém</div>');
        });
    });

    // Make controls bar translucent
    $('.ctrls-bot').css('background-color', 'rgba(28,27,33,0.3)');
})();
