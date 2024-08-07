jQuery(function ($) {
    "use strict";

    var staticPageUrls = {
        '/browser/deposition-process': '/browser/de/einreichungsprozess',
        '/browser/deposition-agreement': '/browser/de/datenuebergabevertrag',
        '/browser/filenames-formats-metadata': '/browser/de/dateinamen-formate-metadaten',
        '/browser/faq': '/browser/de/faq',
        '/browser/further-guidance': '/browser/de/weiterfuehrende-informationen',
        '/browser/technical-setup': '/browser/de/technischer-aufbau',
        '/browser/api-access': '/browser/de/api-zugriff',
        '/browser/collection-policy': '/browser/de/sammlungsstrategie',
        '/browser/preservation-policy': '/browser/de/konservierungsrichtlinien',
        '/browser/privacy-policy': '/browser/de/datenschutzbestimmungen',
        '/browser/terms-of-use': '/browser/de/nutzungsbedingungen',        
        '/browser/about-arche': '/browser/de/ueber-arche'        
    };

    /*** MAIN JS FOR THE THEME ***/

    $(document).ready(function () {


        /**
         * Remove the user menu menupoint and just leave the logout button
         */
        $('a[data-drupal-link-system-path="user"]').each(function () {
            $(this).parent('li').remove();
        });

        //if the user press the browser back button, then we need to reload the page
        // because of the ajax page refresh
        $(window).on('popstate', function () {
            $(".loader-div").show();
            location.reload(true);
        });

        $('#hero-smart-search-form').submit(function (event) {
            // Prevent the default form submission behavior.
            event.preventDefault();
            // Get the value of the input field.
            var inputValue = $('#sm-hero-str').val();
            console.log("HERO INPUT: " + inputValue);
            // Redirect to the target page with the input value as a parameter.
            window.location.href = '/browser/discover/?q=' + inputValue;
        });
    });

    $('.mobile-menu-close').on('click', function (event) {
        event.preventDefault();
        $('.mobile-menu').removeClass('show');
    });

    function switchTranslations() {
        var fullUrl = window.location.href;
        // Define the specific path to start extraction
        var path = '/browser/';

        // Find the starting index of the specific path
        var startIndex = fullUrl.indexOf(path);
        // Check if the path exists in the URL
        if (startIndex !== -1) {
            var baseUrl = fullUrl.substring(0, startIndex);
            // Extract the part of the URL starting from the specific path
            var extractedUrlPart = fullUrl.substring(startIndex);

            // Iterate over the object
            for (var key in staticPageUrls) {
                if (staticPageUrls.hasOwnProperty(key)) {
                    // Check if the key equals the example string
                    if (key === extractedUrlPart) {
                       window.location.href = baseUrl + staticPageUrls[key];
                    } else if (staticPageUrls[key] === extractedUrlPart) {
                        window.location.href = baseUrl + key;
                    }
                }
            }
        }
    }


    /**
     * Check that the user changed the language on the gui, if yes then we do 
     * a small api call, to change the drupal session language variable
     */
    $('.language-switcher-language-session-arche').on('click', function (event) {
        let lng = $(this).data('lang');
        $.ajax({
            url: '/browser/api/change_lng/' + lng,
            type: "POST",
            success: function (data, status) {
                //location.reload();
                switchTranslations();
            },
            error: function (message) {
                return message;
            }
        });
        event.preventDefault();

    });



    $(document).delegate("a#footer-versions-btn", "click", function (e) {
        console.log('itt');
        e.preventDefault();
        if ($('.arche-footer-bottom-versions').hasClass('hidden')) {
            console.log('hidden');
            $('.arche-footer-bottom-versions').removeClass('hidden');
            $('.arche-footer-bottom-versions').addClass('d-flex');
        } else {
            console.log('nem hidden');
            $('.arche-footer-bottom-versions').removeClass('d-flex');
            $('.arche-footer-bottom-versions').addClass('hidden');
        }

    });




});