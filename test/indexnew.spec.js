/**
 * @jest-environment jsdom
 */

import firebases from './firebasenew-mock';
import { objMain, fnPagesLogin, fnPageSignUp, fnAuthGoogle } from '../src/lib/nodemod.js';
import { sendLogin, sendLoginGoogle, fnLogOutFb } from '../src/lib/data';
import { pages } from '../src/lib/templates.js';

global.firebase = firebases();

describe('Pruebas de Red Social', () => {
  test('Verifica HTML en Home', () => {
    objMain.innerHTML = pages.home.template.replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ');
    document.body.innerHTML = objMain.outerHTML;
    expect(objMain.innerHTML).toBe("<section class=\"page_home\"> <p class=\"subtitle\"> Unete a la comunidad más grande de desarrolladores!!! </p> <div class=\"home_content_login\"> <div class=\"home_box_img_stickers\"> <img class=\"home_img_stickers\" src=\"https://anasofiamoreno.github.io/CDMX011-SocialDev/img/stickers.jpeg\"> </div> <div class=\"home_box_login\"> <input type=\"button\" class=\"home_btn_login\" id=\"id_home_btn_login\" value=\"LogIn\"> <input type=\"button\" class=\"home_btn_login_google\" id=\"id_home_btn_login_google\" value=\"Cuenta de Google\"> <p class=\"home_text_01\">¿Aun no tienes cuenta?</p> <div class=\"home_text_02\" id=\"id_home_text_registro\"> <p class=\".btnMenuReg\">Registrate</p> <p id=\"loginErrorGoogle\"></p> </div> </div> </div> </section> ");
  });

  test('Precionar Boton de SingUP', () => {
    const objBotonSingup = document.getElementById('id_home_text_registro');
    objBotonSingup.addEventListener('click', fnPageSignUp);
    objBotonSingup.click();
    expect(objMain.innerHTML.replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ')).toBe(" <section> <div class=\"box_general_singup\"> <div class=\"box_singup\"> <p class=\"text_register\">Datos de registro</p> <form id=\"sign_up_form\" class=\"form\"> <div class=\"linea\"> </div> <label class=\"invisible\"> Nombre del Usuario </label> <input type=\"text\" id=\"sign_up_user_name\" placeholder=\"Nombre\" required=\"\"> <input type=\"email\" id=\"sign_up_email\" placeholder=\"Correo\" required=\"\"> <input type=\"password\" id=\"sign_up_password1\" placeholder=\"Contraseña\" required=\"\"> <input type=\"password\" id=\"sign_up_password2\" placeholder=\"Verificar contraseña\" required=\"\"> <div class=\"lineaform\"> </div> <p id=\"sign_up_password_error\"></p> <button type=\"submit\" class=\"btnRegistrar\">Registrar</button> </form></div> </div> </section> ");
  });

  test('Direccion singup en barra de direcciones', () => {
    expect(window.location.pathname).toBe('/singup');
  });

  test('Precionar Boton de login en pagina de home', () => {
    objMain.innerHTML = pages.home.template.replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ');
    document.body.innerHTML = objMain.outerHTML;
    const objBotonLogin = document.getElementById('id_home_btn_login');
    objBotonLogin.addEventListener('click', fnPagesLogin);
    objBotonLogin.click();
    expect(objMain.innerHTML.replace(/(<.*?>)|\s+/g, (m, $1) => $1 ? $1 : ' ')).toBe(" <section> <div class=\"box_singup\"> <p class=\"text_register\">Datos de registro</p> <div class=\"linea\"> </div> <form id=\"login_form\" class=\"form\"> <input type=\"email\" id=\"login_email\" placeholder=\"Correo\" required=\"\"> <input type=\"password\" id=\"login_password\" placeholder=\"Contraseña\" required=\"\"> <div class=\"lineaform\"> </div> <p id=\"login_error\"></p> <button type=\"submit\" class=\"btnRegistrar\">Login</button> </form></div> </section> ");
  });

  test('deberia iniciar sesion correctamente', () => {
    return sendLogin('ana01@outlook.com', '123456').then((message) => {
      expect(message).toBe("Sofia");
    });
  });

  test('No deberia iniciar sesion con credencial incorrecta', () => {
    return sendLogin('ana02@outlook.com', '123456').then((message) => {
      expect(message).toBe("no coicide correo y contraseña");
    });
  });

  test('Beberia iniciar sesion con google', () => {
    const provider = {};
    return sendLoginGoogle(provider).then((message) => {
      expect(message).toBe("Se realizo logeo con cuenta de google");
    });
  });

  test('Cerrar Cesion', () => {
    const provider = {};
    return fnLogOutFb().then((message) => {
      expect(message).toBe("deslogeo");
    });
  });
});
