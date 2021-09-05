import { pages } from './lib/templates.js';
import {
  objMain, fnPageSignUp, fnPagesLogin, fnLogin, fnAuthGoogle,
} from './lib/nodemod.js';
import {
  sendSingUp, sendLoginGoogle, fnLogOutFb, writeFareBase, readfirebase, fillposted,
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
      writeFareBase(users.uid, 'namefirst', singUpName);
      writeFareBase(users.uid, 'city', "");
      writeFareBase(users.uid, 'work', "");
      firebase.firestore().collection(users.uid).doc('userPost').set({
        [new Date]: {

          post: " ",
          comments: "",
          likes: 0,
        },
      });
      window.history.pushState({}, '', pages.home2.path);

      fetch("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png")
        .then((res) => res.blob()) // Gets the response and returns it as a blob
        .then((blob) => {
          firebase.storage().ref(users.uid + '/profileimg.jpg').put(blob);
        });

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

function fnGoProfile() {
  window.history.pushState({}, '', pages.profile.path);
  router();
}

function back() {
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
        document.querySelector('.btn_profile').addEventListener('click', fnGoProfile);
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
        let name = await readfirebase(userState.uid, 'name');
        let city = await readfirebase(userState.uid, 'city');
        let work = await readfirebase(userState.uid, 'work');
        let img = await readfirebase(userState.uid, 'img');
        objMain.innerHTML = pages.profile.template;
        await fnPrintPosted();
        document.querySelector('.profileimg').src = img;
        document.querySelector('.subprofileimg').src = img;
        document.querySelector('.subnameuser').innerHTML = name;
        document.querySelector('.nameUser').innerHTML = name;
        document.querySelector('.nameUserProfile').innerHTML = name;
        document.querySelector('.cityUser').innerHTML = city;
        document.querySelector('.workUser').innerHTML = work;

        document.querySelector('.btn_editprofile').addEventListener('click', () => {
          document.querySelector('.dateUserHome1').style.display = "flex";
          document.querySelector('.ventana_modal_editar').style.display = "flex";
          document.querySelector('.subprofileimg2').src = img;
          document.querySelector('.name_profile').value = name;
          document.querySelector('.city_profile').value = city;
          document.querySelector('.work_profile').value = work;

          document.getElementById('idfile').addEventListener('input', async () => {
            const file = document.getElementById('idfile');

            var stateOfLoad = firebase.storage().ref(userState.uid + '/profileimg.jpg').put(file.files[0]);
              stateOfLoad.then(() => {
                readfirebase(userState.uid, 'img')
                .then((a) => {
                  document.querySelector('.subprofileimg2').src = a;
                  document.getElementById("porcent_carga").innerHTML = "Imagen Actualizada."
                });
             })
             
             stateOfLoad.on('state_changed', taskSnapshot => {
              
              document.getElementById("porcent_carga").innerHTML = Math.trunc((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100) + " %";
              });

          

          });


          document.getElementById('form_user_date').addEventListener('submit', (e) => {
            e.preventDefault();
            name = document.querySelector('.name_profile').value;
            city = document.querySelector('.city_profile').value;
            work = document.querySelector('.work_profile').value;
            writeFareBase(userState.uid, 'name', name);
            writeFareBase(userState.uid, 'city', city);
            writeFareBase(userState.uid, 'work', work);
            router();
          });
        });

        document.querySelector(".btn_make_post").addEventListener('click', () => {
          document.querySelector('.make_post_on_profile').innerHTML = pages.makeapost.template;
          document.querySelector('.make_post_on_profile').style.display = "flex";
          document.querySelector('.box_make_post').style.display = "flex";
          document.querySelector('.subprofileimg3').src = img;
          document.querySelector('.box_make_post').addEventListener('submit', (e) => {
            e.preventDefault();
            const post = document.querySelector('.text_post').value;
            writeFareBase(userState.uid, 'post', post);
            router();
          });
        }); 
      } else {
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

/* async function fnPrintPosted1() {
  let  insert = document.querySelector('.all_profile_post');
  const posted = await fillposted(userState.uid);
  const numpost = Object.keys(posted);
  numpost.map(function (x) {
  insert.innerHTML = insert.innerHTML + pages.post.template; 
    console.log(posted[x].post);
    console.log(posted[x].likes);
    console.log(posted[x].comments);
  } );

} */

 async function fnPrintPosted() {
  let img = await readfirebase(userState.uid, 'img');
  let name = await readfirebase(userState.uid, 'name');
  let insert = document.querySelector('.all_profile_post');
  let posted = await fillposted(userState.uid);
  const numpost = Object.keys(posted);
  console.log(numpost);
  const listPost = numpost.map(function (x) {
    return posted[x].post;
   });
   const printPost = pages.post.template(listPost, img, name);
   
   insert.innerHTML = printPost;

} 