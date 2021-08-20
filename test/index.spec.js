/**
 * @jest-environment jsdom
 */
import { createBtnReg } from '../src/lib/elementTest.js';
import { fnPageSignUp, obj_main} from '../src/main.js';
import { pages } from '../src/lib/templates.js';


const btnMenuRegister = createBtnReg();


describe('Pruebas de Red Social', () => {

  test('Verifica HTML en Home', () => {

    document.body.innerHTML = obj_main.outerHTML;
    obj_main.innerHTML = pages.home.template.replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ');
    expect(obj_main.innerHTML).toBe('<section class=\"page_home\"> <p class=\"subtitle\"> Unete a la comunidad mas grande de desarrolladores!!! </p> <div class=\"home_content_login\"> <div class=\"home_box_img_stickers\"> <img class=\"home_img_stickers\" src=\"./img/stickers.jpeg\"> </div> <div class=\"home_box_login\"> <input type=\"button\" class=\"home_btn_login\" id=\"id_home_btn_login\" value=\"LogIn\"> <input type=\"button\" class=\"home_btn_login_google\" id=\"id_home_btn_login_google\" value=\"Cuenta de Google\"> <p class=\"home_text_01\">¿Aun no tienes cuenta?</p> <div class=\"home_text_02\" id=\"id_home_text_registro\"> <p class=\".btnMenuReg\">Registrate</p> </div> </div> </div> </section> ');

  });

  test('Precionar Boton de SingUP', () => {
 
    const obj_boton_singup = document.getElementById('id_home_text_registro');
    obj_boton_singup.addEventListener('click', fnPageSignUp);
    obj_boton_singup.click();
   
    expect(obj_main.innerHTML.replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ')).toBe(' <section> <div class=\"box_singup\"> <p class=\"text_register\">Datos de registro</p> <div class=\"linea\"> </div> <form id=\"sign_up_form\" class=\"form\"> <label class=\"invisible\"> Nombre del Usuario </label> <input type=\"text\" id=\"sign_up_user_mane\" placeholder=\"Nombre\" required=\"\"> <input type=\"email\" id=\"sign_up_email\" placeholder=\"Correo\" required=\"\"> <input type=\"password\" id=\"sign_up_password1\" placeholder=\"Contraseña\" required=\"\"> <input type=\"password\" id=\"sign_up_password2\" placeholder=\"Verificar contraseña\" required=\"\"> <div class=\"lineaform\"> </div> <p id=\"sign_up_password_error\"></p> <button type=\"submit\" class=\"btnRegistrar\">Registrar</button> </form></div> </section> ');
  });

  test('Direccion singup en barra de direcciones', () => {
    expect(window.location.pathname).toBe('/singup');
  });
  
});