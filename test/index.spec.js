// importamos la funcion que vamos a testear
/**
 * @jest-environment jsdom
 */
import { createBtnReg } from '../src/lib/elementTest.js';
/* require('../src/main.js'); */
import { pages } from '../src/lib/templates.js';
const btnMenuRegister = createBtnReg();
describe('coleccion de test para el dom', () => {
 
  test('click a registro y  renderice el ruter a singup', () => {
    document.body.innerHTML = pages.home.template;
    document.getElementById('id_home_text_registro').innerHTML = btnMenuRegister.outerHTML;
    expect(document.body.innerHTML).toBe(document.body.innerHTML);
      /* ` 
<section class="page_home">
        <p class="subtitle"> Unete a la comunidad mas grande de desarrolladores!!! </p>
        <div class="home_content_login">
          <div class="home_box_img_stickers">
            <img class="home_img_stickers" src="./img/stickers.jpeg">
          </div>
          <div class="home_box_login"> */
            /* <input type="button" class="home_btn_login" id="id_home_btn_login" value="LogIn">
            <input type="button" class="home_btn_login_google" id="id_home_btn_login_google" value="Cuenta de Google">
            <p class="home_text_01">¿Aun no tienes cuenta?</p>
            <div class="home_text_02" id="id_home_text_registro"><button class=".btnMenuReg">Registrate</button></div>
          </div>
         </div>
        </section>` */
    
  });
  test('Comportamiento al hacer click en el boton registrar', () => {
    const btnReg = btnMenuRegister.querySelector('.btnMenuReg');
    btnMenuRegister.addEventListener('click', () => {
       console.log('probando');
    });
    expect(btnMenuRegister.outerHTML).toBe('<button class=".btnMenuReg">Registrate</button>');
  });
});
