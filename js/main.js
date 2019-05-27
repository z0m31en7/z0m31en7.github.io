/*
Site: z0m31en7.github.io
Author: Mr.SAGE
Version: 1.0
=============================================
*/

(function($) {
    "use strict";

    /**
     * Window Load
     */
    $(window).on('load', function() {

        /** Loader */
        var loader = $(".loader");
        var wHeight = $(window).height();
        var wWidth = $(window).width();
        var i = 0;

        /** Center loader on half screen */
        loader.css({
            top: wHeight / 2 - 2.5,
            left: wWidth / 2 - 200
        })

        do {
            loader.animate({
                width: i
            }, 10)
            i += 3;
        } while (i <= 400)
        if (i === 402) {
            loader.animate({
                left: 0,
                width: '100%'
            })
            loader.animate({
                top: '0',
                height: '100vh'
            })
        }

        /** This line hide loader and show content */
        setTimeout(function() {
            $(".loader-wrapper").fadeOut('fast');
            (loader).fadeOut('fast');
            /*Set time in milisec */
        }, 3500);


        /** Background Image
        ----------------------------*/
        $(".bg-image").each(function() {
            var $imgPath = $(this).attr('data-image');
            $(this).css('background-image', 'url(' + $imgPath + ')');
        });

        /** Portfolio Isotope */
        $(".gallery").isotope({
            itemSelector: '.gallery-item',
                percentPosition: true,
        });

        // isotope click function
        $(".gallery-menu ul li button").on('click', function(e) {
            e.preventDefault();
            $(".gallery-menu ul li button").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');
            $(".gallery").isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });
            return false;
        });

    });


    /**
     * Document Ready
     */
    $(document).ready(function() {

        /** Typed.js (Text typing effect) */
        $(".typed").typed({
            stringsElement: $(".typed-strings"),
            loop: true,
            backDelay: 2000
        });


        /** Navigation */
        $(".nav-toggle, .resume-close").on('click', function(e) {
            e.preventDefault();
            $('body').toggleClass('menu-open');
        });


        /** Custom Scrollbar */
        $(".section-resume").mCustomScrollbar({
            theme: 'minimal-dark',
            axis: 'y'
        });


        /** Progress Bar */
        $(".progress-bar").each(function() {
            var $imgPath = $(this).attr('data-percent');
            $(this).css('width', $imgPath + '%');
        });


        // magnific popup for portfolio
        $(".popup-image").magnificPopup({
            type: 'image',
        });

        $(".popup-video").magnificPopup({
            type: 'iframe',
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' + '<div class="mfp-close"></div>' + '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' + '</div>',

                patterns: {
                    youtube: {
                        index: 'youtube.com/',
                        id: 'v=',
                        src: 'http://www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                },

                srcAction: 'iframe_src',
            }
        });


        /** Contact Form */
        $(".contact-form").on('submit', function(e) {
            e.preventDefault();
            var name = $("#name").val();
            var email = $("#email").val();
            var subject = $("#subject").val();
            var message = $("#message").val();
            var dataString = 'name=' + name + '&email=' + email + '&subject=' + subject + '&message=' + message;

            function isValidEmail(emailAddress) {
                var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
                return pattern.test(emailAddress);
            };

            if (isValidEmail(email) && (message.length > 1) && (name.length > 1)) {
                $.ajax({
                    type: 'POST',
                    url: 'php/contact.php',
                    data: dataString,
                    success: function() {
                        $(".success").fadeIn(1000);
                        $(".error").fadeOut(500);
                    }
                });
            } else {
                $(".error").fadeIn(1000);
                $(".success").fadeOut(500);
            }

            return false;
        });

    });

})(jQuery);
