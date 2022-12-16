# Getting Started with TOMA 

## Pour faire fonctionner le backend il faut suivre les étapes suivantes par ordre 

cd backend/

### `npm install`

Pour installer tous les dependences qui existent dans le fichier json 

### `installer Wampserver `

Puis ouvrire phpMyAdmin et cliquer sur login de root, inutile d'ajouter un mot de passe 

#### `creer bd "auth_db"`

Il faut bien nommer la base auth_db comme c'est le mème nom dans backend/config/Database.js

### `de-commenter les fonctions async() et store.sync() dans backend/index.js`

### `nodemon index`
il faut installer nodemon si ce n'est pas deja fait -> https://www.npmjs.com/package/nodemon

### `remètre en commentaire les fonctions async() et store.sync() dans backend/index.js`

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
