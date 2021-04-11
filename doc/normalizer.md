## Functions

<dl>
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
</dl>

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

