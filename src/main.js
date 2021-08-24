import { pages } from './lib/templates.js';
import { sendSingUp, sendLogin, sendLoginGoogle, fnLogOutFb, writeFareBase } from './lib/data.js';

let user = [];
export const obj_main = document.createElement('main');
document.body.appendChild(obj_main);
let userState = firebase.auth().currentUser;
console.log(userState);

document.getElementById('idLogOut').addEventListener('click', fnLogOut);
// Autenticacion de Usuario al Entrar a la App o al cambiar de estado
firebase.auth().onAuthStateChanged( function(user) { 
  if(user){
    router();
  }
  else{
    
    router();
  }
});

/*console.log(window.location.pathname);
if(window.location.pathname != "/"){
  const origin_path = window.location.pathname;
  console.log("y");
}
else{
  let origin_path = "s";
  console.log("n");
}


console.log(origin_path);*/



//const main = document.getElementById('main');

async function fnSignUp(e) {
  e.preventDefault();
  const signUpPassword1 = document.getElementById('sign_up_password1').value;
  const signUpPassword2 = document.getElementById('sign_up_password2').value;
  const signUpEmail = document.getElementById('sign_up_email').value;
  const signUpPasswordError = document.getElementById('sign_up_password_error');
  const singUpName = document.getElementById('sign_up_user_name').value;
  if (signUpPassword1 === signUpPassword2) {
    const message = await sendSingUp(signUpEmail, signUpPassword1);
    if (firebase.auth().currentUser) {
      user = message;
      writeFareBase(user.uid, 'name', singUpName);
      window.history.pushState({}, '', pages.home2.path);
      router();
    } else {
      signUpPasswordError.innerHTML = 'Usuario o contraseña no son validos';
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
    window.history.pushState({}, '', pages.home2.path);
    router();
  } else {
    loginError.innerHTML = message;
  }
}
async function fnLoginGoogle() {
  const loginError = document.getElementById('loginErrorGoogle');
  const provider = new firebase.auth.GoogleAuthProvider();
  const message = await sendLoginGoogle(provider);
  try {
    window.history.pushState({}, '', pages.home2.path);
    router();
  } catch (error) {
    loginError.innerHTML = message;
  }
}

async function fnLogOut() {
  await fnLogOutFb();
  try {
    window.history.pushState({}, '', pages.home2.path);
    router();
  } catch (error) { console.log('error logout'); console.log(error.message); }
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
  userState = firebase.auth().currentUser;
  console.log(userState);
  switch (window.location.pathname) {
    case '/':
      if (userState) {
        obj_main.innerHTML = pages.home2.template;
      } else {
        obj_main.innerHTML = pages.home.template;
        const obj_boton_singup = document.getElementById('id_home_text_registro');
        obj_boton_singup.addEventListener('click', fnPageSignUp);
        document.getElementById('id_home_btn_login').addEventListener('click', fnPagesLogin);
        document.getElementById('id_home_btn_login_google').addEventListener('click', fnLoginGoogle);
      }
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
    case '/perfil':
      obj_main.innerHTML = pages.perfil.template;
      break;
    default:
      window.history.pushState({}, '', '/');
      router();
      break;
  }
}
