import {SchemaType,RESTMethods,IsolationType} from '../type'

export const keyvaluepair:SchemaType = {
    type: "object",
    "x-simpleapp-config":{
      documentType:'kvpair',
      documentName:'keyvaluepair',
      isolationType:IsolationType.org,
      uniqueKey:'key',
      pageType:"crud",      
    },        
    required:["key","value"],
    properties: {     
      _id:{type:'string'},
      created:{type:'string'},
      updated:{type:'string'},
      createdBy:{type:'string'},
      updatedBy:{type:'string'},
      tenantId: {type:'integer',default:1,minimum:0 },
      orgId: {type:'integer',default:1,minimum:0 },
      branchId: {type:'integer',default:1,minimum:0 },
      key: {type: "string",minLength:3,},
      value: {type: "string",minLength:10,},      
    }
}

