import {SchemaType,RESTMethods,IsolationType} from '../type'

export const webhook:SchemaType = {
    type: "object",
    "x-simpleapp-config":{
      documentType:'webhook',
      documentName:'webhook',
      isolationType:IsolationType.tenant,      
      uniqueKey:'documentName',
      documentTitle:'documentName',
      pageType:"crud",      
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
      documentName:{type:"string",minLength:3,},
      url: {type: "string", format:'uri'},      
      secret: {type: "string"},
      description: {type: "string",format:"text"},
      active: {type: "boolean", default:true},
      setting:{type:"string",format:"text"}
    }
}

