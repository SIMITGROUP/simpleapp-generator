import * as constants from './constant'
import {readJsonSchemaBuilder} from './processors/jsonschemabuilder'
import {generateWorkflows} from './processors/bpmnbuilder'
import {allforeignkeys,allfields} from './storage'
import {TypeGenerateDocumentVariable,ChildModels,ModuleObject, SchemaType, SchemaConfig } from './type'
import { Logger, ILogObj } from "tslog";
const log: Logger<ILogObj> = new Logger();
const clc = require("cli-color");
const path = require('path');
import {mkdirSync, readdir,readFileSync,writeFileSync,existsSync,copyFileSync, readdirSync} from 'fs'
import _ from 'lodash'
import * as buildinschemas from './buildinschemas'
import { JSONSchema7 } from 'json-schema';
const { Eta } = require('eta');
const { capitalizeFirstLetter }= require('./libs');
// const X_DOCUMENT_TYPE='x-document-type'
// const X_DOCUMENT_NAME='x-document-name'
// const X_COLLECTION_NAME='x-collection-name'
const X_SIMPLEAPP_CONFIG='x-simpleapp-config'
// const extFb = '.xfb.json';
// const extHfb = '.xhfb.json';
// const extjsonschema = '.jsonschema.json';
// const extgroups = '.group.json';
let jsonschemas = {};
let configs:any = {}
const docs = [];
let frontendFolder=''
let backendFolder=''
let frontendpagefolder=''
const allroles:any={}
let langdata:any = {}
let allbpmn:any = {}
let activatemodules:ModuleObject[]=[]
let generateTypes:any = {}


export const run =  async (paraconfigs:any,genFor:string[],callback:Function) => {
  configs = paraconfigs
  frontendFolder=configs.frontendFolder
  backendFolder=configs.backendFolder
  
  const groupFolder = configs.groupFolder
  const defaultLangFile = configs.defaultLangFile ??  frontendFolder +'/../lang/default.json'
  if(genFor.includes('nest')){
    generateTypes['nest']=backendFolder
  }
  if(genFor.includes('nuxt')){
    generateTypes['nuxt']=frontendFolder
  }
  // console.log("genForgenForgenForgenFor",genFor,generateTypes)
  // 
  frontendpagefolder = `${frontendFolder}/pages/[xorg]`  
  const buildinschemanames = Object.keys(buildinschemas)
  for(let i=0; i<buildinschemanames.length;i++){    
    const schemaname = buildinschemanames[i]
    // const filenamearr=schemaname.split('.')
    // if(_.last(filenamearr)!='json')return
  // .forEach(async(schemaname)=>{    
    const cloneschema:JSONSchema7  = {...buildinschemas[schemaname]}
    // console.log("=====>>>>>",schemaname,cloneschema)
    await processSchema(schemaname,cloneschema)
  }
  const files = readdirSync(configs.jsonschemaFolder)
  for(let j = 0; j< files.length;j++){
    const file = files[j]
    const filenamearr=file.split('.')
    if(_.last(filenamearr)!='json')return
    // log.warn(file)
    const fullfilename = `${configs.jsonschemaFolder}/${file}`
    try{
      const jsoncontent = readFileSync(fullfilename, 'utf-8');      
      // log.debug(jsoncontent)
      const jsonschema = JSON.parse(jsoncontent)
      await processSchema(file.replace('.json',''),jsonschema)   
    }
    catch(e:any){
      log.error('\nFile : '+fullfilename+'\n');
      throw e;
    } 
  }
  

  //prepare group/roles
  const systemgroups = readdirSync(`${groupFolder}`)
  for(let g = 0; g< systemgroups.length;g++){
    const groupfile = systemgroups[g]
    const groupjsonstr = readFileSync(`${groupFolder}/${groupfile}`, 'utf-8');      
    const groupdata = JSON.parse(groupjsonstr);
    const documentname = groupfile.split('.')[0]
    const roles = prepareRoles(groupdata)
    allroles[documentname]=roles
  }
  
  if(existsSync(defaultLangFile)){
    const langjsonstr = readFileSync(defaultLangFile, 'utf-8');      
      langdata = JSON.parse(langjsonstr);     
  }

  
  if(configs.bpmnFolder){
    allbpmn = await generateWorkflows(configs,genFor)
  }
  
  generateSystemFiles(activatemodules,allbpmn)
  
  callback()
}


