## Functions

<dl>
<dt><a href="#getNewModel">getNewModel(p_type, p_id, p_attributes)</a> ⇒ <code>Object</code></dt>
<dd><p>getNewModel : Retourne un nouveau modèle de travail</p>
</dd>
<dt><a href="#buildModel">buildModel(reducer, objectName, id, providedOpts, cache)</a></dt>
<dd><p>buildModel from a JsonApiNormalizer object</p>
</dd>
<dt><a href="#buildFirstModel">buildFirstModel(p_obj, p_type)</a> ⇒ <code>Object</code> | <code>null</code></dt>
<dd><p>buildFirstModel : Retourne le premier modèle disponible dans une utilisateur</p>
</dd>
<dt><a href="#getNewNormalizedObject">getNewNormalizedObject(p_type, p_id)</a> ⇒ <code>Object</code></dt>
<dd><p>getNewNormalizedObject : Return an empty normalized object</p>
</dd>
<dt><a href="#getNewJsonApi">getNewJsonApi(p_type, p_id, p_attributes)</a> ⇒ <code>Object</code></dt>
<dd><p>getNewJsonApi : Return an empty JsonApi object</p>
</dd>
<dt><a href="#getFieldErrorMessage">getFieldErrorMessage()</a></dt>
<dd><p>getFieldErrorMessage</p>
</dd>
<dt><a href="#jsonApiUpdate">jsonApiUpdate()</a></dt>
<dd><p>jsonApiUpdate</p>
</dd>
<dt><a href="#jsonApiRemove">jsonApiRemove()</a></dt>
<dd><p>jsonApiRemove</p>
</dd>
<dt><a href="#jsonApiNormalizer">jsonApiNormalizer(json, origin, opts)</a> ⇒ <code>Object</code></dt>
<dd><p>jsonApiNormalizer : Converti un résultat au format jsonApi en résultat &quot;normalisé00</p>
</dd>
<dt><a href="#getJsonApi">getJsonApi(obj, type)</a> ⇒ <code>Object</code></dt>
<dd><p>getJsonApi : Converti un modèle en object JsonApi</p>
</dd>
<dt><a href="#addRelationships">addRelationships()</a></dt>
<dd></dd>
<dt><a href="#getJsonApiWithRelationships">getJsonApiWithRelationships()</a></dt>
<dd></dd>
<dt><a href="#getFieldError">getFieldError()</a></dt>
<dd></dd>
<dt><a href="#queryStringToObject">queryStringToObject(queryString)</a> ⇒ <code>Object</code></dt>
<dd><p>queryStringToObject : Conversion d&#39;une chaine de caractère vers un objet javascript.</p>
</dd>
<dt><a href="#objectToQueryString">objectToQueryString(queryObj, options, nesting_start, level)</a> ⇒ <code>string</code></dt>
<dd><p>objectToQueryString : Conversion d&#39;un objet javascript en uri</p>
</dd>
</dl>

<a name="getNewModel"></a>

## getNewModel(p_type, p_id, p_attributes) ⇒ <code>Object</code>
getNewModel : Retourne un nouveau modèle de travail

**Kind**: global function  

| Param | Type |
| --- | --- |
| p_type | <code>string</code> | 
| p_id | <code>string</code> \| <code>number</code> | 
| p_attributes | <code>Object</code> | 

<a name="buildModel"></a>

## buildModel(reducer, objectName, id, providedOpts, cache)
buildModel from a JsonApiNormalizer object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| reducer | <code>Object</code> | JsonApi Object |
| objectName | <code>string</code> |  |
| id | <code>string</code> \| <code>number</code> |  |
| providedOpts | <code>Object</code> |  |
| cache | <code>Object</code> |  |

<a name="buildFirstModel"></a>

## buildFirstModel(p_obj, p_type) ⇒ <code>Object</code> \| <code>null</code>
buildFirstModel : Retourne le premier modèle disponible dans une utilisateur

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| p_obj | <code>Object</code> | L'object au format normalisé |
| p_type | <code>string</code> | Le type de l'objet |

<a name="getNewNormalizedObject"></a>

## getNewNormalizedObject(p_type, p_id) ⇒ <code>Object</code>
getNewNormalizedObject : Return an empty normalized object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| p_type | <code>string</code> | Le type |
| p_id | <code>string</code> \| <code>number</code> | L'identifiant |

<a name="getNewJsonApi"></a>

## getNewJsonApi(p_type, p_id, p_attributes) ⇒ <code>Object</code>
getNewJsonApi : Return an empty JsonApi object

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| p_type | <code>string</code> | Le type |
| p_id | <code>string</code> \| <code>number</code> | L'identifiant |
| p_attributes | <code>Object</code> | Les attributs |

<a name="getFieldErrorMessage"></a>

## getFieldErrorMessage()
getFieldErrorMessage

**Kind**: global function  
<a name="jsonApiUpdate"></a>

## jsonApiUpdate()
jsonApiUpdate

**Kind**: global function  
<a name="jsonApiRemove"></a>

## jsonApiRemove()
jsonApiRemove

**Kind**: global function  
<a name="jsonApiNormalizer"></a>

## jsonApiNormalizer(json, origin, opts) ⇒ <code>Object</code>
jsonApiNormalizer : Converti un résultat au format jsonApi en résultat "normalisé00

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| json | <code>Object</code> | Object à ajouter aux résultats existants (origin) |
| origin | <code>Object</code> | Résultats déjà présents, à compléter, format normalisé |
| opts | <code>Object</code> | Options |
| opts.endpoint | <code>string</code> |  |
| opts.filterEndpoint | <code>bool</code> |  |
| opts.camelizeKeys | <code>bool</code> |  |

<a name="getJsonApi"></a>

## getJsonApi(obj, type) ⇒ <code>Object</code>
getJsonApi : Converti un modèle en object JsonApi

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| obj | <code>Object</code> | Le modèle |
| type | <code>string</code> | Le type |

<a name="addRelationships"></a>

## addRelationships()
**Kind**: global function  
<a name="getJsonApiWithRelationships"></a>

## getJsonApiWithRelationships()
**Kind**: global function  
<a name="getFieldError"></a>

## getFieldError()
**Kind**: global function  
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
| options.emptyBrackets | <code>bool</code> | Ajoute des crochets vides pour les tableaux, par défaut false |
| nesting_start | <code>string</code> | Paramètre technique |
| level | <code>Number</code> | Paramètre technique |

