export function sendSingUp(email, password) {
  const message = firebase.auth().createUserWithEmailAndPassword(email, password)
<<<<<<< HEAD
    .then((userCredential === true) => {
      return 'Registro exitoso';
=======
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
>>>>>>> 7c74494fce57250ac021ed51e88de8035f364e29
    })
    .catch((error) => {
      const errorMessage = error.message;
      return errorMessage;
    });
<<<<<<< HEAD
  return message;
}
=======

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
>>>>>>> 7c74494fce57250ac021ed51e88de8035f364e29
