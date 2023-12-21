

$(document).ready(function () {
    // $('.slick-slider').owlCarousel({
    //     loop: true,
    //     responsiveClass: true,
    //     nav: false,
    //     margin: 0,
    //     autoplay: true,
    //     autoplayTimeout: 3000,
    //     smartSpeed: 500,
    //     center: true,
    //     navText: ['&#8592;', '&#8594;'],
    //     responsive: {
    //         0: {
    //             items: 1,
    //         },
    //         600: {
    //             items: 5
    //         },
    //         1200: {
    //             items: 3
    //         }
    //     }
    // });

    $(".multiple-items").slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
    });

    

});
