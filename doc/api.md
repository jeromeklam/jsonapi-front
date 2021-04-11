## Modules

<dl>
<dt><a href="#module_jsonapi">jsonapi</a></dt>
<dd></dd>
</dl>

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
<dt><a href="#getNewNormalizedObject">getNewNormalizedObject(pType, pId)</a> ⇒ <code>Object</code></dt>
<dd><p>getNewNormalizedObject : Renvoie un nouvel objet normalisé du type spécifié</p>
</dd>
<dt><a href="#normalizedObjectUpdate">normalizedObjectUpdate(json, key, value, ignoreAdd)</a> ⇒ <code>Object</code></dt>
<dd><p>normalizedObjectUpdate : Essaye de modifier les objets normalisé, si présents, dans une liste, pour le type spécifié</p>
</dd>
<dt><a href="#normalizedObjectRemove">normalizedObjectRemove(json, key, value)</a> ⇒ <code>Object</code></dt>
<dd><p>normalizedObjectRemove : Essaye d&#39;enlever les objets normalisés, si présents, dans une liste, pour le type spécifié</p>
</dd>
<dt><a href="#jsonApiNormalizer">jsonApiNormalizer(json, origin, opts)</a> ⇒ <code>Object</code></dt>
<dd><p>jsonApiNormalizer : Converti un résultat au format jsonApi en résultat &quot;normalisé&quot;</p>
</dd>
<dt><a href="#queryStringToObject">queryStringToObject(queryString)</a> ⇒ <code>Object</code></dt>
<dd><p>queryStringToObject : Conversion d&#39;une chaine de caractère vers un objet javascript.</p>
</dd>
<dt><a href="#objectToQueryString">objectToQueryString(queryObj, options, nesting_start, level)</a> ⇒ <code>string</code></dt>
<dd><p>objectToQueryString : Conversion d&#39;un objet javascript en uri</p>
</dd>
</dl>

<a name="module_jsonapi"></a>

## jsonapi

* [jsonapi](#module_jsonapi)
    * [.getNewJsonApi(p_type, p_id, p_attributes)](#module_jsonapi.getNewJsonApi) ⇒ <code>Object</code>
    * [.getJsonApi(obj, type, includes)](#module_jsonapi.getJsonApi) ⇒ <code>Object</code>

<a name="module_jsonapi.getNewJsonApi"></a>

### jsonapi.getNewJsonApi(p_type, p_id, p_attributes) ⇒ <code>Object</code>
getNewJsonApi : Renvoi un objet JsonApi vide

**Kind**: static method of [<code>jsonapi</code>](#module_jsonapi)  
**Returns**: <code>Object</code> - - L'objet JsonApi vide  

| Param | Type | Description |
| --- | --- | --- |
| p_type | <code>string</code> | Type de l'objet JsonApi |
| p_id | <code>string</code> | Identifiant de l'objet JsonApi |
| p_attributes | <code>Object</code> | Attributs à ajouter à l'objet JsonApi vide |

<a name="module_jsonapi.getJsonApi"></a>

### jsonapi.getJsonApi(obj, type, includes) ⇒ <code>Object</code>
getJsonApi : Converti un modèle en object JsonApi

**Kind**: static method of [<code>jsonapi</code>](#module_jsonapi)  
**Returns**: <code>Object</code> - - L'objet JsonApi  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Le modèle |
| type | <code>string</code> | Le type |
| includes | <code>array</code> | Les objets inclus |

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

<a name="getNewNormalizedObject"></a>

## getNewNormalizedObject(pType, pId) ⇒ <code>Object</code>
getNewNormalizedObject : Renvoie un nouvel objet normalisé du type spécifié

**Kind**: global function  
**Returns**: <code>Object</code> - Nouvel objet normalisé  

| Param | Type | Description |
| --- | --- | --- |
| pType | <code>string</code> | Le type |
| pId | <code>string</code> \| <code>number</code> | L'identifiant |

<a name="normalizedObjectUpdate"></a>

## normalizedObjectUpdate(json, key, value, ignoreAdd) ⇒ <code>Object</code>
normalizedObjectUpdate : Essaye de modifier les objets normalisé, si présents, dans une liste, pour le type spécifié

**Kind**: global function  
**Returns**: <code>Object</code> - La liste des objets du type spécifié en format "json normalisé" sans l'objet (ou les objets)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> | La liste des objets du type spécifié en format "json normalisé" |
| key | <code>string</code> | Le type des objets |
| value | <code>Object</code> | L'objet ou les objets à modifier en format "json normalisé" |
| ignoreAdd | <code>bool</code> | Si vrai pas de création automatique de l'objet s'il n'existe pas dans la liste |

<a name="normalizedObjectRemove"></a>

## normalizedObjectRemove(json, key, value) ⇒ <code>Object</code>
normalizedObjectRemove : Essaye d'enlever les objets normalisés, si présents, dans une liste, pour le type spécifié

**Kind**: global function  
**Returns**: <code>Object</code> - La liste des objets du type spécifié en format "json normalisé" sans l'objet (ou les objets)  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> | La liste des objets du type spécifié en format "json normalisé" |
| key | <code>string</code> | Le type des objets |
| value | <code>Object</code> | L'objet ou les objets à supprimer en format "json normalisé" |

<a name="jsonApiNormalizer"></a>

## jsonApiNormalizer(json, origin, opts) ⇒ <code>Object</code>
jsonApiNormalizer : Converti un résultat au format jsonApi en résultat "normalisé"

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> | Objet jsonApi à ajouter à la liste des objets existants (origin) |
| origin | <code>Object</code> | Liste des objets normalisés déjà présents, à compléter |
| opts | <code>Object</code> | Options |
| opts.endpoint | <code>string</code> |  |
| opts.filterEndpoint | <code>bool</code> |  |
| opts.camelizeKeys | <code>bool</code> |  |

<a name="queryStringToObject"></a>

## queryStringToObject(queryString) ⇒ <code>Object</code>
queryStringToObject : Conversion d'une chaine de caractère vers un objet javascript.

**Kind**: global function  
**Summary**: Le but de cette fonction est de convertir un url du style ?param=1test vers un objet javascript  
**Returns**: <code>Object</code> - | {String}  

| Param | Type | Description |
| --- | --- | --- |
| queryString | <code>string</code> | La chaine à convertir |

<a name="objectToQueryString"></a>

## objectToQueryString(queryObj, options, nesting_start, level) ⇒ <code>string</code>
objectToQueryString : Conversion d'un objet javascript en uri

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| queryObj | <code>Object</code> | L'objet javascript à convertir |
| options | <code>Object</code> | Les options de conversion |
| options.numericKeys | <code>bool</code> | Ajoute les indices numériques pour les tableaux, par défaut false |
| options.emptyBrackets | <code>bool</code> | Ajoute des crochets vides pour les tableaux, par défaut true |
| nesting_start | <code>string</code> | Paramètre technique |
| level | <code>Number</code> | Paramètre technique |

