jQuery(function ($) {

    "use strict";

    if ($('#home-latest-addition').length) {
        fetchFirstTopCollection();
    }
    if ($('#multi-item-carousel').length) {
        fetchTopcollections();
    }
    var smartSearchInputField = $('#sm-hero-str');
    var preferredLang = drupalSettings.arche_core_gui.gui_lang;
    var autocompleteTimeout = null;
    var autocompleteCounter = 1;

    $(document).ready(function () {

    });

    smartSearchInputField.autocomplete({
        minLength: 2, // Minimum number of characters to trigger autocomplete
        autoFocus: false,
        delay: 300,
        open: function () {
            $("ul.ui-menu").width($(this).innerWidth());
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
                if (autocompleteTimeout) {
                    // invalidate the previous autocomplete search
                    clearTimeout(autocompleteTimeout);
                }
                // make the AJAX query only if no further keyup events in next 0.3s
                autocompleteTimeout = setTimeout(() => {
                    autocompleteCounter++;
                    var localCounter = autocompleteCounter;
                    // Make an AJAX request to your API
                    $.ajax({
                        url: '/browser/api/smsearch/autocomplete/' + inputValue,
                        method: 'GET',
                        success: function (data) {
                            var responseObject = $.parseJSON(data);
                            // Initialize autocomplete with the retrieved results
                            smartSearchInputField.autocomplete({source: []});
                            smartSearchInputField.autocomplete({
                                source: responseObject
                            });
                            // Open the autocomplete dropdown
                            smartSearchInputField.autocomplete('search');
                        },
                        error: function (xhr, status, error) {
                            console.error('Error fetching autocomplete data:', error);
                        }
                    });
                }, 300);
            }
        }
    });

    function fetchFirstTopCollection() {
        $.ajax({
            url: '/browser/api/topcollections/1/' + drupalSettings.arche_core_gui.gui_lang,
            type: "GET",
            success: function (data, status) {
                if (!data) {
                    return;
                }

                var keys = Object.keys(data);
                if (!keys.length) {
                    return;
                }

                var id = keys[0];
                var item = data[id] || {};
                renderLatestAddition(id, item);
            },
            error: function (xhr, status, error) {
                // Keep the section empty on error.
            }
        });
    }

    function renderLatestAddition(id, item) {
        var $container = $('#home-latest-addition').addClass("container maxw-980");
        if (!$container.length) {
            return;
        }

        var id = item.identifier || '';
        var title = item.title || '';
        var description = item.description || '';
        var avDate = item.avDate || '';
        var modifyDate = item.modifyDate || '';
        var metadataDate = item.modifyDate || item.avDate || '';
        var year = extractYear(item.avDate);
        var labelDate = formatHeaderDate(modifyDate);
        var detailsUrl = '/browser/metadata/' + id;
        var identifierText = (item.identifier || '').replace(/^https?:\/\//, '');

        var $card = $('<article class="home-latest-addition" aria-label="Latest addition"></article>');
        var imageUrl = 'https://arche-thumbnails.acdh.oeaw.ac.at?id=' + encodeURIComponent(id) + '&width=600';
        var $media = $('<div class="home-latest-addition__media is-loading"></div>');
        var $mediaLoader = $('<div class="home-latest-addition__media-loader" aria-hidden="true"><span class="home-latest-addition__spinner"></span></div>');
        var $mediaImage = $('<img class="home-latest-addition__image" alt="' + title + '" loading="lazy" />');

        $mediaImage
            .on('load', function () {
                $media.removeClass('is-loading is-error').addClass('is-loaded');
                $mediaLoader.fadeOut(120, function () {
                    $(this).remove();
                });
            })
            .on('error', function () {
                $media.removeClass('is-loading').addClass('is-error');
                $mediaLoader.remove();
            });

        $media.append($mediaImage, $mediaLoader);
        $mediaImage.attr('src', imageUrl);

        // Handle cached images where load/error may have already happened.
        if ($mediaImage[0].complete) {
            if ($mediaImage[0].naturalWidth > 0) {
                $mediaImage.trigger('load');
            } else {
                $mediaImage.trigger('error');
            }
        }
        

        //$media.append($mediaMark);

        var $content = $('<div class="home-latest-addition__content"></div>');
        var $kicker = $('<p class="home-latest-addition__kicker"></p>').text(Drupal.t('Modified') + ' · ' + labelDate);
        var $title = $('<h3 class=""></h3>').text(title);
        var $desc = $('<p class="card-text"></p>').html(formatDescriptionHtml(description));

        var $meta = $('<div class="home-latest-addition__meta" aria-label="Collection metadata"></div>');
        var $metaYear = $('<span class="btn-toolbar-gray btn-toolbar-text no-btn"></span>').text(year);
        var $metaType = $('<span class="btn-toolbar-gray btn-toolbar-text no-btn"></span>').text(Drupal.t('TopCollection'));
        
        $meta.append($metaYear, $metaType);

        var buttonLabel = Drupal.t('More');
        var $button = $('<a class="home-latest-addition__button"></a>')
            .attr('href', detailsUrl)
            .attr('aria-label', Drupal.t('More: ') + title)
            .text(buttonLabel);

        if (identifierText) {
            $button.attr('title', identifierText);
        }

        $meta.append($button);
        $content.append($kicker, $title, $desc, $meta);
        $card.append($media, $content);

        $container.empty().append($card);
        $('#home-slider-loader').fadeOut('slow');
    }

    function extractYear(dateStr) {
        if (!dateStr) {
            return '';
        }
        var date = new Date(dateStr);
        if (Number.isNaN(date.getTime())) {
            return '';
        }
        return String(date.getUTCFullYear());
    }

    function formatHeaderDate(dateStr) {
        if (!dateStr) {
            return '';
        }
        var date = new Date(dateStr);
        if (Number.isNaN(date.getTime())) {
            return '';
        }
        return date.toLocaleDateString(undefined, {month: 'long', year: 'numeric'}).toUpperCase();
    }

    function formatDescriptionHtml(value) {
        var escaped = escapeHtml(String(value || ''));
        // Support both actual newlines and literal "\n" sequences.
        return escaped
            .replace(/\\n/g, '\n')
            .replace(/\r\n|\r|\n/g, '<br>');
    }

    function escapeHtml(value) {
        return value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function fetchTopcollections() {
        $.ajax({
            url: '/browser/api/topcollections/9999/' + drupalSettings.arche_core_gui.gui_lang,
            type: "GET",
            success: function (data, status) {
                if (data) {
                    var carouselItems = '';
                    var keys = Object.keys(data);
                    var active = "";
                    for (var i = 0; i < keys.length; i += 4) {
                        if (i === 0) {
                            active = 'active';
                        } else {
                            active = "";
                        }
                        var browserWidth = $(window).width();
                        var displayItem = 4;

                        if (browserWidth < 768) {
                            carouselItems += '<div class="carousel-item ' + active + '">' +
                                    '<div class="row row-cols-md-4 g-4">';
                            displayItem = 1;
                        } else if (browserWidth < 1024) {
                            carouselItems += '<div class="carousel-item ' + active + '">' +
                                    '<div class="row row-cols-md-12 g-4">';
                            displayItem = 2;
                        } else {
                            carouselItems += '<div class="carousel-item ' + active + '">' +
                                    '<div class="row row-cols-md-12 g-4">';
                            displayItem = 4;
                        }

                        for (var j = 0; j < displayItem && (i + j) < keys.length; j++) {
                            var id = keys[i + j];
                            var item = data[id];
                            var currentUrl = $(location).attr('href');
                            currentUrl = currentUrl.replace('/browser', '/api');
                            var imgSrc = 'https://arche-thumbnails.acdh.oeaw.ac.at?id=' + drupalSettings.arche_core_gui.apiUrl  +id;
                            carouselItems += '<div class="col">' +
                                    '<div class="card">' +
                                    '<a href="/browser/metadata/' + id + '"><img src="'+ imgSrc + '&width=350" class="card-img-top" alt="' + item.title + '"></a>' +
                                    '<div class="card-body">' +
                                    '<h3 class="card-title">' + item.title + '</h3>' +
                                    '<p class=card-text>' + item.description.slice(0, 200) + '...</p>' +
                                    '<a class="btn basic-arche-btn home-collections-btn" href="/browser/metadata/' + id + '">' + Drupal.t("More") + '</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                        }
                        carouselItems += '</div></div>';
                    }
                    $('#multi-item-carousel .carousel-inner').html(carouselItems);
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
