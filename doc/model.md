## Functions

<dl>
<dt><a href="#getNewModel">getNewModel(pType, pId, pAttributes)</a> ⇒ <code>Object</code></dt>
<dd><p>getNewModel : Retourne un nouveau modèle de travail</p>
</dd>
<dt><a href="#normalizedObjectModeler">normalizedObjectModeler(pObj, pType, pId, providedOpts, cache, level, done)</a></dt>
<dd><p>get a model from a NormalizedObject</p>
</dd>
<dt><a href="#normalizedObjectFirstModel">normalizedObjectFirstModel(pObj, pType)</a> ⇒ <code>Object</code> | <code>null</code></dt>
<dd><p>buildFirstModel : Retourne le premier modèle disponible dans une utilisateur</p>
</dd>
</dl>

<a name="getNewModel"></a>

## getNewModel(pType, pId, pAttributes) ⇒ <code>Object</code>
getNewModel : Retourne un nouveau modèle de travail

**Kind**: global function  

| Param | Type |
| --- | --- |
| pType | <code>string</code> | 
| pId | <code>string</code> \| <code>number</code> | 
| pAttributes | <code>Object</code> | 

<a name="normalizedObjectModeler"></a>

## normalizedObjectModeler(pObj, pType, pId, providedOpts, cache, level, done)
get a model from a NormalizedObject

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pObj | <code>Object</code> | NormalizedObject objet unique ou liste d'objets |
| pType | <code>string</code> | Nom du model |
| pId | <code>string</code> \| <code>number</code> | Identifiant de l'objet |
| providedOpts | <code>Object</code> | eager |
| cache | <code>Object</code> |  |
| level | <code>number</code> |  |
| done | <code>Object</code> |  |

<a name="normalizedObjectFirstModel"></a>

## normalizedObjectFirstModel(pObj, pType) ⇒ <code>Object</code> \| <code>null</code>
buildFirstModel : Retourne le premier modèle disponible dans une utilisateur

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| pObj | <code>Object</code> | L'object au format normalisé |
| pType | <code>string</code> | Le type de l'objet |

