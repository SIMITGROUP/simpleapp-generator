import { existsSync, mkdirSync, writeFileSync } from 'fs';
import * as constants from '../constant'
import { SchemaPrintFormat } from "../type";
import { Logger, ILogObj } from "tslog";

const log: Logger<ILogObj> = new Logger();

const { Eta } = require('eta');
export const  generatePrintformat = async (configs,printFormats:SchemaPrintFormat[]) =>{
    
    console.log("Generate printformats ",printFormats);
    const generateTemplateName = `${constants.templatedir}/printformats/template.jrxml._eta`    
    log.info("Generate printformat ",generateTemplateName);
    
    const eta = new Eta({
        views: '/',
        
        functionHeader: getCodeGenHelper()
    });  
    if(configs.printFormatDir && printFormats){
        mkdirSync(configs.printFormatDir,{recursive:true})
        for(let i=0;i<printFormats.length; i++){
            const format = printFormats[i]
            const targetfile = `${configs.printFormatDir}/${format.formatId}.jrxml`;
            log.info("Process jrxml:",targetfile)
            if(!existsSync(targetfile)){
                const filecontent = eta.render(generateTemplateName, format)     
                writeFileSync(targetfile,filecontent);
            }
            
        }
    }
}


const getCodeGenHelper = () => 'const capitalizeFirstLetter = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);' +
'const initType=(str)=>{return ["string","number","boolean","array","object"].includes(str) ? capitalizeFirstLetter(str) : str;};' +
'const camelCaseToWords = (s) => {const result = s.replace(/([A-Z])/g, \' $1\');return result.charAt(0).toUpperCase() + result.slice(1);}'