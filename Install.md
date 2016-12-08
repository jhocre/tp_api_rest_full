myApp Ionic :

- Installer ionic2 tabs
- npm install du package.json

RestAPI :

- installer mongo db
- cloner le projet github https://github.com/jhocre/tp_api_rest_full.git
- le dossier booklocator correspond à l'API
- le dossier booklocatorinioc correspond à l'appli

Il n'y a pas de formulaire pour insérer un user, il faut passer par POSTMAN en utilisant la route:
http://127.0.0.1:3000/auth/create (en POST) et saisir des champs "name" et "password" de type form-data

Une fois l'utilisateur créé, il suffit de se logguer via la route:
http://127.0.0.1:3000/auth/ (en POST) et saisir des champs "name" et "password" de type form-data

un token est généré et envoyé, il faut le copier et l'insérer dans Authorization Bearer [token] pour pouvoir utiliser
le reste des routes.