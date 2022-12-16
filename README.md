# Getting Started with TOMA 

## Pour faire fonctionner le backend il faut suivre les étapes suivantes par ordre 

cd backend/

### 1 `npm install`

Pour installer tous les dependences qui existent dans le fichier json 

### 2 `installer Wampserver `

Puis ouvrire phpMyAdmin et cliquer sur login de root, inutile d'ajouter un mot de passe 

#### 2/1 `creer bd "auth_db"`

Il faut bien nommer la base auth_db comme c'est le mème nom dans backend/config/Database.js

### 3 `de-commenter les fonctions async() et store.sync() dans backend/index.js`

### 4 `nodemon index`
il faut installer nodemon si ce n'est pas deja fait -> https://www.npmjs.com/package/nodemon

### 5 `remètre en commentaire les fonctions async() et store.sync() dans backend/index.js`

**Note: cette procédure (pour async() et store.sync()) est à faire une fois au début de la configuration du projet 

## Pour effectuer des tests (optionnel) :
### `install and enable the REST Client on vs code` 
pour tester que la bd est bien synchronisée avec le backend : 
dans le ficher backend/request.rest : cliquer sur "Send Request" sous les commentaires suivants (par ordre) :
#### // Create a user
#### // get All Users
#### // Update a user
#### // delete a user
#### // Login User
Si dans le ficher response qui s'apparaitra à droite, dans la première ligne, c'est écrit "ok"/"Created" alors il n'y a pas d'erreur par contre si c'est écrit "Bad Request" c'est à dire que l'exécution de cette requête a échoué
