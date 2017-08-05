$(function() {

    var alignModal = function() {
        var modalDialog = $(this).find(".modal-dialog");
        // Applying the top margin on modal dialog to align it vertically center */
        modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
    };

    $(".modal").on("shown.bs.modal", alignModal);

    // Align modal when user resize the window
    $(window).on("resize", function() {
        $(".modal:visible").each(alignModal);
    });

    $('.scroll-to').on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href') || $(this).data('target');
        $('html, body').animate({
            scrollTop: $(target).offset().top - 80
        }, 500);
    });

    $('#mainNav').affix({
        offset: {
            top: 100
        }
    });

    $('.slider-parent').slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
    });

    $('.scope-slider').slick({
        dots: false,
        autoplay: true,
        arrows: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 2,
        responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    function fbShare(url, title, descr, image, winWidth, winHeight) {
        var winTop = (screen.height / 2) - (winHeight / 2);
        var winLeft = (screen.width / 2) - (winWidth / 2);
        window.open('https://www.facebook.com/sharer.php?s=100&p[title]=' + title + '&p[summary]=' + descr + '&p[url]=' + url + '&p[images][0]=' + image, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
    }

    $('.card__share > a').on('click', function(e){ 
        e.preventDefault(); // prevent default action - hash doesn't appear in url
        $(this).parent().find( 'div' ).toggleClass( 'card__social--active' );
        $(this).toggleClass('share-expanded');
    });
});