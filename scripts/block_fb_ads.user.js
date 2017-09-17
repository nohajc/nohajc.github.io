// ==UserScript==
// @name        Facebook block ads
// @namespace   f.this.shit
// @include     https://www.facebook.com/*
// @version     1
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant       none
// ==/UserScript==


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

function ifElemAdded(changes, selector, handler) {
  for (var i = 0; i < changes.length; i++) {
    var elem = $(changes[0].addedNodes).filter(selector).eq(0);
    if (elem.length == 1) {
      handler(elem);
      break;
    }
  }
}

$("body").change(function(changes) {
  $("#pagelet_ego_pane").css("display", "none");
});
