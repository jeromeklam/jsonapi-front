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

