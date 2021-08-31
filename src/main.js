import { pages } from './lib/templates.js';
import {
  objMain, fnPageSignUp, fnPagesLogin, fnLogin, fnAuthGoogle,
} from './lib/nodemod.js';
import {
  sendSingUp, sendLoginGoogle, fnLogOutFb, writeFareBase, readfirebase,
} from './lib/data.js';

let users = [];

let userState = firebase.auth().currentUser;
document.getElementById('idLogOut').addEventListener('click', fnLogOut);
// Autenticacion de Usuario al Entrar a la App o al cambiar de estado
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.getElementById('idLogOut').style.display = 'block';
    router();
  } else {
    document.getElementById('idLogOut').style.display = 'none';
    router();
  }
});

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
      users = message;
      writeFareBase(users.uid, 'name', singUpName);
      window.history.pushState({}, '', pages.home2.path);

      firebase.firestore().collection(firebase.auth().currentUser.uai).doc("userInfo").set({
        name: singUpName,
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });

      databaseReference.child(firebase.auth().currentUser.uai + '/profileimg.jpg').set("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")

      router();
    } else {
      signUpPasswordError.innerHTML = 'Usuario o contraseña no son validos';
    }
  } else {
    signUpPasswordError.innerHTML = 'Las contraseñas no son iguales';
  }
}

async function fnLoginGoogle() {
  fnAuthGoogle();
  if (userState) {
    router();
  }
}

export async function fnLogOut() {
  await fnLogOutFb();
  try {
    window.history.pushState({}, '', pages.home2.path);
    router();
  } catch (error) { console.log('ok'); }
}

function fnGoProfile(){
  window.history.pushState({}, '', pages.profile.path);
  router();
}

function back(){
  window.history.go(-1);
}

async function router() {
  userState = firebase.auth().currentUser;

  switch (window.location.pathname) {
    case '/':
      if (userState) {
        const info = await readfirebase(userState.uid, 'name');
        const img = await readfirebase(userState.uid, 'img');
        objMain.innerHTML = pages.home2.template;
        document.querySelector('.profileimg').src = img;
        document.querySelector('.subprofileimg').src = img;
        document.querySelector('.subnameuser').innerHTML = info;
        document.querySelector('.nameUser').innerHTML = info;
        document.querySelector('.btn_profile').addEventListener('click',fnGoProfile);
      } else {
        objMain.innerHTML = pages.home.template;
        const objBotonSingup = document.getElementById('id_home_text_registro');
        objBotonSingup.addEventListener('click', () => { fnPageSignUp(); router(); });
        document.getElementById('id_home_btn_login').addEventListener('click', () => { fnPagesLogin(); router(); });
        document.getElementById('id_home_btn_login_google').addEventListener('click', fnLoginGoogle);
      }
      break;
    case '/singup':
      objMain.innerHTML = pages.singUp.template;
      const objSingUpForm = objMain;
      objSingUpForm.addEventListener('submit', fnSignUp);
      break;
    case '/login':
      objMain.innerHTML = pages.login.template;
      const loginError = document.getElementById('login_error');
      document.getElementById('login_form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const loginEmail = document.getElementById('login_email').value;
        const loginPassword = document.getElementById('login_password').value;
        loginError.innerHTML = await fnLogin(loginEmail, loginPassword, loginError, e);
        if (userState) {
          router();
        }
      });
      break;
    case '/profile':
      if (userState) {
        const info = await readfirebase(userState.uid, 'name');
        const img = await readfirebase(userState.uid, 'img');
        objMain.innerHTML = pages.profile.template;
        document.querySelector('.profileimg').src = img;
        document.querySelector('.subprofileimg').src = img;
        document.querySelector('.subnameuser').innerHTML = info;
        document.querySelector('.nameUser').innerHTML = info;
        
      }
      else {
        window.history.pushState({}, '', pages.home.path);
        router();
      }
      break;
    default:
      window.history.pushState({}, '', '/');
      router();
      break;
  }
}
