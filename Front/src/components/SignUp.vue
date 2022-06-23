<script>
export default {
  name: "SignUp"
}

</script>

<template>

  <body class="margin">
    <header class="container">
      <div class="header-flex">

        <div class="logo-flex">
          <img src="../images/Logo_red.png" alt="Groupomania logo">
        </div>

        <nav class="nav-flex-signup">
          <router-link to="/login"> Se connecter </router-link>
          <h1> S'inscrire </h1>
        </nav>

      </div>
    </header>

    <main class="container">
      <section class="main-flex">

        <div class="illustration-signup">
          <img src="../images/Illustration-sign-up.png" alt="Illustration Sign-Up">
        </div>

        <div class="form-signup">
          <h2> Créez votre compte</h2>

          <div class="input-icon">
            <input type="pseudo" placeholder="Pseudo">
            <fa class="icon-user-signup" icon="fa-solid fa-user"/>
          </div>

          <div class="input-icon">
            <input type="mail" placeholder="Email">
            <fa class="icon-at-signup" icon="fa-solid fa-at"/>
          </div>

          <div class="input-icon">
            <input type='password' placeholder="Mot de passe">
            <fa class="icon-key-signup" icon="fa-solid fa-lock"/>
          </div>

          <div class="checkbox-cgu">
            <input type="checkbox">
            <span class="cgu"> J'accepte les <a href="#">conditions générales d'utilisations</a></span>
          </div>

          <div class="button-sign">
            <button> Créer mon compte </button>
          </div>

        </div>
      </section>
    </main>

    <footer class="container footer-flex">
      <div class="footer-icon">
        <a href="">
          <img class="icon" src="../images/Icon-facebook.png">
        </a>
      </div>

      <div class="footer-icon">
        <a href="">
          <img class="icon" src="../images/Icon-linkedin.png">
        </a>
      </div>

      <div class="footer-icon">
        <a href="">
          <img class="icon" src="../images/Icon-twitter.png">
        </a>
      </div>

      <div class="footer-icon">
        <a href="">
          <img class="icon" src="../images/Icon-mail.png">
        </a>
      </div>
    </footer>
  </body>
</template>