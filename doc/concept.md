# Concepts

Le but est de pouvoir communiquer avec un backoffice via le format [JsonApi](https://jsonapi.org/).

## Principe

Le serveur va retourner un résultat au format jsonApi.
Il va falloir dans un premier temps convertir ce résultat en objet json standard afin de disposer au niveau 0 de la structure de l'ensemble des modèles disponibles.
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
