# Projet de monétisation - Module d'affichage de données dans un tableau HTML avec filtrage

# Introduction

Ce module permet d'afficher des données fournies sous forme de tableau HTML. Il offre également la possibilité de filtrer ces données en utilisant des paramètres de requête URL.

# Technologies utilisées

1. JavaScript (ES6 +)
2. HTML5
3. CSS3
4. Jest

# Compatibilité Serveur

Ce module est conçu pour être hautement compatible et fonctionnel. Il peut être exécuté de deux manières :

### Serveur Local

Le module a été testé et est entièrement fonctionnel sur un serveur local. Vous pouvez démarrer le serveur local en suivant les instructions dans la section "Démarrage".

### Hébergement Distant

Le module est également disponible sur un hébergement distant via Vercel. Vous pouvez accéder au module fonctionnel à cette adresse : [Test Recrutement sur Vercel](https://test-recrutement-nine.vercel.app/)

# Structure du code

Le code est organisé de manière modulaire pour une meilleure lisibilité et maintenabilité. Il suit les bonnes pratiques de développement JavaScript.

## Auteur : Tamara Evpraksina

## Licence : Ce projet est sous licence ISC.

## Exigences de code

Le module JavaScript est écrit en utilisant la norme ES6+ et ne nécessite pas de framework JS tel que React ou Vue.

## Prérequis

Avant de procéder à l'installation, assurez-vous que Node.js est installé sur votre système. Si ce n'est pas le cas, vous pouvez le télécharger et l'installer à partir du site officiel de Node.js.

## Installation

Pour installer le module, suivez ces étapes :

1. Clonez le dépôt du projet avec la commande `git clone git@github.com:Tamy67/test-recrutement.git`.
2. Accédez au répertoire du projet avec la commande `cd media`.
3. Installez les dépendances avec la commande `npm install`.

## Démarrage

Pour lancer le module, suivez ces étapes :

1. Démarrez le serveur local avec la commande `npm start`.
2. Ouvrez un navigateur Web et accédez à l'adresse [http://localhost:8080/](http://localhost:8080/) (ou à une autre adresse indiquée dans la sortie).

## Utilisation

Le module d'affichage des données dans un tableau HTML vous permet d'afficher les données à partir d'un jeu de données sous forme de tableau avec filtrage. Pour utiliser le module, vous pouvez ajouter des paramètres dans la requête URL pour filtrer les données.

### Paramètres de filtrage

Vous pouvez utiliser les paramètres de filtrage suivants dans la requête URL :

-   `eyeColor` - filtrage par couleur des yeux. Les valeurs disponibles sont : `blue`, `brown`, `green`.
-   `age` - filtrage par âge. Vous pouvez spécifier des plages d'âge : `20-25`, `26-30`, `31-35`, `36-41`.

Exemples de requêtes URL avec des paramètres de filtrage :

-   [http://localhost:8080/?eyeColor=blue&age=26-30](http://localhost:8080/?eyeColor=blue&age=26-30)
-   [http://localhost:8080/?eyeColor=brown](http://localhost:8080/?eyeColor=brown)

### Affichage des données

Après l'application des paramètres de filtrage, le module affichera les données sous forme de tableau HTML avec les colonnes suivantes : `Nom`, `Prénom`, `Âge`, `Couleur des yeux`,`Email`, `Company` et `Balance`.

### Tests

Des tests unitaires sont inclus dans le projet pour garantir son bon fonctionnement. Vous pouvez exécuter les tests en utilisant la commande suivante : `npm test`

### Outils utilisés

Jest : Framework de test JavaScript.
Jest Fetch Mock : Utilisé pour les tests de fonctions liées à Fetch.
