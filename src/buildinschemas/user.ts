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
        additionalAutoCompleteFields:['uid'],
        additionalApis:[
            {"action":"getPermission",
            "entryPoint":":id/permission",
            "requiredRole":[],
            "method":RESTMethods.get,
            "responseType":"[UserPermission]",
            "description":"Get user permissoin"
            },
            {"action":"updatePermission",
            "entryPoint":":id/permission",
            "requiredRole":[],
            "method":RESTMethods.put,
            "schema":"[UserPermission]",
            "description":"set user permissoin"
            }
        ]
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
        uid: {
          type: "string", 
          oneOf:[{"format":"uuid"},{const:""}],
          description:"sso unique id, such as keycloak sub id, empty during invitation",
        },
        fullName: {type: "string",minLength:3},
        email: {type: "string",minLength:10,format: "email"},
        active: {type: "boolean",default:true},
        description: {type:"string"},
        lastActivity: {type: "string",description:"capture ISO8601 last api call"},
        completedTours: {
          type: "array",
          items: { "type": "string", "examples": ["mainpage"] }
        }
      }
}