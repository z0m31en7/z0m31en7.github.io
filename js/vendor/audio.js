(function($) {
  "use strict";

  $(document).ready(function() {
    var isMobile = {
      Android: function() {
        return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
      }
    };

    // Audio
    var $body = $('body');
    var $audio = $('.audio-toggle');
    var $audioPlayer = document.getElementById('audio-player');

    if (isMobile.any()) {
      $body.addClass('mobile audio-off');
      $audioPlayer.pause();
    } else {
      $body.addClass('audio-on');
      $audioPlayer.play();
    }

    $audio.on('click', function(e) {
      e.preventDefault();
      $body.toggleClass('audio-on audio-off');
      if ($body.hasClass('audio-on')) {
        $audioPlayer.play();
      } else if ($body.hasClass('audio-off')) {
        $audioPlayer.pause();
      }
    });
  });

})(jQuery);
