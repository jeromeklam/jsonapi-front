<a name="module_url"></a>

## url

* [url](#module_url)
    * [.queryStringToObject(queryString)](#module_url.queryStringToObject) ⇒ <code>Object</code>
    * [.objectToQueryString(queryObj, options, nesting_start, level)](#module_url.objectToQueryString) ⇒ <code>string</code>

<a name="module_url.queryStringToObject"></a>

### url.queryStringToObject(queryString) ⇒ <code>Object</code>
queryStringToObject : Conversion d'une chaine de caractère vers un objet javascript.

**Kind**: static method of [<code>url</code>](#module_url)  
**Summary**: Le but de cette fonction est de convertir un url du style ?param=1test vers un objet javascript  
**Returns**: <code>Object</code> - - L'url décodée sous forme d'objet  

| Param | Type | Description |
| --- | --- | --- |
| queryString | <code>string</code> | La chaine à convertir |

<a name="module_url.objectToQueryString"></a>

### url.objectToQueryString(queryObj, options, nesting_start, level) ⇒ <code>string</code>
objectToQueryString : Conversion d'un objet javascript en uri

**Kind**: static method of [<code>url</code>](#module_url)  

| Param | Type | Description |
| --- | --- | --- |
| queryObj | <code>Object</code> | L'objet javascript à convertir |
| options | <code>Object</code> | Les options de conversion |
| options.numericKeys | <code>bool</code> | Ajoute les indices numériques pour les tableaux, par défaut false |
| options.emptyBrackets | <code>bool</code> | Ajoute des crochets vides pour les tableaux, par défaut true |
| nesting_start | <code>string</code> | Paramètre technique |
| level | <code>Number</code> | Paramètre technique |

