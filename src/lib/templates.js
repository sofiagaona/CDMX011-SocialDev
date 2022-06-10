export const pages = {
  home: {
    path: "/",
    template: `<section class="page_home">

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
              <p id="loginErrorGoogle"></p>
            </div>
          

          </div>

        </div>
          
        </section>
        `,
  },
  home2: {
    path: "/",
    template: `<section class="dateUserHome">
                 <h1 class="tittle_home2"> Bienvenido a Social </h1>
                 <p class="nameUser"></p>
                 <div><img class="profileimg" src=""></div>
                 <div><input class="btn_profile" type="button" value="Perfil"></div>
                 <div><input class="btn_make_post" type="button" value="Publicar"></div>
                 </div>
                 <section class="make_post_on_profile">
                 </section>
               </section> 
               <section class="all_post">
                </section> 
                 `,
  },
  singUp: {
    path: "/singup",
    template: `
    <section>
      <div class="box_general_singup">
        <div class="box_singup">
          <p class="text_register">Datos de registro</p>
       
          <form id="sign_up_form" class="form" >
            <div class="linea"> </div>
            <label class="invisible"> Nombre del Usuario </label >
            <input type="text" id="sign_up_user_name" placeholder="Nombre" required>
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
    path: "/login",
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
  profile: {
    path: "/profile",
    template: `
    <section class="dateUserHome">
      <h1 class="tittle_home2">Perfil</h1>
      <p class="nameUser"></p>
      <div><img class="profileimg" src=""></div>
      <div><input class="btn_editprofile" type="button" value="Editar Perfil"></div>
      <div class="UserData">
         <p class="titleData">Nombre: <span class="nameUserProfile dataProfile"></span></p>
         <p class="titleData">Ciudad: <span class="cityUser dataProfile"></span></p>
         <p class="titleData">Lugar de trabajo: <span class="workUser dataProfile"></span></p>
      </div>
      <div><input class="btn_make_post" type="button" value="Publicar"></div>
      
    </section>
    
    <section class="all_profile_post">
    </section>

    <section class="make_post_on_profile">
    </section>

    <section class="edit_profile_post">
    </section>

    <section class="dateUserHome1">
      <div class="ventana_modal_editar">

        <h1 class="tittle_editprofile">Editar Perfil</h1>
        <p class="nameUser"></p>

        <div class="uploadpicture">
          <div class="box_post_img"><img class="subprofileimg2"src=""><p id="porcent_carga"></p></div>
          <div class="form"><p>Cambiar Imagen</p></div>
          <input type="file" id="idfile" class="load_file">
        </div> 

        <div style="width: 100%">
          <form id="form_user_date" class="form">
            <input type="text" class="name_profile" placeholder="Nombre">
            <input type="text" class="city_profile" placeholder="Ciudad">
            <input type="text" class="work_profile" placeholder="Lugar de Trabajo">
            <button type="submint" >Guardar</button>
          </form>
        </div>
      </div>
    </section> 

    `,
  },
  makeapost: {
    path: "/makespost",
    template: `
  
    <form class="box_make_post">
      <div class="box_post_img">
        <img class="subprofileimg3"src="">
        <p class="subnameuser"></p>
      </div>
      <div class="post_publish">
        <textarea class='text_post' placeholder='¿Qué te gustaria públicar?' type ='text' required></textarea>
        <!--<div class="box_post_btn_publish">
          <div class="btn_post_publisher"> 
            <img class="menu_btn_publish" src="img/likeicon.png">
            <img class="menu_btn_publish" src="./img/shericon2.png">
            <img class="menu_btn_publish" src="./img/coment.png">
          </div>  
          <div> -->
          <h1>Prueba sofia</h1>
            <button type="submit" id="publish_post_profile">Publicar</button>
          </div>
        </div>  
      </div> 
    </form>
   
    `,
  },
  post: {
    path: "/post",
    template: (posts, imgP, name) => {
      let result = ``;
      if (posts.length === 0) {
        console.log("no imprime vacio");
      } else {
        posts.forEach((element) => {
          if (element[0] === " " || element[0] === "") {
            console.log("no imrime en blanco");
          } else {
            result += `
      <div class="box_post">
      <div class="box_post_img"><img class="subprofileimg"src="${imgP}"><p class="subnameuser">${name}</p><p class="date_posted"></p></div>
      <div class="posted"><p id="publicacion">${element[0]}</p>
      <div class="box_btn_delete_update">
      <input type="button" id="${element[1]}" class="delete" value="Eliminar">
      <input type="button" id="${element[1]}" class="update" value="Actualizar">
      </div>
      </div>
      <div class="box_post_btn">
          <input type="image" class="like menu_btn_text" id="${element[1]}" src="./img/likeicon.png"><p id="${element[1]} "class="p_likes"></p>
          <img class="menu_btn_text" src="./img/shericon2.png">
          <input type="image" id="${element[1]}" class="comment menu_btn_text" src="./img/coment.png">
      </div>
    
    </div>

    `;
          }
        });
        return result;
      }
    },
  },
  makeacomment: {
    path: "/comment",
    template: `
  
  <section class="dateUserHome2">
    <div class="ventana_modal_comment">
    <section class="all_post_comment">
    </section>
      <form id="form_make_comment" class="form">
        <input type="text" class="make_comment" placeholder="Hacer comentario" required>
        <button type="submint" class="send_comment">Enviar</button>
      </form>
    </div>
  </section> 
   
    `,
  },
  comment: {
    path: "/comment",
    template: (listComment, name) => {
      let results = ``;
      listComment.forEach((element) => {
        if (element === " " || element === "") {
          console.log("no imrime en blanco");
        } else {
          results += `
          <p id="textName" class="titleData">${name}: <span id="textComment" class="nameUserProfile dataProfile">${element}</span></p>
          `;
        }
      });
      return results;
    },
  },
  editpost: {
    path: "/editpost",
    template: (post) => {
      const results = `
       <form class="box_make_post">
          <p class="subnameuser"></p>
        </div>
        <div class="post_publish">
          <textarea class='text_post' type ='text'>${post}</textarea>
          <div class="box_post_btn_publish">
            <div class="btn_post_publisher"> 
              <img class="menu_btn_publish" src="./img/likeicon.png">
              <img class="menu_btn_publish" src="./img/shericon2.png">
              <img class="menu_btn_publish" src="./img/coment.png">
            </div>  
            <div>
              <button type="submit" id="publish_post_profile">Editar</button>
            </div>
          </div>  
        </div> 
      </form>
     
      `;
      return results;
    },
  },
};
