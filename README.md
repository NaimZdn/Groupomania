# Groupomania 

Starting by cloning the project at this adress : [Groupomania](https://github.com/Namsco/Groupomania.git)

After that, go to <strong>'Back'</strong> folder and execute this command :
```sh 
npm install
```

After back installation go to 'Front' folder and execute this command : 
```sh 
npm install
```

Before running the project you must verify if you have this following folders inside <strong>'Back'</strong> folder: 
```sh 
-images 
--uploads
---posts 
---profil
```

Inside 'profil' folder verify if you have a image file named <em>'random-picture.webp'</em>

Futhermore, be sure to inform, inside <strong>'.env'</strong> folder, the keys you want use for JWT and e-mail hashing. <br>
(<strong>Important :</strong> For more security it's advisable to enter a key with at least 20 characters) <br>
Make sure that the URL of your MongoDB database is correct inside <strong>'.env'</strong> folder. 

After this checking you can go to <strong>'Back'</strong> folder and execute this command : 
```sh 
npm run start
```

After that, inside the <strong>'Front'</strong> folder execute this following command : 
```sh 
npm run dev
```


Welcome to the social network of Groupomania company !
