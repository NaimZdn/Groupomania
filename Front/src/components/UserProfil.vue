<script>
export default {
  name: "UserProfil"
}

</script>

<template>
  <header class="bg-main">
    <div class="header-flex-main">

      <div class="logo-flex-main">
        <img class="logo_desktop" src="../images/Logo_red.png" alt="Groupomania logo">
        <img class="logo_mobile" src="../images/Groupomania-logo_mobile.png" alt="Groupomania logo">
      </div>

      <nav class="nav-flex-main">
        <a class="profil-menu" href=""> 
          <img class="user-picture" src="../images/Photo CV.jpg">
        </a>
      </nav>
    </div>
  </header>
  <main class="container-flex" >
    <section class="user-information-container">
        <div class="user-information">
            <div class="user-picture-container">
                <img class="user-picture_profil" src="../images/Photo CV.jpg">
            </div>
            <div class="user-pseudo_profil"> 
                <p> Pseudo</p>
            </div>
        </div> 

        <div class="information-modification-container"> 
            <button> Modifier vos informations </button>
        </div>

        <div class="user-tabs-container">
            <div class="user-tab-activity true"> Activité </div> 
            <div class="user-tab-settings"> Paramètres </div>
        </div>

        <div class="user-tab-content-container"> 
            <div class="content-activity" > 
               <article class="activity-post-container"> 
                    <div class="activity-post-header"> 
                        <div class="activity-user-picture"> 
                            <img class="user-picture" src="../images/Photo CV.jpg">
                        </div>

                        <div class="activity-user-pseudo"> 
                            <h2> Pseudo </h2>
                            <p> 14 juin 2010 </p>
                        </div>

                        <div class="activity-user-option"> 
                            <fa icon="fa-solid fa-gear"/>
                        </div>
                    </div>

                    <div class="activity-post-main"> 
                        <div class="activity-post-quote"> 
                            <p> Yo, vous allez bien ? </p>
                        </div>

                        <div class="activity-post-image"> 
                            <img src="../images/Geometric abstract-02.jpg">
                        </div>

                    </div>

                    <div class="post-footer-flex">
                        <div class="post-comment">
                            <fa class="icon-comment-feed" icon="fa-solid fa-comment-dots" />
                            <span class="post-comment-text"> 7 </span>
                        </div>

                        <div class="post-like">
                            <fa class="icon-thumb-feed" icon="fa-solid fa-thumbs-up" />
                            <span class="like-number"> 5 </span>
                        </div>
                    </div>

                    <div class="all-comment">
                        <div class="user-comment-picture-container"> 
                            <a href=""> <img class="user-comment-picture" src="../images/Photo CV.jpg"> </a>
                        </div>
                        <div class="comment-flex">
                            <p id="pseudo"> Pseudo</p>
                            <p id="comment"> Voici mon commentaire </p>
                        </div>
                    </div>


                    <div class="post-comment-container">
                        <div class="user-post-comment-picture-container"> 
                            <a href=""> <img class="user-post-comment-picture" src="../images/Photo CV.jpg"> </a>
                        </div>
                        <span class="create-comment" role="textbox" contenteditable></span>
                    </div>

                    <div class="button-flex">
                        <button class="comment-button">PUBLIER</button>
                    </div>

                    <div class="activity-post-footer"> </div>

                </article> 
            
            </div>

           <!-- <article class="content-settings">
                <div class="settings-user"> 

                    <p> Utilisateur inscrit le 10 juin 2010 </p>

                    

                <div class="settings-button">
                    <button> Supprimer le compte </button>
                </div>
                </div> 
                


            </article> -->

        </div>



        
    </section>

  </main> 



</template>