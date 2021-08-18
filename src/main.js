import { pages } from './lib/templates.js';
import { sendSingUp, sendLogin } from './lib/data.js';

export const obj_main = document.createElement('main');

document.body.appendChild(obj_main);

//const main = document.getElementById('main');

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
    } else {addel
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

function router() {
  
  switch (window.location.pathname) {
    case '/':
      obj_main.innerHTML = pages.home.template;
      const obj_boton_singup = document.getElementById('id_home_text_registro');
      obj_boton_singup.addEventListener('click', fnPageSignUp);
      document.getElementById('id_home_btn_login').addEventListener('click', fnPagesLogin);
      break;
    case '/singup':
      obj_main.innerHTML = pages.singUp.template;
      console.log(obj_main.innerHTML);
      const obj_sing_up_form = obj_main;
      obj_sing_up_form.addEventListener('submit', fnSignUp);
      break;
    case '/login':
      obj_main.innerHTML = pages.login.template;
      document.getElementById('login_form').addEventListener('submit', fnLogin);
      break;
    default:
      window.history.pushState({}, '', '/');
      break;
  }
}

router();


