import  { JSONSchema7,JSONSchema7Type,JSONSchema7Version, JSONSchema7TypeName,JSONSchema7Definition } from 'json-schema';
export type ChildModels = {
  [key: string]: { 
    isMainModel: boolean;
    type: string; 
    model: SchemaModel,
    codeField:string,
    nameField:string,
    moreAutoComplete?:string[],
    docStatusSettings?:DocumentStatus[],
    apiSettings?:DocumentApi[],
    // requireautocomplete: boolean
    isolationtype:string
    hasdocformat:boolean,
    foreignkeys:MyForeignKey
  };
};
export enum Fieldtypes {
  'string' = 'string',
  'object' = 'object',
  'array' = 'array',
  'boolean' = 'boolean',
  'integer' = 'integer',
  'number' = 'number',
}
export type FieldModel = {
  title?: string; //display name
  description?: string; //small text for explain at inputs
  default?: any;
  type: Fieldtypes;
  // oritype: string;
  format?: string;
  required?: boolean;
  example?: any;
//   examples?: any;
};

// export type SchemaCategoryModel = {
//   [key: string]: FieldModel;
// };

export type SchemaModel = {
  [key: string]: string | string[] | FieldModel | SchemaModel | SchemaModel[];
};

export type JsonSchemaProperties= {
  [key: string]: JSONSchema7Definition
  // JSONSchema7Definition ,JSONSchema7
}

//foreign key setting in current document
export type MyForeignKey = {
  [collectionname:string]:string[]
}


//centralize foreignkey catalogue for all document
export type TypeForeignKeyCatalogue = {
  [cataloguename:string]:TypeForeignKey
}
export type TypeForeignKey={
  [collection:string]:string[]
}
export type ModuleObject = {
  doctype:string
  docname:string
  pagetype:string
  api:DocumentApi[]
  schema:SimpleAppJSONSchema7
}
export type TypeGenerateDocumentVariable ={
name: string
doctype: string
models: ChildModels
autocompletecode:string
autocompletename:string
moreAutoComplete:string[]
schema: SchemaModel
apiSchemaName: string
typename: string
fullApiSchemaName: string
fullTypeName:string
jsonschema: SimpleAppJSONSchema7
bothEndCode: string
frontEndCode: string
backEndCode: string
controllerCode:string
apiSchemaCode:string
docStatusSettings:DocumentStatus[],
apiSettings:DocumentApi[],
isolationtype:string
hasdocformat:boolean,
foreignkeys: MyForeignKey

}

// export type DocSetting = {
//   docName:string,
//   docType:string,
//   colDocNo:string,
//   colDocLabel:string,
//   collectionName:string,
//   autoCompleteFields:string[],
//   docStatusSettings:DocumentStatus[],
//   apiSettings:DocumentApi[],
//   // requireautocomplete:boolean
//   isolationType:string
//   foreignKeys: MyForeignKey
// }

export type DocumentStatus = {
  status:string  //'CO', 'V', 'CL', 'D' and etc
  statusName:string
  readOnly:boolean
  actions: string[]    //api name ['confirm','revert','close','void' and etc]
}
export enum RESTMethods {'post'='post','get'='get', 'delete'='delete','put'='put', 'patch'='patch'}
export type DocumentApi = {
  action:string   //api action name
  entryPoint:string   //api entry point example:':id', ':id/confirm'
  queryPara?:string[]   //what query parameter wish to accept, example:  ['description','date']
  requiredRole?: string[]   // what special user role wish to allow for this api, example: ['SuperUser']
  method:RESTMethods  
  responseType ?:string
  schema ?:string
  description:string //description of api
}
export enum IsolationType {"none"="none" , "tenant"="tenant","org"="org", "branch"="branch"}
// export type ImportLibs = {"lib":string,"as":string}
export type Formula =  {
  jsonPath:string  //example: "$.subtotal","$.details[*]"
  formula:string  //example "jslib.getDocumentSubTotal(@F{$.details})"
} 

