jQuery(function ($) {
    "use strict";

    var staticPageUrls = {
        'en': {
            '/browser/de/einreichungsprozess': '/browser/deposition-process',
            '/browser/de/datenuebergabevertrag': '/browser/deposition-agreement',
            '/browser/de/dateinamen-formate-metadaten': '/browser/filenames-formats-metadata',
            '/browser/de/faq': '/browser/faq',
            '/browser/de/weiterfuehrende-informationen': '/browser/further-guidance',
            '/browser/de/technischer-aufbau': '/browser/technical-setup',
            '/browser/de/api-zugriff': '/browser/api-access',
            '/browser/de/sammlungsstrategie': '/browser/collection-policy',
            '/browser/de/konservierungsrichtlinien': '/browser/preservation-policy',
            '/browser/de/datenschutzbestimmungen': '/browser/privacy-policy',
            '/browser/de/nutzungsbedingungen': '/browser/terms-of-use',
            '/browser/de/ueber-arche': '/browser/about-arche'
        },

        'de': {
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
        }
    };

    var siteLang = "";
    var fullUrl = window.location.href;

    /*** MAIN JS FOR THE THEME ***/

    $(document).ready(function () {
        siteLang = drupalSettings.arche_core_gui.gui_lang;
        checkStaticPageLanguage();
        initOntologyTable();
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
            // Redirect to the target page with the input value as a parameter.
            window.location.href = '/browser/discover/?q=' + inputValue;
        });
    });

    $('.mobile-menu-close').on('click', function (event) {
        event.preventDefault();
        $('.mobile-menu').removeClass('show');
    });

    /**
     * Fetch the filenames static page ontology table
     * @returns {undefined}
     */
    function initOntologyTable() {
        if (fullUrl.includes('/browser/filenames-formats-metadata')) {
            $.ajax({
                url: '/browser/api/ontologyjs/en', // The URL to send the request to
                method: 'GET', // The HTTP method to use (GET, POST, etc.)
                success: function (response) {
                    $('#metadata-table').html(response);
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);        // This function runs if there is an error
                }
            });
        } else if (fullUrl.includes('/browser/de/dateinamen-formate-metadaten')) {
             $.ajax({
                url: '/browser/api/ontologyjs/de', // The URL to send the request to
                method: 'GET', // The HTTP method to use (GET, POST, etc.)
                success: function (response) {
                    $('#metadata-table').html(response);
                },
                error: function (xhr, status, error) {
                    console.error('Error:', error);        // This function runs if there is an error
                }
            });
        }
    }

    function checkStaticPageLanguage() {
        var path = '/browser/de/';
        // Find the starting index of the specific path
        var startIndex = fullUrl.indexOf(path);
        if (startIndex !== -1 && siteLang === 'en') {
            changeSiteLanguage('de', true);
        }
    }

    /**
     * DRUPAL layouts doesnt support translations, so we have to change the
     * static pages manually if we change the site language
     * @param {type} lng
     * @returns {undefined}
     */
    function switchTranslations(lng) {

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
            for (var key in staticPageUrls[lng]) {
                if (staticPageUrls[lng].hasOwnProperty(key)) {
                    // Check if the key equals the example string
                    if (key === extractedUrlPart) {
                        window.location.href = baseUrl + staticPageUrls[lng][key];
                    } else if (staticPageUrls[lng][key] === extractedUrlPart) {
                        //window.location.href = baseUrl + key;
                        //location.reload();
                    }
                }
            }
        }
    }

    /**
     * Call the site gui language change API
     * @param {type} lang
     * @returns {undefined}
     */
    function changeSiteLanguage(lng, reload = false) {
        $.ajax({
            url: '/browser/api/change_lng/' + lng,
            type: "POST",
            success: function (data, status) {
                if (reload) {
                    location.reload();
                }
                switchTranslations(lng);
            },
            error: function (message) {
                return message;
            }
        });
    }

    /**
     * Check that the user changed the language on the gui, if yes then we do 
     * a small api call, to change the drupal session language variable
     */
    $('.language-switcher-language-session-arche').on('click', function (event) {
        let lng = $(this).data('lang');
        changeSiteLanguage(lng, true);
        event.preventDefault();
    });

    $(document).delegate("a#footer-versions-btn", "click", function (e) {
        e.preventDefault();
        if ($('.arche-footer-bottom-versions').hasClass('hidden')) {
            $('.arche-footer-bottom-versions').removeClass('hidden');
            $('.arche-footer-bottom-versions').addClass('d-flex');
        } else {
            $('.arche-footer-bottom-versions').removeClass('d-flex');
            $('.arche-footer-bottom-versions').addClass('hidden');
        }
    });

});