myApp Ionic:

- package.json -> permet l'installation de tout les module et plugin ajouté à l'application
- src/app/app.module.ts -> regroupe les routes des différentes pages créees
- src/pages/ -> regroupent les différentes pages et pour chaque pages 3 fichiers sont crées:
    - page.html -> contient la structure html de cette page, pouvant contenir des variables
    - page.ts -> contient les imports de modules et plugins, les fonctions et définitions de variables pour cette page
    - page.scss -> contient le style scss pour cette page, qui sera par la suite compilé en css.
- assets -> contient les médias, icones et images
- index.html -> layout(structure mère HTML) de base de notre application
