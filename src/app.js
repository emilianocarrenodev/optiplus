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

/*Todos los "load" cargan los bloques recurrentes*/
$('header').load("header.html");
$('footer').load("footer.html");

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

/*Se agregan las animaciones para toda la pagina que no cargan de menera recurrente*/
wow.init();