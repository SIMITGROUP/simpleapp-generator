import {SchemaType,RESTMethods,IsolationType} from '../type'

export const documentevent:SchemaType ={
    "type": "object",
    "x-simpleapp-config": {
      "documentType": "docevent",
      "documentName": "documentevent",
      "isolationType": IsolationType.org
    },
    "properties": {
      "_id": { "type": "string" },
      "created": { "type": "string" },
      "updated": { "type": "string" },
      "createdBy": { "type": "string" },
      "updatedBy": { "type": "string" },
      "tenantId": { "type": "integer", "default": 1 },
      "orgId": { "type": "integer", "default": 1 },
      "branchId": { "type": "integer", "default": 1 },
      "documentName": {
        "type": "string",
        "minLength": 2
      },
      "documentId": {
        "type": "string",
        "minLength": 3,
        "format":"uuid"
      },
      "eventType": { 
          "type": "string", 
          "enum": ["create","update","delete","read","print","void","confirm","draft"], 
          "example": ["create","delete"] 
      },    
      "eventdata": {}
    }
  }
  