jQuery(function ($) {
    "use strict";
    /* You can safely use $ in this code block to reference jQuery */
    var fullUrl = window.location.href;
    let optedInTxt = '<span class="privacy-checkmark">✓</span> You are currently opted in. <a href="#" id="opt-in-out-matomo">Click here</a> to opt out.';
    let optedOutTxt = '<span class="privacy-checkmark-out">X</span> You are currently opted out. <a href="#" id="opt-in-out-matomo">Click here</a> to opt in.';
    var cookiesAccepted = getCookie("cookiesAccepted");
    var cookiesAcceptedNecessary = getCookie("cookiesAcceptedNecessary");

    $(document).ready(function () {
        initPrivacyPolicyTracking();
    });



    /**
     * Check the actually selected tracking on the privacy page
     * @returns {undefined}
     */
    function initPrivacyPolicyTracking() {
        //update the text and checkbot with the actual value
        if (fullUrl.includes('/browser/privacy-policy') || fullUrl.includes('/browser/de/datenschutzbestimmungen')) {
            if (cookiesAcceptedNecessary === "true") {
                //show not checked checkbox and not in text
                $('#matomo-opt-text').html(Drupal.t(optedOutTxt));
            }
            if (cookiesAccepted === "true") {
                $('#matomo-opt-text').html(Drupal.t(optedInTxt));
            }
        }
    }


    /**
     * handle the click event on the privacy page, when the 
     * user changes the tracking settings
     */
    $(document).delegate("#opt-in-out-matomo", "click", function (e) {
        e.preventDefault();
        //get the actual chkbox value and change also the text
        var _paq = window._paq = window._paq || [];
        if (cookiesAcceptedNecessary === "true") {
            removeCookie("cookiesAcceptedNecessary");
            setCookie("cookiesAccepted", true, 180);
            setCookie("cookiesAcceptedNecessary", false);
            _paq.push(['trackPageView', 'enableLinkTracking']);
            $('#matomo-opt-text').html(optedInTxt);
        } else if (cookiesAccepted === "true") {
            removeCookie("cookiesAccepted");
            setCookie("cookiesAcceptedNecessary", true, 180);
            setCookie("cookiesAccepted", false, 180);
            //Once the function requireConsent is executed then no tracking request will be sent to Matomo and no cookies will be set.
            _paq.push(['requireConsent']);
            $('#matomo-opt-text').html(optedOutTxt);
        }
    });


    /**
     * Set the cookie
     * @param {type} cname
     * @param {type} cvalue
     * @param {type} exdays
     * @returns {undefined}
     */
    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/; SameSite=None; Secure";
    }

    /**
     * Remove cookie
     * @param {type} cname
     * @returns {undefined}
     */
    function removeCookie(cname) {
        document.cookie = cname + '=; Max-Age=-99999999;';
    }

    /**
     * Get the cookie
     * @param {type} cname
     * @returns {String}
     */
    function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    var _paq = window._paq = window._paq || [];
    if (!cookiesAccepted && !cookiesAcceptedNecessary) {
        $("#cookie-overlay").fadeIn(100);
        _paq.push(['requireConsent']);
    } else if (cookiesAccepted) {
        _paq.push(['trackPageView']);
        _paq.push(['trackPageView', 'enableLinkTracking']);
    }



    /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
    /**
     * First load tracking popup select
     */
    $(".cookie-accept-btn").on('click', function () {
        removeCookie("cookiesAcceptedNecessary");
        setCookie("cookiesAccepted", true, 180);
        _paq.push(['trackPageView']);
        $("#cookie-overlay").fadeOut(100);
    });
    /**
     * First load tracking popup select
     */
    $(".cookie-accept-necessary-btn").on('click', function () {
        removeCookie("cookiesAccepted");
        setCookie("cookiesAcceptedNecessary", true, 180);
        //Once the function requireConsent is executed then no tracking request will be sent to Matomo and no cookies will be set.
        _paq.push(['requireConsent']);

        $("#cookie-overlay").fadeOut(100);
    });

    (function () {
        var u = "https://matomo.acdh.oeaw.ac.at/";
        _paq.push(['setTrackerUrl', u + 'piwik.php']);
        _paq.push(['setSiteId', '71']);
        var d = document, g = d.createElement('script'), s = d.getElementsByTagName('script')[0];
        g.async = true;
        g.src = u + 'piwik.js';
        s.parentNode.insertBefore(g, s);
    })();
    
    
   

});
