import { pages } from './lib/templates.js';
<<<<<<< HEAD
import { sendSingUp } from './lib/data.js';

const main = document.getElementById('main');

function router() {
  switch (window.location.pathname) {
    case '/':
      main.innerHTML = pages.home.template;
      break;
    case '/singup':
      main.innerHTML = pages.signUp.template;
      break;
    default:
      window.history.pushState({}, '', '/');
      break;
  }
}

router();

async function fnSignUp(e) {
  e.preventDefault();
  const sign_Up_Password1 = document.getElementById('sign_up_password1').value;
  const sign_Up_Password2 = document.getElementById('sign_up_password2').value;
  const sign_Up_Email = document.getElementById('sign_up_email').value;
  const sign_Up_Password_Error = document.getElementById('sign_up_password_error');
  const sign_Up_User_Mane = document.getElementById('sign_up_user_mane');

    if (sign_Up_Password1 === sign_Up_Password2){
      const message = await sendSingUp(sign_Up_Email, sign_Up_Password1)
      console.log(message);
        if (firebase.auth().currentUser){
       
        sign_Up_Password_Error.innerHTML = message;
        }
       else{
        sign_Up_Password_Error.innerHTML = message;

        }
    } 
    else {
        sign_Up_Password_Error.innerHTML = "Las contraseñas no son iguales"
    } 
}
=======
import { sendSingUp, sendLogin } from './lib/data.js';
import { createBtnReg } from './lib/elementTest.js';

const main = document.getElementById('main');

async function fnSignUp(e) {
  e.preventDefault();
  const signUpPassword1 = document.getElementById('sign_up_password1').value;
  const signUpPassword2 = document.getElementById('sign_up_password2').value;
  const signUpEmail = document.getElementById('sign_up_email').value;
  const signUpPasswordError = document.getElementById('sign_up_password_error');
  if (signUpPassword1 === signUpPassword2) {
    const message = await sendSingUp(signUpEmail, signUpPassword1);
    if (firebase.auth().currentUser) {
      signUpPasswordError.innerHTML = message;
    } else {
      signUpPasswordError.innerHTML = message;
    }
  } else {
    signUpPasswordError.innerHTML = 'Las contraseñas no son iguales';
  }
}

async function fnLogin(e) {
  e.preventDefault();
  const loginPassword = document.getElementById('login_password').value;
  const loginEmail = document.getElementById('login_email').value;
  const loginError = document.getElementById('login_error');

  const message = await sendLogin(loginEmail, loginPassword);
  if (firebase.auth().currentUser) {
    loginError.innerHTML = message;
  } else {
    loginError.innerHTML = message;
  }
}
export function fnPageSignUp() {
  window.history.pushState({}, '', pages.singUp.path);
  router();
}

function fnPagesLogin() {
  window.history.pushState({}, '', pages.login.path);
  router();
}

export function router() {
  console.log(window.location.pathname);
  switch (window.location.pathname) {
    case '/':
      main.innerHTML = pages.home.template;
      const btnMenuRegistrar = createBtnReg();
      document.getElementById('id_home_text_registro').appendChild(btnMenuRegistrar);
      btnMenuRegistrar.addEventListener('click', fnPageSignUp);
      document.getElementById('id_home_btn_login').addEventListener('click', fnPagesLogin);
      break;
    case '/singup':
      main.innerHTML = pages.singUp.template;
      document.getElementById('sign_up_form').addEventListener('submit', fnSignUp);
      break;
    case '/login':
      main.innerHTML = pages.login.template;
      document.getElementById('login_form').addEventListener('submit', fnLogin);
      break;
    default:
      window.history.pushState({}, '', '/');
      break;
  }
}
router();
>>>>>>> 7c74494fce57250ac021ed51e88de8035f364e29
