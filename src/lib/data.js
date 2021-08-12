export function sendSingUp(email, password) {
  
 let message = firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      var user = userCredential;
      console.log(user)
      return "Registro exitoso"
    })
    .catch((error) => {
      var errorMessage = error.message;
     console.log(errorMessage)
     return errorMessage

    });

   

   return message

}  