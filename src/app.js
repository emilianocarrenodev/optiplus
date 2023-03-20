import './scss/style.scss';
import 'bootstrap';

import { WOW } from 'wowjs';
import { Swiper, Autoplay } from 'swiper/js/swiper.esm.js';

Swiper.use([Autoplay]);

/*Se inicializa el plugin para las animaciones*/
var wow = new WOW({
    live: false,
    scrollContainer: null
});

/*Instagram*/
var feed = new Instafeed({
    accessToken: '',
    target: 'instafeed',
    limit: 3,
    template: "<div class=\"col-12 col-lg-4\"><div class=\"container-image\"><a href=\"{{link}}\" target=\"_blank\"><div class=\"bg-image\" style=\"background-image: url('{{image}}');\"></div><h3>{{caption}}</h3></div></a></div>",
});
feed.run();

/*Todos los "load" cargan los bloques recurrentes*/
$('header').load("header.html");
$('footer').load("footer.html", function() {

    /*Formulario de contacto*/
    $(document).on('submit', '#form-contact', function(event) {
        event.preventDefault();

        $('#form-contact .btn-primary').prop('disabled', true);

        $('.alert-danger').hide();

        $.ajax({
            cache: false,
            url: $(this).attr("action"),
            type: $(this).attr("method"),
            data: $(this).serialize(),
            success: function(data) {

                var obj = JSON.parse(data);

                $('.alert').hide();
                $('#form-contact .btn-primary').prop('disabled', false);

                if (obj.alert == 'valid') {
                    $('.alert-success').fadeIn();
                    $("#form-contact")[0].reset();
                } else {
                    $('.alert-danger').fadeIn();
                }

                setTimeout(function() { $('.alert').hide(); }, 5000);
            }
        });
    });
});

/*Script para el slider lentes*/
if ($.contains(document.body, document.getElementById('block-glasses-list'))) {

    var mySwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: {
            delay: 5000,
        }
    });

    $(document).on('click', '.btn-swiper-main', function(event) {
        event.preventDefault();

        var item = $(this).data('item');
        var slider = $(this).data('slider');

        var mySwiperSelect = document.getElementById('slider-glasses-list-' + slider).swiper;

        if (item) {
            mySwiperSelect.slidePrev();
        } else {
            mySwiperSelect.slideNext();
        }

    });
}

/*Script scroll*/
$(document).on('click', '.btn-scrollTop', function(event) {
    event.preventDefault();

    var item = $(this).data('item');

    $('body,html').animate({ scrollTop: $(item).offset().top - 50 }, 3000, 'swing');
});


/*Script filtros*/
var value_type = 0;
var value_gender = 0;
$(".select-filter").on('change', function(event) {
    event.preventDefault();

    value_type = $('#select-filter-type').val();
    value_gender = $('#select-filter-gender').val();
    
    console.log(value_type, value_gender);

    $(".filter-options").hide();

    if (value_type != 0 && value_gender != 0) {

        $(`.filter-gender-${value_gender}.filter-type-${value_type}`).fadeIn();

    } else {

        if (value_type != 0) {
            $(`.filter-type-${value_type}`).fadeIn();
        }

        if (value_gender != 0) {
            $(`.filter-gender-${value_gender}`).fadeIn();
        }
    }

    if (value_gender == 0 && value_type == 0) {
        $(".filter-options").fadeIn();
    }
});

/*Se agregan las animaciones para toda la pagina que no cargan de menera recurrente*/
wow.init();