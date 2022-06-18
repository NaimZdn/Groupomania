<script setup>

</script>

<template>
<body>
  <header class="container"> 
    <div class="header-flex"> 
      <div class="logo-flex">
      <img src="./images/Logo_red.png" alt="Groupomania logo">
      </div>
      <nav class="nav-flex">
        <a href=""> Se connecter </a> 
        <a href=""> S'inscrire </a>
      </nav>
    </div>
  </header>

  <main class="container" > 
    <section class="main-flex">
      <div class="illustration-signup"> 
          <img src="./images/Illustration-sign-up.png" alt="Illustration Sign-Up">
      </div> 
      
      <div class="form-signup"> 
        <h1> Créez votre compte</h1>
          <div class="input-icon"> 
            <input type="pseudo" placeholder="Pseudo">  
            <img class="icon-pseudo" src="./images/Icon-user.png"> 
          </div>

           <div class="input-icon"> 
            <input type="mail" placeholder="Email"> 
            <img class="icon-envelope" src="./images/Icon-envelope.png"> 
          </div>

          <div class="input-icon"> 
            <input type ='password' placeholder="Mot de passe" > 
            <img class="icon-key" src="./images/Icon-key.png"> 
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
        <img class="icon" src="./images/Icon-facebook.png">
      </a>
    </div> 

    <div class="footer-icon">
      <a href="">
        <img class="icon" src="./images/Icon-linkedin.png">
      </a>
    </div> 

    <div class="footer-icon">
      <a href="">
        <img class="icon" src="./images/Icon-twitter.png">
      </a>
    </div> 

    <div class="footer-icon">
      <a href="">
        <img class="icon" src="./images/Icon-mail.png">
      </a>
    </div> 


  </footer>

  </body>

</template>

<style></style>


