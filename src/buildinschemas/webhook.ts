import {SchemaType,RESTMethods,IsolationType} from '../type'

export const webhook:SchemaType = {
    type: "object",
    "x-simpleapp-config":{
      documentType:'webhook',
      documentName:'webhook',
      isolationType:IsolationType.tenant,      
      uniqueKey:'title',
      documentTitle:'title'     
    },        
    required:["title","url"],
    properties: {     
      _id:{type:'string'},
      created:{type:'string'},
      updated:{type:'string'},
      createdBy:{type:'string'},
      updatedBy:{type:'string'},
      tenantId: {type:'integer',default:1,minimum:0 },
      orgId: {type:'integer',default:1,minimum:0 },
      branchId: {type:'integer',default:1,minimum:0 },
      title:{type:"string",minLength:3,},
      url: {type: "string", format:'uri'},     
      serverSubscriptionId :{type:"string"},
      serverSubscriptionSecret :{type:"string"},
      requestMethod:{
        type: "string", 
        enum:['post','get','patch','put','delete','head'],
      },    
      authentication:{
        type:"string",
        enum:['none','basic'],
        description:"apikey authentication use none + headers props"
      },
      basicAuth:{
        type:"object",
        properties:{
          user:{type:"string"},
          password:{type:"string"}
        }
      },
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
      active: {type: "boolean", default:true},
      eventTypes:{
        type:"array",
        minItems:1,
        items:{
          type:"string"
        }}
    }
}

