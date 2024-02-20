jQuery(function ($) {
    "use strict";
    
    
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