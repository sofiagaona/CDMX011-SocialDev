/**
 * @jest-environment jsdom
 */
import './globals/firebase.js';
import MockFirebase from 'mock-cloud-firestore';
import * as admin from "firebase-admin";
// import { firebase } from './firebase-mock';
import { createBtnReg } from '../src/lib/elementTest.js';
import { sendLogin } from '../src/lib/data.js';
import {
  fnPageSignUp, objMain, fnPagesLogin, fnLogin,
} from '../src/lib/nodemod';
import { pages } from '../src/lib/templates.js';

/* configurando firebase mock
const firebasemock = firebase;
const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush(); */

/* global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
); */
/* global.firebase = new MockFirebase();
const btnMenuRegister = createBtnReg(); */

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

  /* test('Precionar Boton de login en la pagina de login', () => {
    let messageLogin;
    document.body.innerHTML = objMain.outerHTML;
    const objBotonLogin = document.getElementById('login_form');
    objBotonLogin.addEventListener('submit', () => {
    return messageLogin = fnLogin('sofiah@1234.com', '12345678').then(() => {});
    });
    objBotonLogin.click();
    expect(messageLogin).toBe("   ");
  }); */
  test('deberia iniciar sesion', () => {
    const email = 'sofiah@1234.com';
    const password = '12345678';
    const user = { email, uid: 'xxxxxxx' };
    const mockSignInWithEmailAndPassword = jest.fn();
    mockSignInWithEmailAndPassword.mockResolvedValue(user);
    const mockFirebaseAuth = {
      signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
      currentUser: user,
    };
    firebase.auth = () => mockFirebaseAuth;
    sendLogin(email, password)
      .then((user) => {
        expect(user.email).toBe('sofiah@1234.com');
      });
  });
  test('Deberia mostrar error al iniciar sesion con credenciales invalidas', () => {
    const email = 'sofia@error.com';
    const password = '123456789';
    const messageError = 'Credenciales invalidas';
    const mockSignInWithEmailAndPassword = jest.fn();
    mockSignInWithEmailAndPassword.mockResolvedValue(new Error(messageError));
    const mockFirebaseAuth = {
      signInWithEmailAndPassword: mockSignInWithEmailAndPassword,
    };
    firebase.auth = () => mockFirebaseAuth;
    sendLogin(email, password)
      .catch((error) => {
        expect(error).toBe('Credenciales invalidas');
      });
  });
});
