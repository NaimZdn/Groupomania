<script>
export default {
  name: "Login"
}

</script>

<template>
<body>
  <header class="container"> 
    <div class="header-flex-login"> 
      <div class="logo-flex">
      <img src="../images/Logo_red.png" alt="Groupomania logo">
      </div>
      <nav class="nav-flex-login">
        <a href=""> Se connecter </a> 
        <a href=""> S'inscrire </a>
      </nav>
    </div>
  </header>

  <main class="container" > 
    <section class="main-flex-login">
      <div class="illustration-login"> 
          <img src="../images/Illustration-login.png" alt="Illustration Login">
      </div> 
      
      <div class="form-signup"> 
        <h1> S'identifier </h1>
        
           <div class="input-icon"> 
            <input type="mail" placeholder="Email"> 
            <img class="icon-envelope-login" src="../images/Icon-envelope.png"> 
          </div>

          <div class="input-icon"> 
            <input type ='password' placeholder="Mot de passe" > 
            <img class="icon-key-login" src="../images/Icon-key.png"> 
          </div>

          

          <div class="button-sign-login">  
            <button> Se connecter </button>
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

<style></style>


