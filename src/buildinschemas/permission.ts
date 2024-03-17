import {SchemaType,RESTMethods,IsolationType} from '../type'

export const permission:SchemaType ={
    type: "object",
    "x-simpleapp-config":{
        documentType:'perm',
        documentName:'permission',        
        isolationType:IsolationType.org               
    },
    properties: {
        _id:{type:'string'},
        created:{type:'string'},
        updated:{type:'string'},
        createdBy:{type:'string'},
        updatedBy:{type:'string'},
        tenantId: {type:'integer',default:1,minimum:0},
        orgId: {type:'integer',default:1,minimum:0 },
        branchId: {type:'integer',default:1,minimum:0 },
        groups: {
          type: "array",
          minItems:1,
          items:{type: "string"}
        },
        uid: {type: "string",description:"sso unique identity, which is keycloak sub"},
        userId : {type:"string","x-foreignkey":"user", format:"uuid",description:"primary key from user" }
      }
}