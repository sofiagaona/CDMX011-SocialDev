export const pages = {
    signUp: {
      path: '/',
      template: 
        `<section class="fondo_ventana_modal">
          <div class="ventana_modal_registro" id="ventana_modal">
            <form id="sign_up_form" class="sign_up_form">
              <input type="text" id="sign_up_user_mane" placeholder="Nombre de usuario">
              <input type="email" name="" id="sign_up_email" placeholder="correoElectr@google.com">
              <label for=""> Ingresa un contraseña de más de 6 dígitos
                <input type="password" name="" id="sign_up_password1" placeholder="contraseña">
                <input type="password" name="" id="sign_up_password2" placeholder="confirmar contraseña">
              </label>
              <p class="sign_up_password_error" id="sign_up_password_error"></p>
              <button type="submit" class="sign_up_button" id='btn_singup'>Registrar</button>
            </form>
            <button class="sign_up_google sign_up_button">Ingresa con google</button>
          </div>
        </section>
        `
  },
};
