# Json Schema
Simpleapp implement customized version of json schema. This chapter cover some explanation of the special property. 
To understannd what is json schema, refer [official documentation](https://json-schema.org/learn/getting-started-step-by-step)
To prepare jsonschema efficiently, we can convert json sample data to jsonschema [here](https://redocly.com/tools/json-to-json-schema/)


# Sample
**All properties defined in json schema shall use camelCase standard, it will effect quality of frontend input fields generated field title** 
refer below example `product.json`:
```json
{
  "type": "object",
  "x-simpleapp-config": {
    "documentType": "prd",
    "documentName": "product",
    "uniqueKey": "productCode",
    "documentTitle": "productName",
    "isolationType": "org",
    "pageType": "crud",
    "additionalAutoCompleteFields": ["defaultprice"],
    "additionalApis":[{
        "action":"hello",
        "entryPoint":"/hello/:id",
        "requiredRole":["User"],
        "method":"get", 
        "execute":"ping",
        "description":"say hello"
        } ],
  },
  "properties": {
    ...
    "productCode": { "type": "string", "example": ["BK-MTHP1"] },
    "productName": { "type": "string", "example": ["Math Primary 1 Book"] },
    "category": {
      "type": "object",
      "x-foreignkey": "category",
      "properties": {
        "_id": { "type": "string" },
        "label": { "type": "string" }
      }
    },    
    ...
  }
}
```
There is 2 special property (and only 2) which is
1. root level property `x-simpleapp-config`, which define how the json schema been use to generate source code
2. field level property `x-foreignkey`: field level property, which declare foreign key `category`. It require another json schema `category.json` which will store at different mongodb collection


## `x-simpleapp-config`
It tell code generator what it need to do with this schema such as:
1. store under which collection
2. tag with what api name
3. rules of data isolation 
4. implement special document numbering format
5. how data index and much more.

| property | datatype | required | description|
| --- | --- | --- | --- | 
| documentType | string | yes |short form of document name, it is unique identity of resource use by some place, like configure document running number, tags in swagger ui, backend file prefix and etc. Example: inv, po |
| documentName | string | yes | default name of mongodb collection, also act as long unique identity of resources, most of the place will use this name as as resource name, or prefix of resource name. Example invoice,purchaseorder
| isolationType | string | yes | data isolation rules. `none`: shall all tenant, `tenant`: shall all organization in same tenant, `org`: shall to all branch under same org. `branch`: only share within same branch
| uniqueKey | string | usually yes | declare unique key field name, such as itemCode, documentNo, studentCode. auto generate document running number shall use field name declare here too. it auto appear in autocomplete. it will auto index in mongodb
| uniqueKeys | string[][] | no | define special single or compound unique keys like `[['orgId','createdBy'],['recordId']]`
| documentTitle | string | usually yes | label or title of this record. such as itemName, categoryName, customerName, invoiceTitle. it auto appear in autocomplete
| documentDate | string | no | define which field name of date. like invoiceDate, orderDate. it allow frontend know how to filter current month record.  |
| generateDocumentNumber | boolean | no | it tell code generator whether current schema have document numbering control|
| pageType | string | usually yes| define 'crud' to generate template page, else no auto create page|
|additionalAutoCompleteFields| array of string| no | define what others field you want to put into autocomplete, from this schema. such as product always like to include `defaultprice`, `uom`
| formula | array | no | define array of formula which will apply in fields. target field define with `jsonpath` format. formula usually define in sharelibs |
|additionalApis| array | no | define additional api for current schema. use case such as `suspend`, `confirm`, `reschedule`. We can define which customized function here
| collectionName | string | no | default value same with documentName. Avoid define it, it reserve for special situation which we want multiple document store in same collection
|allStatus| array| no | not implement yet, determine current document allow what document status, different document status may act differently like readonly, next status, available api and etc
|foreignKeys| object | no | system property, it auto fill in base on current document connect to which collection. It ensure current document join to record which is valid. It used during data validation during create and update


## `x-foreignkey`
1. it define at field level, which allow frontend pick list of value easily.
2. backend only allow _id which is exists in destinated collection, invalid designate _id will cause create/update blocked. product only can store valid category's _id
3. it act like foreign key constraint, delete category which was connected to product will block

## format
all field define as string support additional property `format`. such as:
```json
{...
"email": {"type":"string","format":"email"}
..}
```

input which not compatible with `format` will be block by frontend and backend.

simpleapp support [ajv](https://ajv.js.org/guide/formats.html#string-formats`), plus a few as below:
| format name | example | description|
| --- | --- | --- | 
| documentno | SI-HQ-0001 |  generator will auto prepare special input element for field with this format. apply this format to field declared as `uniqueKey` only
| tel | 0129988772 |  7-15 character numbering only
| text| any word | no control, generator will auto prepare textarea for field with this format
| html| any word | no control, reserve, reserve to auto prepare html editor. yet to decide implement or not
    


# Compulsory schema properties 
to allow data traceable and isolated properly, there is compulsory property in highest level
```json
{
...
"_id": { "type": "string" },
"created": { "type": "string" },
"updated": { "type": "string" },
"createdBy": { "type": "string" },
"updatedBy": { "type": "string" },
"tenantId": { "type": "integer", "default": 1, "minimum": 1 },
"orgId": { "type": "integer", "default": 1, "minimum": 1 },
"branchId": { "type": "integer", "default": 1, "minimum": 1 },
...
}

```


# Data validation
There is 2 kind of data validation which is:
1. jsonschema rules
2. backend validation rules

## jsonschema data validation
we use [AJV](https://ajv.js.org/guide/getting-started.html) to jsonschema rules validation, it support `required`,`minimum`,`minLength`, `format`, `pattern` and etc. Refer jsonschema official website to know more rules


## backend validation rules
it require to write programming hook in backend, cover at backend development guide
