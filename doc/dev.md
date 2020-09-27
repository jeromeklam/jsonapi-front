
# Développement

## Installation

Pour développer faire
```
npm link
```
pour pouvoir utiliser ce projet comme un composant
Cette commande n'est à faire qu'une seule fois pour crééer le lien

## Utilisation

Pour que les modifications soient utilisables dans le projet principal, il faut faire une compile à la main
```
npm run build
```

Il faut également adapter les tests si le code a été modifié, mais au minimum lancer les actuels pour vérifier le comportement.
```
npm run test
```

En cas de modification des fonctions, ajouts, ... merci de générer la documentation :
```
npm run doc:all
```
