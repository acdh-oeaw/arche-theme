jQuery(function ($) {
    "use strict";


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
            // Redirect to the target page with the input value as a parameter.
            window.location.href = '/browser/discover/' + inputValue;
        });

    });

   



    /**
     * Check that the user changed the language on the gui, if yes then we do 
     * a small api call, to change the drupal session language variable
     */
    $('.language-switcher-language-session-oeaw').on('change', function (event) {

        event.preventDefault();
        let lng = $(this).val();
        console.log(lng);
        $.ajax({
            url: '/browser/api/change_lng/' + lng,
            type: "POST",
            success: function (data, status) {
                console.log('success');
                location.reload();
            },
            error: function (message) {
                return message;
            }
        });


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