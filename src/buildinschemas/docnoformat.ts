import {SchemaType,RESTMethods,IsolationType} from '../type'

export const docnoformat:SchemaType ={
        type: "object",
        "x-simpleapp-config":{
            isolationType:IsolationType.org,
            documentType:'docno',
            documentName:'docnoformat',
            pageType:"crud", 
            uniqueKey:'docNoFormatNo',
            documentTitle:'docNoFormatName',
            additionalAutoCompleteFields: ['default'],
            additionalApis:[{
                "action":"listDocFormats",
                "entryPoint":"/listdocformats/:doctype",
                "requiredRole":["User"],
                "responseType":"[Docnoformat]",
                systemService:true, 
                "method":RESTMethods.get, 
                "description":"get list of document format for 1 doctype"
              } ]
        },        
        properties: {
            _id:{type:'string'},
            created:{type:'string'},
            updated:{type:'string'},
            createdBy:{type:'string'},
            updatedBy:{type:'string'},
            tenantId: {type:'integer',default:1,minimum:1 },
            orgId: {type:'integer',default:1,minimum:1 },
            branchId: {type:'integer',default:1,minimum:1 },
            branch:{type:"object", "x-foreignkey":"branch",properties:{
              "_id":{"type":"string"},
              "label":{"type":"string"},
              "branchId":{type:"integer"},
            }},
            docNoFormatNo: {"type": "string","example": ["INV"]},
            docNoFormatName: { "type": "string", "example": ["Invoice Default Format"]},
            active: {type: "boolean","example": [true],default:true},
            default:{type: "boolean","example": [true],default:true},
            docNoType: {type: "string","example": ["SI","PI"]},
            docNoPattern: {type: "string","example": ["SI{YYMM}-<000>","PI-2023-<0000>"],"description":"{date} format as ISO8601 symbol"},          
            nextNumber:{type:"integer",default:1}         
        }
      }