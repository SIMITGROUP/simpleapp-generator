import { Logger, ILogObj } from "tslog";
import { capitalizeFirstLetter } from './../libs';
import {mkdirSync, readdir,readFileSync,writeFileSync,existsSync,copyFileSync, readdirSync} from 'fs'
import BpmnModdle from 'bpmn-moddle';
import _ from 'lodash'
import * as constants from '../constant'
import {moddleOptions} from '../resource/camunda-moodle'
const log: Logger<ILogObj> = new Logger();
const { Eta } = require('eta');
export const  generateWorkflows = async (configs,genFor:string[]) =>{
    const invalidElementId = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    const moddle = new BpmnModdle({moddleOptions});
    const frontendFolder=configs.frontendFolder
    const backendFolder=configs.backendFolder
    const bpmnFolder = configs.bpmnFolder
    const filelist = readdirSync(bpmnFolder)
    
    console.log("bpmn filelist",filelist)
    const generateTemplatefolder = `${constants.templatedir}/workflow`        
    let workflows:string[] = []

    if(genFor.includes('nest')){
        mkdirSync(`${backendFolder}/src/simpleapp/workflows/bpmn`,{recursive:true})
        mkdirSync(`${backendFolder}/src/simpleapp/workflows/listeners`,{recursive:true})
    }
    if(genFor.includes('nuxt')){
        mkdirSync(`${frontendFolder}/simpleapp/workflows/bpmn`,{recursive:true})
        mkdirSync(`${frontendFolder}/simpleapp/workflows/forms`,{recursive:true})
        copyFormKeys(`${bpmnFolder}/../forms`,`${frontendFolder}/simpleapp/workflows/forms`)
    }

    for(let w = 0; w< filelist.length;w++){
      const bpmnfile = filelist[w]      
      if(!bpmnfile.includes('.bpmn')){
        continue
      }
      const bpmnfilepath = `${bpmnFolder}/${bpmnfile}`
      const processName = bpmnfile.split('.')[0]
      console.log("processNameprocessName",processName)
    const xmlstring = readFileSync(`${bpmnfilepath}`, 'utf-8');      

      const xmlobj = await moddle.fromXML(xmlstring);
      const flowElements = xmlobj.rootElement.rootElements[0].flowElements
      let elements:any[]=[]
      for(let i=0; i<flowElements.length;i++){
        const e = flowElements[i]
        if(['bpmn:UserTask','bpmn:ServiceTask'].includes(e.$type)){
          if(invalidElementId.test(e.id)){
                  log.error(`bpmn File : ${bpmnfile} -> Task(${e.name} defined invalid symbol in id:"${e.id}"`)
                  throw "quite"
            }
            /*
            read current process user task
            1. create type and apischemas for process task.such as updatescheduleacknowledgeteacher, with content same with inputsetting
              read input setting
              create file if not exists
                backend/src/simpleapp/workflows/types
                backend/src/simpleapp/workflows/apischemas
                

            2. create workflow controller with input body updatescheduleacknowledgeteacher
                import types and apischemas

            3. create formkey .vue at frontend
                enum = select, text = text, number =input number

            4. submit workflow shall define presentation properties also, possible form key
            5. onclick workflow prompt out dialog, complete dialog refresh task list


            =====================
            messaging service

            */










            let documentation :string= ''
            if(e.documentation && e.documentation[0] && e.documentation[0].text){
              documentation=e.documentation[0].text
            }
          const setting={
            type: e.$type,
            id: e.id,
            name: e.name,
            documentation: documentation.replace("\n","\n *")
          }
          elements.push(setting)   
        }
        
      }
      
      // delegates = _.uniq(delegates)
      const variables = {
        name:processName,
        processName: capitalizeFirstLetter(processName),        
        elements: elements
      }
    //   console.log("sample--------sample",xmlobj.rootElement.rootElements[0].name, )

      //copy workflow definition file to frontend and backend    
      if(genFor.includes('nest')){
        copyFileSync(`${bpmnfilepath}`,`${backendFolder}/src/simpleapp/workflows/bpmn/${bpmnfile}`)
        const targetlistener = `${backendFolder}/src/simpleapp/workflows/listeners/${processName}.listener.ts`

        const eta = new Eta({
            views: '/',
            functionHeader: getCodeGenHelper()
        });
        if(!existsSync(targetlistener) || readFileSync(targetlistener, 'utf-8').includes('--remove-this-line-to-prevent-override--')){
        //     //write something
            const templatepath = `${generateTemplatefolder}/next/listener.ts.eta`        
            const filecontent = eta.render(templatepath, variables)     
            writeFileSync(targetlistener,filecontent)
        }
      }
      if(genFor.includes('nuxt')){
        copyFileSync(`${bpmnfilepath}`,`${frontendFolder}/simpleapp/workflows/bpmn/${bpmnfile}`)  

        //create form key
      }
      
      
      
      


      workflows.push(processName)

      //modify workflowdeletegate to import all files
      
      
  
      //copy file backend
      //copy file frontend
  
  
      // const groupdata = JSON.parse(groupjsonstr);
      // const documentname = groupfile.split('.')[0]
      // const roles = prepareRoles(groupdata)
      // allroles[documentname]=roles
    }



    return workflows
  }
  const copyFormKeys=(fromtPath:string , toPath:string)=>{
    const files = readdirSync(fromtPath)
    for(let i=0; i< files.length;i++){
        const filename = files[i]
        if(filename=='.') continue

        copyFileSync(`${fromtPath}/${filename}`,`${toPath}/${filename}`)
    }
  }
  const getCodeGenHelper = () => 'const capitalizeFirstLetter = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);' +
  'const initType=(str)=>{return ["string","number","boolean","array","object"].includes(str) ? capitalizeFirstLetter(str) : str;};' +
  'const camelCaseToWords = (s) => {const result = s.replace(/([A-Z])/g, \' $1\');return result.charAt(0).toUpperCase() + result.slice(1);}'