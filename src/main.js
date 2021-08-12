import { pages } from './lib/templates.js';
import { sendSingUp } from './lib/data.js';



const main = document.getElementById('main');

router();

  

 
async function fnSignUp(e) {
    e.preventDefault();
    let sign_up_password1 = document.getElementById('sign_up_password1').value;
    let sign_up_password2 = document.getElementById('sign_up_password2').value;
    let sign_up_email = document.getElementById('sign_up_email').value; 
    const sign_up_password_error = document.getElementById('sign_up_password_error'); 
    const sign_up_user_mane = document.getElementById('sign_up_user_mane');  
   
    if (sign_up_password1 === sign_up_password2){
      let message = await sendSingUp(sign_up_email, sign_up_password1)
      console.log(message);
       if (firebase.auth().currentUser){
       
        sign_up_password_error.innerHTML = message;
       }
       else{
        sign_up_password_error.innerHTML = message;

       }
    } 
    else {
        sign_up_password_error.innerHTML = "Las contraseñas no son iguales"
    } 
}


function fnShowSingUp() {
    window.history.pushState({},"","/singup")
    router();
    document.getElementById("sign_up_form").addEventListener("submit", fnSignUp);
}
function router(){
    switch(window.location.pathname){
        case "/" : 
          main.innerHTML=pages.home.template;
          break;
        case "/singup":
            main.innerHTML=pages.signUp.template;
          break;
          default:
              window.history.pushState({},"","/")
           break;   
    }
}