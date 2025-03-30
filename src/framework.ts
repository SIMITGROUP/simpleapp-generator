import fs, { copyFileSync, mkdirSync,existsSync, writeFileSync } from 'fs'
import {spawn,exec} from "child_process"
import _ from 'lodash'
import { Logger, ILogObj } from "tslog";
import * as constants from './constant'
import  {Eta}  from 'eta';
import path from 'path';
const log: Logger<ILogObj> = new Logger();

let config = {
    "jsonschemaFolder":"./jsonschemas",
    "bpmnFolder":"",//./workflows/bpmn",
    // "backendFolder":"./backend", 
    // "frontendFolder":"./frontend",
    "groupFolder":"./groups",
    "langFolder":"./lang",
    "backendPort":"8000",
    "mongoConnectStr":'mongodb://127.0.0.1:27017/simpleapp',
    "mongoDbName":'simpleapp',
    "splitMobilePage":false,
    "frontendPort":"8080",
    "printFormatDir":"./printformats",
    "additionalNestModules":["cloudapi","printapi"],
    "oauthSetting":{
        "oauthBaseUrl":"https://keycloak-server-url/",
        "oauthRealm":"realm-name",
        "oauthRealmUrl":"https://keycloak-server-url/realms/realm-name",
        "oauthClient":"client-id",
        "oauthClientSecret":"client-secret-value",
        "oauthAuthSecretKey":"my-secret",        
        "adminRole":"realmadmin"
    },
    
}

export const setConfiguration=(paraconfig)=>{
    config=paraconfig
}
//create empty nest project
// export const runCreateNest= (callback:Function) =>{
//     const backendFolder=config.backendFolder
//     if(!fs.existsSync(backendFolder)){
//         const child = spawn('npm',['install','-g','pnpm', '@nestjs/cli', '@openapitools/openapi-generator-cli', 'nuxi'],
//                         {  stdio: 'inherit',})
//         child.on('close',(exitCode)=>{            
//             const child2 = spawn('nest',['new', '-p', 'pnpm', backendFolder],{  stdio: "inherit"})
//             child2.on('close',(exitCode)=>{                
//                 callback()
//             })
//         })        
//     }else{
//         callback()
//     }
// }
//create empty nuxt project
// export const runCreateNuxt = (callback:Function) =>{
//     const frontendFolder=config.frontendFolder
//     if(!fs.existsSync(frontendFolder)){
//         const child3 = spawn('npx',['nuxi@latest','init',frontendFolder],{  stdio: 'inherit',})        
//         child3.on('close',(exitCode)=>{ 
//             const nuxtconfigfile = `${frontendFolder}/nuxt.config.ts`
//             const nuxtconfigtxt = "--remove-this-line-to-prevent-override--\n" + fs.readFileSync(nuxtconfigfile)
//             fs.writeFileSync(nuxtconfigfile, nuxtconfigtxt);
        
//             callback()
//         })
//     }else{
//         callback()
//     }
// }

export const prepareNest = (callback:Function)=>{
    const tsconfigpath = process.cwd()+'/backend/tsconfig.json'
    const tsconfig = require(tsconfigpath)
    tsconfig.compilerOptions.strictNullChecks=false
    tsconfig.compilerOptions.esModuleInterop=true
    tsconfig.compilerOptions.resolveJsonModule=true
    tsconfig.compilerOptions.esModuleInterop = true,
    tsconfig.compilerOptions.resolveJsonModule = true
    fs.writeFileSync(tsconfigpath, JSON.stringify(tsconfig));
    callback()
    // const targetfolder =config.backendFolder
    // log.info(`creating backend project ${targetfolder}`)
    // if(!fs.existsSync(`${targetfolder}/.env`)){
        
    //         exec(`cd ${targetfolder};pnpm install --save @nestjs/graphql mustache country-to-currency  graphql-type-json countries-and-timezones @nestjs/apollo @apollo/server graphql @nestjs/event-emitter dayjs bpmn-server@2.1.7 @casl/ability jsonpath yaml lodash @types/lodash nest-keycloak-connect keycloak-connect bpmn-client @nestjs/serve-static jsonwebtoken axios @darkwolf/base64url json-schema @wearenova/mongoose-tenant @nestjs/swagger @nestjs/mongoose mongoose  ajv ajv-formats ajv-errors @nestjs/config`,async (error, stdout, stderr)=>{
    //         if(!error){
                // const tsconfigpath = process.cwd()+'/backend/tsconfig.json'
                // const tsconfig = require(tsconfigpath)
                // tsconfig.compilerOptions.esModuleInterop=true
                // tsconfig.compilerOptions.resolveJsonModule=true
                // fs.writeFileSync(tsconfigpath, JSON.stringify(tsconfig));

    //             log.info("nest project completed")                
    //             callback()
            
    //         } else{
    //         log.error(stderr)
    //         throw error
    //         }
    //     })
    // }else{
    //     log.info(`${targetfolder}/.env exists, skip regenerate environment`)
    //     callback()
    // }
}

