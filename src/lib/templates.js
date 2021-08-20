export const pages = {
  home:
  {
    path: '/',
    template:
      `<section class="page_home">

        <p class="subtitle" > Unete a la comunidad más grande de desarrolladores!!! </p>

        <div class="home_content_login">

          <div class="home_box_img_stickers">
            <img class="home_img_stickers" src="https://anasofiamoreno.github.io/CDMX011-SocialDev/img/stickers.jpeg">
          </div>

          <div class="home_box_login">
            <input type="button" class="home_btn_login" id="id_home_btn_login" value="LogIn"></input>
            <input type="button" class="home_btn_login_google" id="id_home_btn_login_google" value="Cuenta de Google"></input>
            <p class="home_text_01">¿Aun no tienes cuenta?</p>
            <div class="home_text_02" id="id_home_text_registro">
              <p class=".btnMenuReg">Registrate</p>
            </div>
          

          </div>

        </div>
          
        </section>
        `,
  },
  singUp: {
    path: '/singup',
    template: `
    <section>
      <div class="box_general_singup">
        <div class="box_singup">
          <p class="text_register">Datos de registro</p>
       
          <form id="sign_up_form" class="form" >
            <div class="linea"> </div>
            <label class="invisible"> Nombre del Usuario </label >
            <input type="text" id="sign_up_user_mane" placeholder="Nombre" required>
            <input type="email" id="sign_up_email" placeholder="Correo" required>
            <input type="password" id="sign_up_password1" placeholder="Contraseña" required>
            <input type="password" id="sign_up_password2"  placeholder="Verificar contraseña" required>
            <div class="lineaform"> </div>
            <p id="sign_up_password_error"></p>
            <button type="submit" class="btnRegistrar">Registrar</button>
          <form>
        </div>
      </div> 
    </section>
    `,

  },
  login: {
    path: '/login',
    template: `
  <section>
  <div class="box_singup">
     <p class="text_register">Datos de registro</p>
     <div class="linea"> </div>
     
     <form id="login_form" class="form" >
     <input type="email" id="login_email" placeholder="Correo" required>
     <input type="password" id="login_password" placeholder="Contraseña" required>
     <div class="lineaform"> </div>
     <p id="login_error"></p>
     <button type="submit" class="btnRegistrar">Login</button>
     <form>
     </div>
    
  </section>
  `,

  },
};
