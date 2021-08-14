import { pages } from './lib/templates.js';
import { sendSingUp} from './lib/data.js';
import { RuleTester } from 'eslint';



const main = document.getElementById('main');


router();


function fnPageSignUp(){
    window.history.pushState({},"",pages.singUp.path);
    router();
}

function fnPagesLogin(){
    window.history.pushState({},"",pages.login.path);
    router();
}

 
async function fnSignUp(e) {
    console.log("entro entro")
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

async function fnLogin(e) {
    e.preventDefault();
    let login_password = document.getElementById('login_password').value;
    let login_email = document.getElementById('login_email').value; 
    const login_error = document.getElementById("login_error"); 
    
   
   
      let message = await sendLogin(login_email, login_password)
      console.log(message);
       if (firebase.auth().currentUser){
       
        login_error.innerHTML = message;
       }
       else{
        login_error.innerHTML = message;

       }
     
    
}



function router(){
    switch(window.location.pathname){
        case "/" : 
          main.innerHTML=pages.home.template;
          document.getElementById("id_home_text_registro").addEventListener("click",fnPageSignUp);
          document.getElementById("id_home_btn_login").addEventListener("click",fnPagesLogin);
          break;
        case "/singup":
            main.innerHTML=pages.singUp.template;
            document.getElementById("sign_up_form").addEventListener("submit", fnSignUp)
          break;
          case "/login":
            main.innerHTML=pages.login.template;
            document.getElementById("login_form").addEventListener("submit", fnLogin)
          break;
          default:
              window.history.pushState({},"","/")
           break;   
    }
}