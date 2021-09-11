import { pages } from './lib/templates.js';
import {
  objMain, fnPageSignUp, fnPagesLogin, fnLogin, fnAuthGoogle,
} from './lib/nodemod.js';
import {
  sendSingUp, sendLoginGoogle, fnLogOutFb, writeFareBase, readfirebase, fillposted,
  fnWriteCommentFb, fnFillComent, fnWriteLiks, fnFillLiks, fnDeletePost, fnposted, editPost,
  fnAllPost,
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
      writeFareBase(users.uid, 'post', "");
      // fnSaveUid(users.uid);
      // idDoc = uuid.v1();
      // console.log(idDoc);
      // firebase.firestore().collection('users').doc(users.uid).set({});
      /* firebase.firestore().collection('users').doc(users.uid).set({
        [idDoc]: {
          name: "",
          work: "",
          city: "",
          post: "",
          comments: "",
          likes: 0,
        },
      }); */
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
        // const idCollection = fnSaveUid();
        // AllPost();
        objMain.innerHTML = pages.home2.template;
        document.querySelector('.profileimg').src = img;
        // document.querySelector('.subprofileimg').src = img;
        // document.querySelector('.subnameuser').innerHTML = info;
        document.querySelector('.nameUser').innerHTML = info;
        document.querySelector('.btn_profile').addEventListener('click', fnGoProfile);
        const posted = AllPost();
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
        const img = await readfirebase(userState.uid, 'img');
        objMain.innerHTML = pages.profile.template;
        await fnPrintPosted();
        document.querySelector('.profileimg').src = img;
        // document.querySelector('.subprofileimg').src = img;
        // document.querySelector('.subnameuser').innerHTML = name;
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
            const stateOfLoad = firebase.storage().ref(userState.uid + '/profileimg.jpg').put(file.files[0]);
            stateOfLoad.then(() => {
              readfirebase(userState.uid, 'img')
                .then((a) => {
                  document.querySelector('.subprofileimg2').src = a;
                  document.getElementById("porcent_carga").innerHTML = "Imagen Actualizada.";
                });
            });
            stateOfLoad.on('state_changed', (taskSnapshot) => {
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
        fnEvenBtnCmmment();
        fnEventBtnLiks();
        fnEventBtnDelete();
        fnEventBtnUpdate();
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

async function fnPrintPosted() {
  const img = await readfirebase(userState.uid, 'img');
  const name = await readfirebase(userState.uid, 'name');
  const insert = document.querySelector('.all_profile_post');
  const snapshot = await fillposted(userState.uid);
  const numpost = Object.keys(snapshot);
  const filterKeys = numpost.filter((key) => { 
    if ((key !== 'work') && (key !== 'name') && (key !== 'city')) { return key; }
  });
  const posted = Object.keys(snapshot[filterKeys]);
  const listPost = posted.map((item) => { return [snapshot[filterKeys][item].post, item]; });
  const printPost = pages.post.template(listPost, img, name);
  insert.innerHTML = printPost;
}

async function fnPrintComments(idPost) {
  const name = await readfirebase(userState.uid, 'name');
  const insert = document.querySelector('.all_post_comment');
  const comments = await fnFillComent(userState.uid, idPost);
  const comment = Object.keys(comments);
  const listComment = comment.map((item) => { return comments[item].comment; });
  const printComment = pages.comment.template(listComment, name);
  insert.innerHTML = printComment;
}

async function fnEditarPost(idPost) {
  const post = await fnposted(userState.uid, idPost);
  document.querySelector('.make_post_on_profile').innerHTML = pages.editpost.template(post);
  document.querySelector('.make_post_on_profile').style.display = "flex";
  document.querySelector('.box_make_post').style.display = "flex";
}
async function AllPost() {
  const img = await readfirebase(userState.uid, 'img');
  const name = await readfirebase(userState.uid, 'name');
  const insert = document.querySelector('.all_post');
  const snapshot = await fnAllPost();
  const allPost = snapshot.map((item) => {
    const numpost = Object.keys(item);
    const filterKeys = numpost.filter((key) => { 
      if ((key !== 'work') && (key !== 'name') && (key !== 'city')) { return key; }
    });
    const posted = Object.keys(item[filterKeys]);
    const listPost = posted.map((ite) => { return [item[filterKeys][ite].post, ite]; });
    const printPost = pages.post.template(listPost, img, name);
    insert.innerHTML += printPost;
  });
}

function fnEvenBtnCmmment() {
  const listelement = document.querySelectorAll('input.comment');
  listelement.forEach((item) => {
    item.addEventListener('click', () => {
      const idPost = item.id;
      objMain.innerHTML = pages.makeacomment.template;
      fnPrintComments(idPost);
      document.querySelector('.dateUserHome2').style.display = "flex";
      document.querySelector('.ventana_modal_comment').style.display = "flex";
      document.querySelector('.comment');
      document.getElementById('form_make_comment').addEventListener('submit', (e) => {
        e.preventDefault();
        const comment = document.querySelector('.make_comment').value;
        fnWriteCommentFb(userState.uid, idPost, comment);
        router();
      });
    });
  });
}
function fnEventBtnLiks() {
  const listBtnLike = document.querySelectorAll('input.like');
  listBtnLike.forEach((item) => {
    item.addEventListener('click', async () => {
      let count = await fnFillLiks(userState.uid, item.id);
      count += 1;
      fnWriteLiks(item.id, userState.uid, count);
      const insert = document.querySelectorAll('p.p_likes');
      const likes = await fnFillLiks(userState.uid, item.id);
      insert.forEach((x) => {
        let itemid = item.id;
        itemid = itemid.replace(/[^a-zA-Z0-9]/g, '');
        let xid = x.id;
        xid = xid.replace(/[^a-zA-Z0-9]/g, '');
        if (itemid === xid) {
          x.innerHTML = likes;
        }
      });
    });
  });
}

function fnEventBtnDelete() {
  const listBtnDelete = document.querySelectorAll('input.delete');
  listBtnDelete.forEach((item) => {
    item.addEventListener('click', async () => {
      const idPost = item.id;
      const respuesta = window.confirm("¿Está seguro de eliminar este Post?");
      (respuesta) ? fnDeletePost(userState.uid, idPost) : console.log('no se borro');
      router();
    });
  });
}

function fnEventBtnUpdate() {
  const listBtnUpdate = document.querySelectorAll('input.update');
  listBtnUpdate.forEach((item) => {
    item.addEventListener('click', async () => {
      const post = await fnposted(userState.uid, item.id);
      document.querySelector('.make_post_on_profile').innerHTML = pages.editpost.template(post);
      document.querySelector('.make_post_on_profile').style.display = "flex";
      document.querySelector('.box_make_post').style.display = "flex";
      document.querySelector('.box_make_post').addEventListener('submit', (e) => {
        e.preventDefault();
        const posted = document.querySelector('.text_post').value;
        editPost(userState.uid, item.id, posted);
        router();
      });
    });
  });
}