// const processSchema=async (file:string,defFolder:string)=>{
const processSchema= async (schemaname:string,jsondata:JSONSchema7)=>{
  
    const config:SchemaConfig = jsondata['x-simpleapp-config']
    let doctype = config.documentType
    let docname = config.documentName
        
      const  rendertype = 'basic';
      jsonschemas[docname] = jsondata;
      const copyofjsonschema = {...jsondata}
      const allmodels:ChildModels =  await readJsonSchemaBuilder(docname, jsondata);
      generateSchema(docname, doctype, rendertype, allmodels);        
      activatemodules.push({
        doctype:doctype,
        docname:capitalizeFirstLetter(docname),
        pagetype: config.pageType??'',
        api:config.additionalApis,
        schema : copyofjsonschema
      })
    // } else {
      // log.warn(`Load `+clc.yellow(file) + ` but it is not supported`)
    // }      
}
  

const isGenerateTest = (data:TypeGenerateDocumentVariable) => data.autocompletecode && data.autocompletename
  
/**
 * generate frontend nuxt and backend nest codes.
 * 
*/
const generateSchema = ( docname: string,
  doctype: string,
  rendertype: string,
  allmodels: ChildModels)=>{

    
    const simpleapptemplates = `${constants.templatedir}/basic`
    const finalizefolder = `${constants.templatedir}/nest`
    const modelname = _.upperFirst(docname)
    const currentmodel = allmodels[modelname]

    //console.log("---^^^^^------",modelname,docname, doctype, rendertype,currentmodel,allmodels)
    const variables:TypeGenerateDocumentVariable = {
      name: docname,
      doctype: doctype,
      models: allmodels,
      autocompletecode:currentmodel.codeField??'',
      autocompletename:currentmodel.nameField??'',
      moreAutoComplete:currentmodel.moreAutoComplete ??[],
      schema: currentmodel.model,
      apiSchemaName: capitalizeFirstLetter(docname), //capitalizeFirstLetter(doctype) + 'ApiSchema',
      typename: capitalizeFirstLetter(docname),
      fullApiSchemaName:
        doctype + 'apischema.' + capitalizeFirstLetter(docname),
      fullTypeName: doctype + 'type.' + capitalizeFirstLetter(docname),
      jsonschema: jsonschemas[docname],
      bothEndCode: '',
      frontEndCode: '',
      backEndCode: '',
      controllerCode:'',
      apiSchemaCode:'',
      docStatusSettings: currentmodel.docStatusSettings??[],
      apiSettings: currentmodel.apiSettings??[],
      isolationtype: currentmodel.isolationtype,      
      hasdocformat: currentmodel.hasdocformat,
      foreignkeys: currentmodel.foreignkeys ?? {}
    };

    const templatefolder = `${constants.templatedir}/${rendertype}`
    // log.info(`- Generate ${docname}, ${doctype}, ${templatefolder}`)
    const eta = new Eta({
      views: '/',
      functionHeader: getCodeGenHelper()
        
      // 'const capitalizeFirstLetter = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);' +
      //   'const initType=(str)=>{return ["string","number","boolean","array","object"].includes(str) ? capitalizeFirstLetter(str) : str;}'+
      //   'const camelCaseToWords = (s: string) =>{const result = s.replace(/([A-Z])/g, \' $1\');return result.charAt(0).toUpperCase() + result.slice(1);}',
      
    });
    
    const backendTargetFolder = `${backendFolder}/src/simpleapp/generate`
    const backendServiceFolder = `${backendFolder}/src/simpleapp/services`    
    
    
    Object.keys(generateTypes).forEach((foldertype)=>{
      

      //generate code for every schema      
      const generateTemplatefolder = `${constants.templatedir}/basic/${foldertype}`    
      const allfiles = readdirSync(generateTemplatefolder,{recursive:true})      
      for(let j=0; j<allfiles.length;j++){
        
        const filename:string = String(allfiles[j])      
        const templatepath = `${generateTemplatefolder}/${filename}`        
        
        if(_.last(filename.split('.'))!='eta'){        
          // log.warn("skip file: ",filename)
          continue;
        }
        if(foldertype=='nest'){
          const arrfilename:string[] = filename.split('.')
          const filecategory = arrfilename[0]
          const filetype = arrfilename[1]        
          const autogeneratetypes = ['apischema','controller','jsonschema','model','processor','type','default']
          if(autogeneratetypes.includes(filecategory)){
            //multiple files in folder, append s at folder name
            const storein = `${backendTargetFolder}/${filecategory}s`  
            const targetfile = `${storein}/${doctype}.${filecategory}.${filetype}`
            if(!existsSync(storein)){
              mkdirSync(storein,{recursive:true})
            }                
            const filecontent = eta.render(templatepath, variables)     
            log.info("process: ",targetfile)
            writeFileSync(targetfile,filecontent);
          }else if(filecategory=='service'){ //service file won't override if exists

            const targetfile = `${backendServiceFolder}/${doctype}.${filecategory}.${filetype}`
            if(!existsSync(backendServiceFolder)){
              mkdirSync(backendServiceFolder,{recursive:true})
            }         

            if(!existsSync(targetfile) || readFileSync(targetfile, 'utf-8').includes('--remove-this-line-to-prevent-override--')){
              log.info("Write ",targetfile)
              const filecontent = eta.render(templatepath, variables)     
              writeFileSync(targetfile,filecontent);            
            }
            else{
              log.info("skip ",targetfile)
            }
            
          }else if(filecategory=='test' && isGenerateTest(variables)){            

            const targetfolder = `${backendFolder}/test/documents/${docname}`
            const targetfile = `${targetfolder}/${docname}.e2e-spec.ts`
            log.warn("test file: ",targetfile)
            // `${backendServiceFolder}/${doctype}.${filecategory}.${filetype}`
            if(!existsSync(targetfolder)){
              mkdirSync(targetfolder,{recursive:true})
            }         
            if(!existsSync(targetfile)){
              log.info("process: ",targetfile)
              const filecontent = eta.render(templatepath, variables)     
              writeFileSync(targetfile,filecontent);
              //create stub files
              mkdirSync(`${targetfolder}/stub`,{recursive:true})
              writeFileSync(`${targetfolder}/stub/id1.create.ts`,'export default () => ({_id:"00000000-0000-0000-0000-000000000001",})');
              writeFileSync(`${targetfolder}/stub/id1.update.ts`,'export default () => ({_id:"00000000-0000-0000-0000-000000000001",})');
              writeFileSync(`${targetfolder}/stub/id2.create.ts`,'export default () => ({_id:"00000000-0000-0000-0000-000000000002",})');
              
            }
          }
               
        }else if(foldertype=='nuxt'){
          const capname = capitalizeFirstLetter(docname)
          const validateWritePage = (folder:string,isexists:boolean)=>{
            if(!jsonschemas[docname][X_SIMPLEAPP_CONFIG]['pageType'] ){
              return false
            }else if(!isexists){
              return true
            }else if( existsSync(`${folder}/delete-me.txt`)){
              return true
            }else{
              return false
            }
          }
          const mapfiles = {
            'pages.form.vue.eta': { 
              to:`pages/[xorg]/${docname}`, 
              as:'form.vue',
              validate: validateWritePage
            },
            'pages.[id].vue.eta': { 
              to:`pages/[xorg]/${docname}`, 
              as:'[id].vue',
              validate: validateWritePage
            },
            'pages.new.vue.eta': { 
              to:`pages/[xorg]/${docname}`, 
              as:'new.vue',
              validate: validateWritePage
            },
            'pages.viewer.vue.eta': { 
              to:`pages/[xorg]/${docname}`, 
              as:'viewer.vue',
              validate: validateWritePage
            },
            'pages.landing.vue.eta': { 
              to:`pages/[xorg]/${docname}`, 
              as:`../${docname}.vue`,
              validate: validateWritePage
            },            
            'simpleapp.doc.ts.eta': { 
              to:`simpleapp/docs`, 
              as:`${capname}Doc.ts`,
              validate: (folder:string,isexists:boolean)=>!isexists
            },
            'default.ts.eta': { 
              to:`simpleapp/generate/defaults`, 
              as:`${capname}.default.ts`,
              validate: (folder:string,isexists:boolean)=>{
                return true
              }
            },
            
            'simpleapp.generate.client.ts.eta': { 
              to:`simpleapp/generate/clients`, 
              as:`${capname}Client.ts`, 
              validate: (folder:string,isexists:boolean)=>{
                return true
              }
            },
          }
            
            const target = mapfiles[filename]            
            const targetfolder = `${generateTypes[foldertype]}/${target.to}`
            const targetfile = `${targetfolder}/${target.as}`

            if(jsonschemas[docname][X_SIMPLEAPP_CONFIG]['pageType'] && !existsSync(targetfolder)){
              mkdirSync(targetfolder,{recursive:true})
              writeFileSync(`${targetfolder}/delete-me.txt`,"delete this file for keep modified page");
            }


            const isexists = existsSync(targetfile)
            const iswrite:boolean = target.validate(targetfolder,isexists)
            log.info("process: ",targetfile)
            
            if(iswrite){
              const filecontent = eta.render(templatepath, variables)     
              writeFileSync(targetfile,filecontent);
            }
            
            
            

        }
      }
      

    })
    
   

}


