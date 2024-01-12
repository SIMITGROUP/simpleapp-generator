import {SchemaType,RESTMethods,IsolationType} from '../type'

export const user:SchemaType ={
    type: "object",
    "x-simpleapp-config":{
        documentType:'user',
        documentName:'user',        
        pageType:'crud',
        loseDataIsolation:true,
        isolationType:IsolationType.tenant,
        uniqueKey:'email',        
        documentTitle:'fullname',
        requiredRoles:["SuperUser"],    
        additionalAutoCompleteFields:['uid']      
    },
    properties: {
        _id:{type:'string'},
        created:{type:'string'},
        updated:{type:'string'},
        createdBy:{type:'string'},
        updatedBy:{type:'string'},
        tenantId: {type:'integer',default:1,minimum:0 },
        orgId: {type:'integer',default:1,minimum:0 },
        branchId: {type:'integer',default:1,minimum:0 },
        uid: {type: "string",},
        fullName: {type: "string",minLength:3},
        email: {type: "string",minLength:10,format: "email"},
        active: {type: "boolean",default:true},
        description: {type:"string"},
        lastActivity: {type: "string",description:"capture ISO8601 last api call"}
      }
}