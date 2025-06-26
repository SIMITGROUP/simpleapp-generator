import { SchemaType, RESTMethods, IsolationType } from '../type';

export const webhook: SchemaType = {
  "type": "object",
  "x-simpleapp-config": {
    "documentType": "webhook",
    "documentName": "webhook",
    "isolationType":IsolationType.branch,
    "uniqueKey": "title",
    "documentTitle": "title",
    "resourceName": "webhook"
  },
  "required": [
    "title",
    "url"
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
    "url": {
      "type": "string",
      "format": "uri"
    },

    "requestMethod": {
      "type": "string",
      "enum": [
        "post",
        "get",
        "patch",
        "put",
        "delete",
        "head"
      ]
    },
    "authentication": {
      "type": "string",
      "enum": [
        "none",
        "basic"
      ],
      "description": "apikey authentication use none + headers props"
    },
    "basicAuth": {
      "type": "object",
      "properties": {
        "user": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      }
    },
    "headers": {
      "type": "array",
      "items": {
        "type": "object",
        "description": "http headers",
        "properties": {
          "name": {
            "type": "string"
          },
          "value": {
            "type": "string"
          }
        }
      }
    },
    "description": {
      "type": "string",
      "format": "text"
    },
    "body": {
      "type": "string",
      "format": "text",
      "default":"*",
      "description": "POST,PUT body template"
    },
    "active": {
      "type": "boolean",
      "default": true
    },
    "resourceName": {
      "type": "string",
      "minLength": 2
    },
    "eventType": {
      "type": "string",
      "minLength": 5
    },
     "jobType":{
      "type": "string",
      "enum":["realtime","roll-back-when-failed"],
      "description":"temporary support realtime and roll-back-when-failed, 2nd way way throw error and roll back data if webhook failed.)"
    },
    "retryAttemps":{
      "type":"integer",
      "default":0,
      "minimum":0,
      "maximum":5,
      "description":"retries how many time when webhook failed"
    }
  }
}
