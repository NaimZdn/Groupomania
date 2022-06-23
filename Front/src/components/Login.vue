<script>
export default {
  name: "Login"
}
</script>

<template>
  <body class="margin">
    <header class="container">
      <div class="header-flex-login">

        <div class="logo-flex">
          <img src="../images/Logo_red.png" alt="Groupomania logo">
        </div>

        <nav class="nav-flex-login">
          <p> Se connecter </p>
          <router-link class="anim" to="/sign-up"> S'inscrire </router-link>
        </nav>

      </div>
    </header>

    <main class="container">
      <section class="main-flex-login">

        <div class="illustration-login ">
          <img src="../images/Illustration-login.png" alt="Illustration Login">
        </div>

        <div class="form-signup">
          <h1> S'identifier </h1>

          <div class="input-icon">
            <input type="mail" placeholder="Email">
            <fa icon="fa-solid fa-at" />
          </div>

          <div class="input-icon">
            <input type='password' placeholder="Mot de passe">
            <fa class="icon-key-login" icon="fa-solid fa-lock" />
          </div>

          <div class="button-sign-login">
            <button> Se connecter </button>
          </div>

        </div>
      </section>
    </main>

    <footer class="footer-flex">

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