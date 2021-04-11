## Functions

<dl>
<dt><a href="#queryStringToObject">queryStringToObject(queryString)</a> ⇒ <code>Object</code></dt>
<dd><p>queryStringToObject : Conversion d&#39;une chaine de caractère vers un objet javascript.</p>
</dd>
<dt><a href="#objectToQueryString">objectToQueryString(queryObj, options, nesting_start, level)</a> ⇒ <code>string</code></dt>
<dd><p>objectToQueryString : Conversion d&#39;un objet javascript en uri</p>
</dd>
</dl>

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

