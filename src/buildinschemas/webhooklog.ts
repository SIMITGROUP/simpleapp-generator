import { SchemaType, RESTMethods, IsolationType } from '../type';

export const webhooklog: SchemaType = {
  "type": "object",
  "x-simpleapp-config": {
    "documentType": "webhooklog",
    "documentName": "webhooklog",
    "isolationType": IsolationType.branch,
    "uniqueKey": "_id",    
    "resourceName": "webhooklog"
  },
  "required": [
    "title",
    "body",
    "msg"
  ],
  "properties": {
    "_id": {
      "type": "string"
    },
    "created": {
      "type": "string"
    },
    "updated": {
      "type": "string"
    },
    "createdBy": {
      "type": "string"
    },
    "updatedBy": {
      "type": "string"
    },
    "tenantId": {
      "type": "integer",
      "default": 1,
      "minimum": 0
    },
    "orgId": {
      "type": "integer",
      "default": 1,
      "minimum": 0
    },
    "branchId": {
      "type": "integer",
      "default": 1,
      "minimum": 0
    },
    "title": {
      "type": "string",
      "minLength": 3
    },  
    "resource": {
      "type": "string"     
    },
    "actionName": {
      "type": "string"      
    },
    "statusCode": {
      "type": "number"
    },
    "status": {
      "type": "string",
      "enum":["success","failed"]
    },
    "body": {
      "type": "string",
      "format":"text",
      "minLength":3
    },
    "msg":{
      "type":"string"
    }
 
  }
}