export type SchemaConfig = {
  isolationType: IsolationType  
  requiredRoles?:string[]
  pageType?: string  
  uniqueKey?:string  
  uniqueKeys?:string[][]
  documentTitle?:string 
  loseDataIsolation?:boolean
  generateDocumentNumber?:boolean
  docNoPattern?:string
  documentDate?:string
  allStatus?:DocumentStatus[]
  additionalApis?:DocumentApi[]      
  additionalAutoCompleteFields ?: string[]  
  search?:string[]
  // libs?:ImportLibs[]   // both process class and frontend client class will import same lib
  formulas?: Formula[]  
  documentType: string
  documentName: string
  collectionName?: string
  foreignKeys?:MyForeignKey
  printFormats?: SchemaPrintFormat[]
}

export type SchemaPrintFormat = {
  formatName: string
  formatId: string
  description?: string
}

export type SchemaFields = {
  _id: SimpleAppJSONSchema7 
  tenantId: SimpleAppJSONSchema7
  orgId: SimpleAppJSONSchema7
  branchId: SimpleAppJSONSchema7
  created: SimpleAppJSONSchema7 
  updated: SimpleAppJSONSchema7 
  createdBy: SimpleAppJSONSchema7 
  updatedBy: SimpleAppJSONSchema7 
  [key:string]:SimpleAppJSONSchema7 | SimpleAppJSONSchema7[] | undefined

}


export type SchemaType = {
  type:string
  definitions?:SimpleAppJSONSchema7
  required?:string[]

  "x-simpleapp-config":SchemaConfig
  properties:  SchemaFields
} 




// modified from jsonschemas
export type SimpleAppJSONSchema7Definition = SimpleAppJSONSchema7 | boolean;
export interface SimpleAppJSONSchema7 {
  
  'x-foreignkey' ?:string
    $id?: string | undefined;
    $ref?: string | undefined;
    $schema?: JSONSchema7Version | undefined;
    $comment?: string | undefined;

    /**
     * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-00#section-8.2.4
     * @see https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#appendix-A
     */
    $defs?: {
              [key: string]: JSONSchema7Definition;
    } | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.1
     */
    type?: JSONSchema7TypeName | JSONSchema7TypeName[] | undefined;
    enum?: JSONSchema7Type[] | undefined;
    const?: JSONSchema7Type | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.2
     */
    multipleOf?: number | undefined;
    maximum?: number | undefined;
    exclusiveMaximum?: number | undefined;
    minimum?: number | undefined;
    exclusiveMinimum?: number | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.3
     */
    maxLength?: number | undefined;
    minLength?: number | undefined;
    pattern?: string | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.4
     */
    items?: SimpleAppJSONSchema7Definition | SimpleAppJSONSchema7Definition[] | undefined;
    additionalItems?: JSONSchema7Definition | undefined;
    maxItems?: number | undefined;
    minItems?: number | undefined;
    uniqueItems?: boolean | undefined;
    contains?: SimpleAppJSONSchema7Definition | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.5
     */
    maxProperties?: number | undefined;
    minProperties?: number | undefined;
    required?: string[] | undefined;
    properties?: {
        [key: string]: SimpleAppJSONSchema7Definition;
    } | undefined;
    patternProperties?: {
        [key: string]: SimpleAppJSONSchema7Definition;
    } | undefined;
    additionalProperties?: SimpleAppJSONSchema7Definition | undefined;
    dependencies?: {
        [key: string]: SimpleAppJSONSchema7Definition | string[];
    } | undefined;
    propertyNames?: SimpleAppJSONSchema7Definition | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.6
     */
    if?: SimpleAppJSONSchema7Definition | undefined;
    then?: SimpleAppJSONSchema7Definition | undefined;
    else?: SimpleAppJSONSchema7Definition | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-6.7
     */
    allOf?: SimpleAppJSONSchema7Definition[] | undefined;
    anyOf?: SimpleAppJSONSchema7Definition[] | undefined;
    oneOf?: SimpleAppJSONSchema7Definition[] | undefined;
    not?: SimpleAppJSONSchema7Definition | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-7
     */
    format?: string | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-8
     */
    contentMediaType?: string | undefined;
    contentEncoding?: string | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-9
     */
    definitions?: {
        [key: string]: JSONSchema7Definition;
    } | undefined;

    /**
     * @see https://tools.ietf.org/html/draft-handrews-json-schema-validation-01#section-10
     */
    title?: string | undefined;
    description?: string | undefined;
    default?: JSONSchema7Type | undefined;
    readOnly?: boolean | undefined;
    writeOnly?: boolean | undefined;
    examples?: JSONSchema7Type | undefined;
}