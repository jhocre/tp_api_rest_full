
myApp ionic:

- Mini application fonctionnant avec deux onglets:

    - Le premier onglet vous demande de vous connecter avant tout.
    - Suite à la bonne connexion, un espace dédié au scan (vidéo ou manuel) des codes barres apparait, on vous demander si le livre ajouté a été lu ou pas et seront ajouté dans la liste adéquat.
    - Ainsi que la possibilité de visualiser la liste de ses livres lus et non lus.

    - Le second onglet proposera des livres en rapport avec la liste de livre qu'aura scanné l'utilisateur connecté, avec lien et prix pour amazone.

Côté restAPI

La plateforme reçois les information de connexion et vérifie si le couple login/password et bien présen et valide dans la BDD.
Si l'utilisateur est bien valide elle le laisse passer et génére un token.
Lors d'un scan, l'appli envoie le token, l'isbn du livre et un booléen (lu/pas lu).
Elle vérifie si le livre n'est pas déjà dans la BDD
Si le livre n'est pas existant, elle enregistre le livre dans la BDD book avec son titre, ses isbn.
Dans le même temps, elle enregistre dans la BDD de l'utilisateur l'id du livre dans read ou unread.