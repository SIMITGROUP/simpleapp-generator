// import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { JSONSchema7, JSONSchema7Definition,JSONSchema7Array,JSONSchema7TypeName, JSONSchema7Object } from 'json-schema';
import * as js7 from 'json-schema';
import _ from 'lodash'
import { capitalizeFirstLetter } from '../libs';
import {SchemaType,SchemaConfig,JsonSchemaProperties} from "../type"
// import * as schematemplates from '../schematype'
import { Logger, ILogObj } from "tslog";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import {allforeignkeys,allfields} from '../storage'
// import { ConflictException } from '@nestjs/common';
import {
  FieldModel,
  Fieldtypes,
  ChildModels,
  SchemaModel,
  TypeForeignKey,
  TypeForeignKeyCatalogue,  
} from '../type';
const log: Logger<ILogObj> = new Logger();
const configname =  "x-simpleapp-config"
const FOREIGNKEY_PROPERTY = 'x-foreignkey'
export const readJsonSchemaBuilder = async (docname: string,orijsondata:JSONSchema7,
) => {
  // log.info(`----------------------------------------------------`)
  // log.error(`Processing schema ${docname}`)
  //validation
  if(!orijsondata[configname]) throw new Error(`Undefine ${configname}`)
  if(!orijsondata[configname]) throw new Error(`Undefine ${configname}`)
  // // Object.assign(targettemplate,schematemplates[currentschematype])
  // console.log("just want process schemaprops ********>>",targettemplate)
  
  let schemaconfigs:SchemaConfig = orijsondata[configname]
  const doctype=schemaconfigs.documentType

  if(!schemaconfigs.collectionName){
    schemaconfigs.documentName
  }

  if(!schemaconfigs.foreignKeys){
    schemaconfigs.foreignKeys={}
  }

  if(schemaconfigs.generateDocumentNumber){
    const tmp = {
        type: "object",       
        "x-foreignkey":"docnoformat", 
        properties: {_id: {type: "string"},label: {type: "string"}}
    }
    orijsondata.properties["docNoFormat"] = tmp as JSONSchema7Definition
  }

  if(schemaconfigs.allStatus && schemaconfigs.allStatus.length>0){
    orijsondata.properties["readOnly"] = {type:'boolean', default:false}
    orijsondata.properties["documentStatus"] = {type:'string', default:'D'}
  }
  //enforce format uuid for _id
  orijsondata.properties['_id']['format']='uuid' 


  // let newschema:JSONSchema7 & SchemaType = {
  //   type: 'object',
  //   "x-simpleapp-config":schemaconfigs,
  //   properties:schemaprops,
  //   definitions:schemadefinitions
    
  // }
  // log.warn("------------------")
  // log.warn(newschema)
  // dereference in case implement remote schema
  // console.log("before dereference jsondata.properties =======---",newschema)
  const  tmpjsondata = await $RefParser.dereference(orijsondata).then((tmp)=>{    
    return tmp
  })
  // console.log("First level jsondata.properties =======++",tmpjsondata)
  // log.info(tmpjsondata,`==========================${schemaconfigs.documentType}==========================`)
  const  jsondata:JSONSchema7 = {...tmpjsondata} as JSONSchema7
  let allmodels: ChildModels = {};
  
  await genSchema(
    schemaconfigs.documentName,
    'object',
    jsondata.properties,
    jsondata['required'] ?? [],
    '$',
    schemaconfigs,
    allmodels
  );
  return allmodels
};


/**
 * process recursively every property in schema
 * @param SchemaConfig 
 * @param parentName 
 * @param schematype 
 * @param jsondata 
 * @param requiredlist 
 * @param parentpath 
 * @param schemaconfigs
 * @returns 
 */
