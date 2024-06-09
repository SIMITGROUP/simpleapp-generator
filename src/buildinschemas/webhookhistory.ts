import {SchemaType,RESTMethods,IsolationType} from '../type'

export const webhookhistory:SchemaType = {
    type: "object",
    "x-simpleapp-config":{
      documentType:'webhookhistory',
      documentName:'webhookhistory',
      isolationType:IsolationType.tenant,      
      // uniqueKey:'documentName',
      // documentTitle:'documentName'
      // pageType:"crud",      
    },        
    required:["documentName","url"],
    properties: {     
      _id:{type:'string'},
      created:{type:'string'},
      updated:{type:'string'},
      createdBy:{type:'string'},
      updatedBy:{type:'string'},
      tenantId: {type:'integer',default:1,minimum:0 },
      orgId: {type:'integer',default:1,minimum:0 },
      branchId: {type:'integer',default:1,minimum:0 },
      webHookId:{type:"string",format:"uuid"},
      url: {type: "string", format:'uri'},      
      authentication: {type: "string"},
      headers: {
        type: "array",
        items:{
          type:"object",
          description:"http headers",
          properties:{
            name:{type:'string'},
            value:{type:'string'}
          }
        }
      },
      description: {type: "string",format:"text"},
      setting:{type:"string",format:"text"},
      result:{type:"string"}
    }
}

