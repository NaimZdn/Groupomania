<script>
export default {
  name: "Mainpage"
}

</script>
<template>
  <header class="bg-main">
    <div class="header-flex-main">

      <div class="logo-flex-main">
        <img src="../images/Logo_red.png" alt="Groupomania logo">
      </div>

      <nav class="nav-flex-main">
        <a href=""> <img class="user-picture" src="../images/Photo CV.jpg"> </a>
        <div class="bg-disconnect">
          <a class="button-disconnect">
            <fa icon="fa-solid fa-power-off" />
          </a>
        </div>
      </nav>

    </div>
  </header>

  <main>
    <section class="container-flex">
      <div class="make-post">

        <div class="post-form-flex">
          <div class="post-picture">
            <img class="user-post-picture" src="../images/Photo CV.jpg">
          </div>
          <span class="make-comment" role="textbox" placeholder="Ajoutez un post" contenteditable></span>
        </div>

        <div class="make-post-button">
          <label for="file-upload" class="import-file"> <img src="../images/Icon-image.png"></label>
          <input id="file-upload" type="file">
          <button class="post-button">PUBLIER</button>
        </div>
      </div>
    </section>
  
    <section class="container-flex">
      <div class="post">
        <div class="post-header-flex">

          <div class="post-picture">
            <a href=""> <img class="user-post-picture" src="../images/Photo CV.jpg"> </a>
          </div>

          <div class="post-text">
            <h2>Pseudo</h2>
            <p> 14 juin 2022 à 15h00</p>
          </div>

          <div class="post-option">
            <img src="../images/Icon-option.png">
          </div>
        </div>

        <div class="post-text-content">
          <p>Yo, voici ma nouvelle création. N'hésitez pas à lacher un like les bg ! </p>
        </div>

        <div class="post-image">
          <img src="../images/Geometric abstract-02.jpg">
        </div>

        <div class="post-footer-flex">
          <div class="post-comment">
            <fa class="icon-comment-feed" icon="fa-solid fa-comment-dots" />
            <span class="post-comment-text"> 7 commentaires </span>
          </div>

          <div class="post-like">
            <fa class="icon-thumb-feed" icon="fa-solid fa-thumbs-up" />
            <span class="like-number"> 5 </span>
          </div>
        </div>

        <div class="all-comment">
          <a href=""> <img class="user-comment-picture" src="../images/Photo CV.jpg"> </a>
          <div class="comment-flex">
            <p id="pseudo"> Pseudo</p>
            <p id="comment"> Voici mon commentaire </p>
          </div>
        </div>

        <div class="all-comment">
          <a href=""> <img class="user-comment-picture" src="../images/Photo CV.jpg"> </a>
          <div class="comment-flex">
            <p id="pseudo"> Pseudo</p>
            <p id="comment"> Voici mon commentaire </p>
          </div>
        </div>

        <div class="all-comment">
          <a href=""> <img class="user-comment-picture" src="../images/Photo CV.jpg"> </a>
          <div class="comment-flex">
            <p id="pseudo"> Pseudo</p>
            <p id="comment"> Voici mon commentaire </p>
          </div>
        </div>

        <div class="all-comment">
          <a href=""> <img class="user-comment-picture" src="../images/Photo CV.jpg"> </a>
          <div class="comment-flex">
            <p id="pseudo"> Pseudo</p>
            <p id="comment"> Voici mon commentaireVoici mon commentaireVoici mon commentaireVoici mon commentaireVoici
              mon commentaire </p>
          </div>
        </div>

        <div class="all-comment">
          <div class="comment-picture">
            <a href=""> <img class="user-comment-picture" src="../images/Photo CV.jpg"> </a>
          </div>
          <span class="create-comment" role="textbox" contenteditable></span>
        </div>

        <div class="button-flex">
          <button class="comment-button">PUBLIER</button>
        </div>

      </div>
    </section>
  </main>
</template>