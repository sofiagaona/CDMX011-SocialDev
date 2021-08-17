export function sendSingUp(email, password) {
  const message = firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential === true) => {
      return 'Registro exitoso';
    })
    .catch((error) => {
      const errorMessage = error.message;
      return errorMessage;
    });
  return message;
}