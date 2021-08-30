const firebases = {
  auth: () => {
    return {
      signInWithEmailAndPassword: (email, password) => {
        return new Promise((resolve, reject) => {
          if (email === "ana01@outlook.com") {
            const userCredential = {
              correo: email,
              user: "Sofia",
            };
            resolve(userCredential);
          } else {
            reject("Error en correo");
          }
        });
      },
    };
  },
};

export default jest.fn(() => {
  return firebases;
});