export const prepareProject =  async (callback)=>{
    const dir = process.cwd() +'/'
    log.info("prepareProject")
    const generateTemplatefolder = `${constants.templatedir}/project/`
    const eta = new Eta({views:generateTemplatefolder});
    const vars = {
        config:config
    }
    fs.readdirSync(`${constants.templatedir}/project`,{recursive:true}).forEach( (fullfilename)=>{        
        const templatepath = `${generateTemplatefolder}/${fullfilename}`        
        const filename:string = _.last(fullfilename.split('/'))
        const targetfolder = dir+String(fullfilename).replace(filename,'')
        console.log("Filename",targetfolder, filename)
        if(targetfolder && !existsSync(targetfolder)){
            console.log("Write directory",targetfolder)
            mkdirSync(targetfolder,{recursive:true})
        }
        if(filename.includes('.eta')){    
            const tofilename =targetfolder + filename.replace('.eta','')        
            log.info(tofilename,"Render file")
            const txt = eta.render(fullfilename,vars)
            // log.info(fullfilename+"====>>"+tofilename)
            // console.log(txt)
            writeFileSync(tofilename,txt)            
        }else if(filename.includes('._eta')){    
            const tofilename =targetfolder + filename.replace('._eta','')        
            log.info(tofilename,"Render file")
            const txt = eta.render(fullfilename,vars)
            if(!existsSync(tofilename)){
                writeFileSync(tofilename,txt)            
            }
            
        }else if(filename.includes('.md')){
            const tofilename =dir + filename.replace('.eta','')        
            log.info(tofilename,"Copy")            
            copyFileSync(templatepath ,tofilename)            
        }
    })

    await exec(`npx prettier --write . `,()=>{
        callback()
    })
    
    

    // fs.mkdirSync(`${dir}/groups`,{recursive:true})
    // fs.mkdirSync(`${dir}/schemas`,{recursive:true})
    // fs.mkdirSync(`${dir}/shares`,{recursive:true})    

}
//prepare nuxt project for simpleapp generator
export const prepareNuxt = (callback:Function)=>{
    const targetfolder = './frontend'
    if(!fs.existsSync(`${targetfolder}/.env`)){
       
            const copyFolderRecursiveSync = (source: string, target: string) => {
                // Check if folder needs to be created or integrated
                const targetFolder = path.join(target, path.basename(source));
                if (!fs.existsSync(targetFolder)) {
                    fs.mkdirSync(targetFolder, { recursive: true });
                }

                // Copy
                if (fs.lstatSync(source).isDirectory()) {
                    const files = fs.readdirSync(source);
                    files.forEach((file) => {
                        const curSource = path.join(source, file);
                        if (fs.lstatSync(curSource).isDirectory()) {
                            copyFolderRecursiveSync(curSource, targetFolder);
                        } else {
                            fs.copyFileSync(curSource, path.join(targetFolder, file));
                        }
                    });
                }
            };

            // Define source and target folders
            const sourceFolder = path.join(constants.templatedir, 'nuxt', 'presets');
            copyFolderRecursiveSync(sourceFolder, './frontend');
                    
        callback()                 
    }else{
        //assume environment ready
        callback()
    }
}

// export const prettyNuxt = ()=>{
    
//     // prepareOpenApiClient()
//     exec(`cd ${config.frontendFolder};npx prettier --write "./pages/**/*.vue" "./components/**/*.vue" "./generate/*/*.ts" `)
                        
// }
// export const prettyNest = ()=>{
//     exec(`cd ${config.backendFolder};npm run format;npx prettier --write src/dicts/foreignkeys.json`)
// }

// export const prepareOpenApiClient = () => {
//     const executestr = `openapi-generator-cli generate -i  ${config.backendFolder}/openapi.yaml -o ${config.frontendFolder}/generate/openapi -g typescript-axios --skip-validate-spec`
//     log.info("execute generate openapi:")
//     log.info(executestr)

//     const child5 = spawn('openapi-generator-cli',['generate','-i',`${config.backendFolder}/openapi.yaml`,'-o',`${config.frontendFolder}/simpleapp/generate/openapi`,'-g','typescript-axios','--skip-validate-spec'],{  stdio: 'inherit',})
//     // exec(executestr)
// }