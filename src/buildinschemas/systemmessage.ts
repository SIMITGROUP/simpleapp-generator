import {SchemaType,RESTMethods,IsolationType} from '../type'

export const systemmessage:SchemaType =
{
    "type": "object",
    "x-simpleapp-config": {
      "documentType": "sysmsg",
      "documentName": "systemmessage",
      "isolationType": IsolationType.tenant,
      "documentTitle": "messageTitle",
      additionalApis:[{
        "action":"readmsg",
        "entryPoint":":id/read",
        "requiredRole":["User"],
        "responseType":"Systemmessage",
        systemService:true, 
        "method":RESTMethods.get, 
        "description":"get message content and mark read"
      } ]
    },
    "properties": {
      "_id": { "type": "string","format":"uuid" },
      "created": { "type": "string" },
      "updated": { "type": "string" },
      "createdBy": { "type": "string" },
      "updatedBy": { "type": "string" },
      "tenantId": { "type": "integer", "default": 1 },
      "orgId": { "type": "integer", "default": 1 },
      "branchId": { "type": "integer", "default": 1 },      
      "uid": { "type": "string","format":"uuid" },
      "messageType":{"type":"string",minLength:3},
      "messageTitle": {
        "type": "string",
        "minLength": 3
      },
      "read": { "type": "boolean", "default": false},    
      "body": {
        "type": "string",
        "format": "html"
      }
    }
  }
  