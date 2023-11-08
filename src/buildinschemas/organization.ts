import {SchemaType,RESTMethods,IsolationType} from '../type'

export const organization:SchemaType ={
    type: "object",
    "x-simpleapp-config":{
        isolationType:IsolationType.tenant,
        documentType:'org',
        documentName:'organization',
        pageType:"crud", 
        uniqueKey:'orgCode',
        uniqueKeys:[ ['orgId'] ],
        documentTitle:'orgName',
        additionalAutoCompleteFields: ['orgId']
    },    
    required:["orgId","orgCode","orgName"],
    "properties": {
        _id:{type:'string'},
        created:{type:'string'},
        updated:{type:'string'},
        createdBy:{type:'string'},
        updatedBy:{type:'string'},
        tenantId: {type:'integer',default:1,minimum:1 },
        orgId: {type:'integer',default:1,minimum:1 },
        branchId: {type:'integer',default:1,minimum:0 },
        orgCode: {"type": "string",  "minLength":1,},
        orgName: {type: "string",},
        active: {type: "boolean","default":true,},
        description: {type: "string",format:"text",},
        timeZone: {"type": "string","examples": ["Asia/Kuala_Lumpur"]
        }    
    }
  }