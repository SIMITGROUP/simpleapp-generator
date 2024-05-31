import {SchemaType,RESTMethods,IsolationType} from '../type'

export const permission:SchemaType ={
    type: "object",
    "x-simpleapp-config":{
        documentType:'hist',
        documentName:'histories',        
        isolationType:IsolationType.tenant               
    },
    required:["document"],
    properties: {
        _id:{type:'string'},
        created:{type:'string'},
        updated:{type:'string'},
        createdBy:{type:'string'},
        updatedBy:{type:'string'},
        tenantId: {type:'integer',default:1,minimum:0},
        orgId: {type:'integer',default:1,minimum:0 },
        branchId: {type:'integer',default:1,minimum:0 },
        document:{type:'string',minLength:3},
        histories:{
            type:"array",
            items:{
                type:"object",
                properties:{
                    datetime:{type:"string",format:"datetime"},
                    uid:{type:"string",format:"uuid"},
                    action:{type:"string",minLength:3},
                }
            }
        }
      }
}