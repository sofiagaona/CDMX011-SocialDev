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
      const errorMessage = error.message;
      return errorMessage;
    });
  return message;
}

export function fnLogOutFb() {
  return firebase.auth().signOut()
    .then(() => { 'ok'; })
    .catch((error) => { 'error'; });
}

export function sendLoginGoogle(provider) {
  return firebase.auth().signInWithPopup(provider)
    .then((result) => 'Se realizo logeo con cuenta de google')
    .catch((error) => 'Hubo un error en cuanta de google');
}

export function writeFareBase(idUser, type, data) {
  switch (type){
    case 'name': firebase.firestore().collection(idUser).doc('userInfo').set({
      name: data,
    })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
      break;
    default:'Función mal definida';
}
}

export function readfirebase(idUser, type, data){

  const data_ = firebase.firestore().collection(idUser).doc(type).get()
    .then((doc) => {
    
      console.log("Document data:", doc.data());
      return doc.data();
 
    })
    .catch((error) => {
      console.log("Error getting document:", error.message);
    });

  return data_;
  
}