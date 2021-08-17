export const pages = {
  home: {
    path: '/',
    template:
        `<section class="page_home">

        <p class="subtitle" > Unete a la comunidad mas grande de desarrolladores!!! </p>

        <div class="home_content_login">

          <div class="home_box_img_stickers">
            <img class="home_img_stickers" src="./img/stickers.jpeg">
          </div>

          <div class="home_box_login">
            <input type="button" class="home_btn_login" id="id_home_btn_login" value="LogIn"></input>
            <input type="button" class="home_btn_login_google" id="id_home_btn_login_google" value="Cuenta de Google"></input>
            <p class="home_text_01">¿Aun no tienes cuenta?</p>
            <p class="home_text_02" id="id_home_text_registro">Registrate</p>

          </div>

        </div>
          
        </section>
        `,
  },
};
