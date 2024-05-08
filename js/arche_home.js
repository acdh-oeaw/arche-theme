jQuery(function ($) {

    "use strict";

    fetchTopcollections();
    var smartSearchInputField = $('#sm-hero-str');
    var preferredLang = drupalSettings.arche_core_gui.gui_lang;
    
    $(document).ready(function () {
        
    });

    smartSearchInputField.autocomplete({
        minLength: 2, // Minimum number of characters to trigger autocomplete
        autoFocus: false,
        open: function() {
            $("ul.ui-menu").width( $(this).innerWidth() );        
        }
        
    });

    // Attach keyup event listener to the input field
    smartSearchInputField.on('keyup', function () {
        if (event.keyCode !== 37 && // Left arrow
            event.keyCode !== 38 && // Up arrow
            event.keyCode !== 39 && // Right arrow
            event.keyCode !== 40    // Down arrow
        ) {
            // Get the current value of the input field
            var inputValue = $(this).val();

            // Check if the input value is at least 2 characters long
            if (inputValue.length >= 2) {
                console.log("inputvalue: " + inputValue);
                // Make an AJAX request to your API
                $.ajax({
                    url: '/browser/api/smsearch/autocomplete/'+inputValue,
                    method: 'GET',
                    success: function (data) {
                        console.log("success...");
                        var responseObject = $.parseJSON(data);
                        console.log(responseObject);
                        // Initialize autocomplete with the retrieved results
                        smartSearchInputField.autocomplete({source: []});
                        smartSearchInputField.autocomplete({
                            source: responseObject
                        });
                        // Open the autocomplete dropdown
                        smartSearchInputField.autocomplete('search');
                        console.log("success end");
                    },
                    error: function (xhr, status, error) {
                        console.error('Error fetching autocomplete data:', error);
                    }
                });
            }
        }
    });


    function fetchTopcollections() {
        $.ajax({
            url: '/browser/api/topcollections/12/en',
            type: "GET",
            success: function (data, status) {
                if (data) {
                    console.log(data);

                    var carouselItems = '';
                    var keys = Object.keys(data);
                    var active = "";
                    for (var i = 0; i < keys.length; i += 4) {
                        if(i === 0) {
                            active = 'active';
                        } else {
                            active = "";
                        }
                        carouselItems += '<div class="carousel-item '+active+'">' +
                                '<div class="row row-cols-1 row-cols-md-4 g-4">';
                        for (var j = 0; j < 4 && (i + j) < keys.length; j++) {
                            var id = keys[i + j];
                            var item = data[id];
                            carouselItems += '<div class="col">' +
                                    '<div class="card">' +
                                    '<img src="https://arche-thumbnails.acdh.oeaw.ac.at/' + item.identifier.replace('https://', '') + '?width=350" class="card-img-top" alt="' + item.title + '">' +
                                    '<div class="card-body">' +
                                    '<h5 class="card-title">' + item.title + '</h5>' +
                                    '<p class=card-text>' + item.description.slice(0, 200) + '...</p>' +
                                    '<a class="btn basic-arche-btn home-collections-btn" href="/browser/metadata/' + id + '">' + Drupal.t("More") + '</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                        }
                        carouselItems += '</div></div>';
                    }

                    
                    $('#multi-item-carousel .carousel-inner').html(carouselItems);

                    // Initialize the Bootstrap carousel
                    //$('#multi-item-carousel').carousel({
                      //  interval: false,
                      //  wrap: false
                    //});

                    // Set the number of visible elements (in this case, 4)
                    $('.carousel-inner .carousel-item').slice(0, 1).addClass('active');


                }

                $('#home-slider-loader').fadeOut('slow');
                $('#home-collections-slider-loader').fadeOut('slow');
                $('#detail-overview-api-div').html(data);
            },
            error: function (xhr, status, error) {
                $('#home-slider-loader').fadeOut('slow');
                $('#home-collections-slider-loader').fadeOut('slow');
                $('#detail-overview-api-div').html(error);
            }
        });
    }



    

});