const generateSystemFiles=(modules:ModuleObject[],allbpmn)=>{  
  const renderProperties = {
    configs:configs,
    modules:modules,
    allroles:allroles,
    foreignkeys:allforeignkeys,
    allfields:allfields,
    allbpmn: allbpmn,
    lang:langdata
  }
  
  
  Object.getOwnPropertyNames(generateTypes).forEach((foldertype)=>{
      const frameworkpath = generateTypes[foldertype]
      // log.info("Generate ",foldertype)
      const frameworkfolder = `${constants.templatedir}/${foldertype}`
      const frameworkfiles = readdirSync(frameworkfolder,{recursive:true})
      const eta = new Eta({views:frameworkfolder,
                functionHeader: getCodeGenHelper()});
      
      //generate code for framework
      for(let index=0; index<frameworkfiles.length; index++){
        const longfilename:string = String(frameworkfiles[index])
        const patharr = longfilename.split('/')
        const filename = _.last(patharr)
        const arrfilename:string[] = filename.split('.')
        // log.info("check longfilename:::",longfilename,"become====",arrfilename)
        //only process .eta
        if(['eta','_eta','-eta'].includes(_.last(arrfilename))){                    
          const relativepath = longfilename.includes('/') ? longfilename.replace(`/${filename}`,'') : ''
          const foldername = `${frameworkpath}/${relativepath}`
          const shortfilename = filename.replace('.eta','').replace('._eta','')
          const targetfilename = `${foldername}/${shortfilename}`
          let forceoverride=true
          if(filename.includes('._eta')){
            forceoverride=false
          }
          // log.warn("Process=== ",targetfilename)
          if(existsSync(targetfilename) &&  forceoverride == false){
            log.info("file exists, skip: ",targetfilename)
            continue;
          }

          
          if(!existsSync(foldername)){
            mkdirSync(foldername,{recursive:true})
          }
          // const templatename = `${frameworkfolder}/${longfilename}`.replace(".eta","").replace('._eta','')
          log.info("Write template:",targetfilename)
          const txt = eta.render(longfilename, renderProperties)
          writeFileSync(targetfilename,txt)
          
        }else{
          // log.warn("skip: ",longfilename)
        }
        
        }
      })

}

const prepareRoles =(groupsettings) => {
  let roles = []
  const docnames = Object.getOwnPropertyNames(groupsettings)
  for(let i = 0; i< docnames.length; i++){
    let docname = docnames[i]
    let docpermissions:string[] = groupsettings[docname]
    for(let j=0;j<docpermissions.length;j++){
      const perm = docpermissions[j]
      const typename = _.upperFirst(docname)
      roles.push(`${typename}_${perm}`)
    }
  }
  return roles
}


const getCodeGenHelper = () => 'const capitalizeFirstLetter = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);' +
'const initType=(str)=>{return ["string","number","boolean","array","object"].includes(str) ? capitalizeFirstLetter(str) : str;};' +
'const camelCaseToWords = (s) => {const result = s.replace(/([A-Z])/g, \' $1\');return result.charAt(0).toUpperCase() + result.slice(1);}'