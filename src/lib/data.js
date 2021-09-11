export function sendSingUp(email, password) {
  const message = firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorMessage = error.message;
      return errorMessage;
    });

  return message;
}

export function sendLogin(email, password) {
  const message = firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorMessage = 'no coicide correo y contraseña';
      return errorMessage;
    });
  return message;
}

export function fnLogOutFb() {
  return firebase.auth().signOut()
    .then((message) => { return message; })
    .catch((error) => { return error; });
}

export function sendLoginGoogle(provider) {
  return firebase.auth().signInWithPopup(provider)
    .then((result) => 'Se realizo logeo con cuenta de google')
    .catch((error) => 'Hubo un error en cuanta de google');
}

export function writeFareBase(idUser, type, data, idDoc) {
  let message;
  switch (type) {
    case 'namefirst': firebase.firestore().collection('users').doc(idUser).set({
      name: data,
    });
      break;
    case 'name': return firebase.firestore().collection('users').doc(idUser).update({
      name: data,
    })
      .then(() => {});
    case 'city': firebase.firestore().collection('users').doc(idUser).update({
      city: data,
    });
      break;
    case 'work': firebase.firestore().collection('users').doc(idUser).update({
      work: data,
    });
      break;
    case 'post':
      // const date = new Date();
      // const datePost = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      const idPost = uuid.v1();
      firebase.firestore().collection('users').doc(idUser).update({
        [`${idPost}.posted.post`]: data,
        [`${idPost}.posted.like`]: 0,
        // [`${idPost}.posted.comments`]: '',
      });

      break;
    default: message = 'Función mal definida';
  }
  return message;
}

export function readfirebase(idUser, type) {
  switch (type) {
    case 'name':
      return firebase.firestore().collection('users').doc(idUser).get()
        .then((doc) => doc.data().name)
        .catch((error) => {
          console.log('Error getting document:', error.message);
        });
    case 'city':
      return firebase.firestore().collection('users').doc(idUser).get()
        .then((doc) => doc.data().city)
        .catch((error) => {
          console.log('Error getting document:', error.message);
        });
    case 'work':
      return firebase.firestore().collection('users').doc(idUser).get()
        .then((doc) => doc.data().work)
        .catch((error) => {
          console.log('Error getting document:', error.message);
        });
    case 'img':
      return firebase.storage().ref(idUser + '/profileimg.jpg').getDownloadURL().then((url) => {
        console.log(url);
        return url;
      })
        .catch((error) => {
        // Handle any errors
        });

    default:
  }
}

export function fillposted(user) {
  return firebase.firestore().collection('users').doc(user).get()
    .then((quereySnapshot) => {
      return quereySnapshot.data();
    });
}

export function fnAllPost() {
  return firebase.firestore().collection("users").get()
    .then((querySnapshot) => {
      const list = [];
      querySnapshot.forEach((element) => {
        list.push(element.data());
      });
      return list;
    });
}

export async function fnWriteCommentFb(idUser, idPost, comment) {
  console.log(idPost);
  const idComment = uuid.v1();
  firebase.firestore().collection('users').doc(idUser).update({
    [`${idPost}.posted.comments.${idComment}.comment`]: comment,
    [`${idPost}.posted.comments.${idComment}.userId`]: idUser,
  });
}
export async function fnWriteLiks(idPost, user, count) {
  firebase.firestore().collection('users').doc(user).update({
    [`${idPost}.posted.like`]: count,
  });
}

export async function fnFillComent(user, idPost) {
  return firebase.firestore().collection('users').doc(user).get()
    .then((quereySnapshot) => {
      const snapshot = quereySnapshot.data();
      const numcoment = Object.keys(snapshot);
      const filterComm = numcoment.filter((item) => { return item === idPost; });
      if (filterComm.join("") === idPost) {
        return (snapshot[idPost].posted.comments);
      }
    });
}
export async function fnFillLiks(user, idPost) {
  return firebase.firestore().collection('users').doc(user).get()
    .then((doc) => {
      const snapshot = doc.data();
      const numLiks = Object.keys(snapshot);
      const filterLiks = numLiks.filter((item) => item === idPost);
      if (filterLiks.join("") === idPost) {
        return (snapshot[idPost].posted.like);
      }
    });
}

export async function fnDeletePost(user, idPost) {
  const postRef = firebase.firestore().collection('users').doc(user);
  const res = await postRef.update({
    [idPost]: firebase.firestore.FieldValue.delete(),
  });
}
export async function fnposted(user, idPost) {
  console.log(idPost);
  const pots = firebase.firestore().collection('users').doc(user).get()
    .then((quereyPost) => {
      const snapshot = quereyPost.data();
      const numPost = Object.keys(snapshot);
      const filterPost = numPost.filter((item) => item === idPost);
      if (filterPost.join("") === idPost) {
        return (snapshot[idPost].posted.post);
      }
    });
  return pots;
}
export async function editPost(user, idPost, post) {
  firebase.firestore().collection('users').doc(user).update({
    [`${idPost}.posted.post`]: post,
  });
}