const genSchema = async (
    docname: string,
    schematype: string,
    jsondata: JsonSchemaProperties,
    requiredlist: string[] | undefined,parentpath:string,
    schemaconfigs:SchemaConfig,
    allmodels: ChildModels
  ): Promise<SchemaModel> => {
    
    if(!allfields.includes(docname)){
      allfields.push(docname)
    }
    const newmodel: SchemaModel = {};
    // console.log("jsondata--->>>>",docname,jsondata)
    Object.keys(jsondata).forEach(async (key) => {      
      if(!allfields.includes(key)){
        allfields.push(key)
      }
      //below is Object.assign use for force datatype compatibility
      const obj:JSONSchema7={}
      Object.assign(obj,jsondata[key]);
      const objectitem:JSONSchema7= {} as JSONSchema7    
      Object.assign(objectitem,obj.items);

      let isrequired = false
      if(requiredlist &&  requiredlist.includes(key)){
        isrequired=true
      }
      const newName: string = _.upperFirst(docname) + _.upperFirst(key);


    // if(obj[X_AUTOCOMPLETE_FIELD]){
    //   docSetting.autocompleteFields.push(key)
    // }
    

    //  if(obj.format && obj.format==FORMAT_TEL){
    //   obj.pattern=obj.pattern ?? '/^\d{7,15}$/gm'
    //  }
    //  if (obj.type == 'object' && obj.items  ){
    //   console.log("Refer to another object",docname,': ',key,obj,obj.items)
      
      // obj,obj.items
      //foreignkeys
      //FOREIGNKEY_PROPERTY
      // newmodel[key] = 'Object';
      // }
      // else 
      if(obj[FOREIGNKEY_PROPERTY]){
        const masterdatacollection = obj[FOREIGNKEY_PROPERTY]
        const clientdatacollection = docname.toLowerCase()
        const foreignkeyidentity= (obj.type=='object')? `${key}._id` : key
        const foreignkeypath = (obj.type=='object') ?`${parentpath}.${key}._id`:`${parentpath}.${key}`
        
        //current document foreignkeys
        if(schemaconfigs.foreignKeys[masterdatacollection]){
          schemaconfigs.foreignKeys[masterdatacollection].push(foreignkeypath)
        }else{
          schemaconfigs.foreignKeys[masterdatacollection]=[foreignkeypath]
        }

        //centralize foreignkeys catalogue
        if(!allforeignkeys[masterdatacollection]){
          let tmp:TypeForeignKey = {} as TypeForeignKey
          tmp[clientdatacollection]=[foreignkeyidentity]
          allforeignkeys[masterdatacollection] = tmp
        }
        else if(!allforeignkeys[masterdatacollection][clientdatacollection]){
          allforeignkeys[masterdatacollection][clientdatacollection]=[foreignkeyidentity]
        }else{
          allforeignkeys[masterdatacollection][clientdatacollection].push(foreignkeyidentity)
        }
                
      }

      if (obj.type == 'object') {
        // console.log("line  175",key,obj.type,obj.properties)      
        await genSchema(newName, obj.type, obj.properties, obj.required,`${parentpath}.${key}`,schemaconfigs,allmodels);
        newmodel[key] = newName;
      } else if (obj.type == 'array' && obj.items && objectitem?.type == 'object') {
        const childprops = objectitem?.properties
        if(!childprops['created']){
          childprops['created']={type:'string',description:'iso8601 dataempty mean new record'}
        }
        if(!childprops['updated']){
          childprops['updated']={type:'string',description:'iso8601 or empty'}
        }
        if(!childprops['createdBy']){
          childprops['createdBy']={type:'string'}
        }
        if(!childprops['updatedBy']){
          childprops['updatedBy']={type:'string'}
        }
        if(!childprops['_id']){
          childprops['_id']={type:'string'}
        }
        // console.log("line  195")      
        await genSchema(newName, obj.type, objectitem?.properties, obj.items['required'],`${parentpath}.${key}[*]`,schemaconfigs,allmodels);
        newmodel[key] = [newName];
      } else if (obj.type == 'array' && objectitem?.type != 'object') {
        //array need submodel
        // genSchema(newName, obj.type, obj.items.properties);
        const objecttype:string = objectitem.type?.toString() ?? 'string'
        newmodel[key] = [objecttype];
      } else {
        newmodel[key] = getField(key, obj, isrequired);
        // console.log(key,'--------newmodel',obj, newmodel[key]);
      }
    })
    // log.warn(newmodel,docname)
    
    const modelname= _.upperFirst(docname)
    // log.warn("$$$$$$$$$$>>>",modelname,)
    // log.warn(newmodel,modelname)
    allmodels[modelname] = { 
      type: schematype, 
      model: newmodel,
      codeField: schemaconfigs.uniqueKey??'' ,
      nameField: schemaconfigs.documentTitle ?? '',
      moreAutoComplete:schemaconfigs.additionalAutoCompleteFields ?? [],
      docStatusSettings:schemaconfigs.allStatus ?? [],
      apiSettings:schemaconfigs.additionalApis ?? [],
      // requireautocomplete:docSetting.requireautocomplete,
      isolationtype:schemaconfigs.isolationType ,
      hasdocformat:schemaconfigs.generateDocumentNumber ?? false,
      foreignkeys: schemaconfigs.foreignKeys ?? {}
    };
    // console.warn("-------------apiSettings-----",docname,"::::",docSetting.apiSettings)
    return newmodel;
};



const getField = (
  fieldname: string,
  obj: JSONSchema7,
  isrequired: boolean | undefined,
): FieldModel => {
  if(!allfields.includes(fieldname)){
    allfields.push(fieldname)
  }
  
  let datatype: Fieldtypes = obj.type as Fieldtypes
  // console.log(datatype)
  //Fieldtypes.string;
  let format = obj.format;
  if (obj.type == 'integer') {
    datatype = Fieldtypes.number;
    format = 'integer';
  }

  const f: FieldModel = {
    type: datatype,
    // oritype: obj.type,
    required: isrequired,
  };

  // if (obj.title) 
  f.title = obj.title;
  if (obj.description) f.description = obj.description;
  if (obj.format) f.format = obj.format;
  if (obj.examples) f.examples = obj.examples;
  if (obj.default) {
    f.default = obj.default;
  } else {
    if (f.type == 'string') f.default = '';
    else if (f.type == 'number' || f.type == 'integer') f.default = 0;
    else if (f.type == 'boolean') f.default = false;
    else if (f.type == 'array') f.default = [];
    else f.default = {};
  }
  return f;
};
