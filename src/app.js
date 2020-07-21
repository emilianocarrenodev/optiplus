import './scss/style.scss';
import 'bootstrap';

import { WOW } from 'wowjs';

/*Se inicializa el plugin para las animaciones*/
var wow = new WOW({
    live: false,
    scrollContainer: null
});

/*Todos los "load" cargan los bloques recurrentes*/
$('header').load("header.html");
$('footer').load("footer.html");

/*Se agregan las animaciones para toda la pagina que no cargan de menera recurrente*/
wow.init();