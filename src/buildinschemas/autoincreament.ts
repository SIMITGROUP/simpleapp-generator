import {SchemaType,RESTMethods,IsolationType} from '../type'

export const autoincreament:SchemaType = {
    type: "object",
    "x-simpleapp-config":{
      documentType:'autoinc',
      documentName:'autoincreament',
      isolationType:IsolationType.none,
      pageType:"crud",      
      additionalApis:[{
        action:"generateNextNo",
        entryPoint:"gennextno/:collection/:field",
        requiredRole:["User"],
        method:RESTMethods.get,         
        responseType:"Autoincreament",
        description:"Get next no and trigger increase nextno"
      }],
    },        
    required:["nextNo","collectionName","fieldName"],
    properties: {     
      _id:{type:'string'},
      created:{type:'string'},
      updated:{type:'string'},
      createdBy:{type:'string'},
      updatedBy:{type:'string'},
      tenantId: {type:'integer',default:1,minimum:0 },
      orgId: {type:'integer',default:1,minimum:0 },
      branchId: {type:'integer',default:1,minimum:0 },
      collectionName: {type: "string",minLength:1,},
      fieldName: {type: "string",minLength:1,},
      nextNo:{type: "integer","minimum":1}
    }
}

