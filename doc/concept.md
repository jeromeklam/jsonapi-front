# Concepts

Le but est de pouvoir communiquer avec un backoffice via le format [JsonApi](https://jsonapi.org/).

## Principe

### Lecture d'un résultat du serveur

Le serveur va retourner un résultat au format jsonApi.
Il va falloir dans un premier temps convertir ce résultat en objet json "normalisé".
Ce format "normalisé" sera le stockage en mémoire et son contenu pourra évoluer dans le temps, par exemple avec un système de websockets. Des méthodes de mise à jour du contenu de ce format existent.

Dans un second temps, si on désire "travailler" avec un ou plusieurs éléments de ce résultat il faudra les transformer en modèle.
Le modèle est un objet autonome et ne sera jamais impacté par des modifications de l'objet standard.

### Exemple

Cette opération va permettre de travailler avec un résultat considéré "standard" et donc de ne pas être couplé à un format sspécifique.

Exemple simple :

```
# Format JsonApi :
{
  data : {
    id: '45',
    type: 'test',
    attributes: {
      name: 'essai'
    }
  }
}

# Format attendu :
{
  MAINELEM: 'test',
  SORTEDELEMS: [45],
  test: { '45' : {id: '45', attributes: {} }},
  errors: [],
  length: 1
}
```

Pour convertir le résultat retourné par le serveur nous allons utiliser la méthode [jsonApiNormalizer](api.md#jsonapinormalizer-json-origin-opts-object).

```
   const result = '<json api result>';
   const list = jsonApiNormalizer(result);
```

### Plus en détail sur le format normalisé


Le format normalisé va mettre au même niveau l'ensemble des objets retournés par le serveur avec un tableau principal indiqué dans MAINELEM, qui est en quelque sorte le modèle principal géré. On retrouvera un tableau par object et dans chaque objet de ces tableaux les éventuels liens vers les autres éléments.

L'avantage est un gain de place, car on ne retrouve qu'une seule instance par modèle. Les lectures et mises à jour sont également plus simple à gérer.