import { pages } from './lib/templates.js';
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