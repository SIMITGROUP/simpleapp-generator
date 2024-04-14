import fs, { copyFileSync, mkdirSync,existsSync, writeFileSync } from 'fs'
import {spawn,exec} from "child_process"
import _ from 'lodash'
import { Logger, ILogObj } from "tslog";
import * as constants from './constant'
import  {Eta}  from 'eta';
const log: Logger<ILogObj> = new Logger();

let config = {
    "jsonschemaFolder":"./jsonschemas",
    "bpmnFolder":"",//./workflows/bpmn",
    "backendFolder":"./backend", 
    "groupFolder":"./groups",
    "langFolder":"./lang",
    "backendPort":"8000",
    "mongoConnectStr":'mongodb://127.0.0.1:27017/simpleapp',
    "mongoDbName":'simpleapp',
    "frontendFolder":"./frontend",
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
export const runCreateNest= (callback:Function) =>{
    const backendFolder=config.backendFolder
    if(!fs.existsSync(backendFolder)){
        const child = spawn('npm',['install','-g','pnpm', '@nestjs/cli', '@openapitools/openapi-generator-cli', 'nuxi'],
                        {  stdio: 'inherit',})
        child.on('close',(exitCode)=>{            
            const child2 = spawn('nest',['new', '-p', 'pnpm', backendFolder],{  stdio: "inherit"})
            child2.on('close',(exitCode)=>{                
                callback()
            })
        })        
    }else{
        callback()
    }
}
//create empty nuxt project
export const runCreateNuxt = (callback:Function) =>{
    const frontendFolder=config.frontendFolder
    if(!fs.existsSync(frontendFolder)){
        const child3 = spawn('npx',['nuxi@latest','init',frontendFolder],{  stdio: 'inherit',})        
        child3.on('close',(exitCode)=>{ 
            const nuxtconfigfile = `${frontendFolder}/nuxt.config.ts`
            const nuxtconfigtxt = "--remove-this-line-to-prevent-override--\n" + fs.readFileSync(nuxtconfigfile)
            fs.writeFileSync(nuxtconfigfile, nuxtconfigtxt);
        
            callback()
        })
    }else{
        callback()
    }
}

export const prepareNest = (callback:Function)=>{
    const targetfolder =config.backendFolder
    log.info(`creating backend project ${targetfolder}`)
    if(!fs.existsSync(`${targetfolder}/.env`)){
        
        
        //@nestjs/graphql @nestjs/apollo graphql apollo-server-express apollo-server-core
        //@nestjs/graphql graphql-tools graphql apollo-server-express 
        exec(`cd ${targetfolder};pnpm install --save @nestjs/graphql country-to-currency countries-and-timezones @nestjs/apollo @apollo/server graphql @nestjs/event-emitter dayjs bpmn-server@2.1.7 @casl/ability jsonpath yaml lodash @types/lodash nest-keycloak-connect keycloak-connect bpmn-client @nestjs/serve-static jsonwebtoken axios @darkwolf/base64url json-schema @wearenova/mongoose-tenant @nestjs/swagger @nestjs/mongoose mongoose  ajv ajv-formats ajv-errors @nestjs/config`,async (error, stdout, stderr)=>{
            // log.info(`dependency installed`)
            if(!error){
                // fs.mkdirSync(`${targetfolder}/public_html`,{recursive:true})
                // const eta = new Eta({views: constants.templatedir});              
                // const variables=config    
                // const txtEnv = eta.render('./nest/nest.env.eta', variables);                
                // const txtMain = eta.render('./nest/nest.main.eta', variables);   
                // const txtRedirectHtml = eta.render('./nest/oauth2-redirect.eta', variables);   

                // fs.writeFileSync(`${targetfolder}/.env`, txtEnv);
                // fs.writeFileSync(`${targetfolder}/src/main.ts`, txtMain);            
                // fs.writeFileSync(`${targetfolder}/public_html/oauth2-redirect.html`, txtRedirectHtml);            
                const tsconfigpath = process.cwd()+'/'+`${targetfolder}/tsconfig.json`
                const tsconfig = require(tsconfigpath)
                tsconfig.compilerOptions.esModuleInterop=true
                tsconfig.compilerOptions.resolveJsonModule=true
                fs.writeFileSync(tsconfigpath, JSON.stringify(tsconfig));

                log.info("nest project completed")                
                callback()
            
            } else{
            log.error(stderr)
            throw error
            }
        })
    }else{
        log.info(`${targetfolder}/.env exists, skip regenerate environment`)
        callback()
    }
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
    const targetfolder = config.frontendFolder
    if(!fs.existsSync(`${targetfolder}/.env`)){
        //asume no environment. prepare now
        exec(`cd ${targetfolder};pnpm install;pnpm install -D @nuxtjs/apollo@next dayjs-nuxt @nuxtjs/device @nuxtjs/color-mode @types/json-schema @nuxtjs/i18n@next nuxt-primevue @nuxtjs/tailwindcss @types/jsonpath @sidebase/nuxt-auth @types/node @vueuse/nuxt @sidebase/nuxt-auth @vueuse/core  prettier `, (error, stdout, stderr)=>{                
            //;pnpm install    
            console.log(error, stdout, stderr)
                exec(`cd ${targetfolder};pnpm install --save  vue-pdf-embed dayjs pusher-js country-code-dateformat chart.js tailwind-merge @iconify-json/heroicons  json-schema @vueuse/core ts-md5 primeicons memory-cache jsonpath pinia @pinia/nuxt @nuxt/kit lodash @types/lodash @darkwolf/base64url next-auth@4.21.1 @darkwolf/base64url @nuxt/ui ajv ajv-formats ajv-errors dotenv @fullcalendar/core @fullcalendar/vue3 quill prettier axios json-schema mitt `, (error, stdout, stderr)=>{                
                console.log(error, stdout, stderr)
                
                // fs.mkdirSync(`${targetfolder}/assets/css/`,{recursive:true})
                // fs.mkdirSync(`${targetfolder}/layouts`,{recursive:true})
                // fs.mkdirSync(`${targetfolder}/components`,{recursive:true})
                // fs.mkdirSync(`${targetfolder}/server/api/[xorg]`,{recursive:true})
                // fs.mkdirSync(`${targetfolder}/server/api/auth`,{recursive:true})
                // fs.mkdirSync(`${targetfolder}/pages/[xorg]`,{recursive:true})
                // fs.mkdirSync(`${targetfolder}/plugins`,{recursive:true})
                // const eta = new Eta({views: `${constants.templatedir}/nuxt`});              
                // const variables=config
                // const writes = {
                //     './app.vue.eta':'app.vue',                                
                //     './layouts.default.vue.eta':'layouts/default.vue',
                //     './server.api.ts.eta':'server/api/[xorg]/[...].ts',
                //     './server.api.auth.logout.ts.eta':'server/api/auth/logout.ts',
                //     './server.api.auth[...].ts.eta':'server/api/auth/[...].ts',
                //     './nuxt.config.ts.eta':'nuxt.config.ts',
                //     './pages.index.vue.eta':'pages/index.vue',
                //     './pages.[xorg].index.vue.eta':'pages/[xorg]/index.vue',
                //     './pages.login.vue.eta':'pages/login.vue',
                //     './plugins.10.simpleapp.ts.eta':'plugins/10.simpleapp.ts',
                //     './tailwind.config.ts.eta':'tailwind.config.ts',
                //     './tailwind.css.eta':'assets/css/tailwind.css',                    
                //     './env.eta':'.env',
                // }
        
                // const templates = Object.getOwnPropertyNames(writes)
                // for(let i=0; i<templates.length;i++){
                //     const template = templates[i]
                //     const filename = writes[template]
                //     const txt = eta.render(template, variables);                
                //     const file =`${targetfolder}/${filename}`
                //     log.info("writing ",file)
                //     fs.writeFileSync(file, txt);    
                // }
               

                // const frontendtsconfigpath = process.cwd()+'/'+`${targetfolder}/tsconfig.json`
                // const frontendtsconfig ={  
                //     "extends": "./.nuxt/tsconfig.json",
                //     "compilerOptions": {
                //     "strictNullChecks":false
                //     }
                //   }                                    
                // fs.writeFileSync(frontendtsconfigpath, JSON.stringify(frontendtsconfig));
                // exec(`openapi-generator-cli generate -i  ${config.backendFolder}/openapi.yaml -o ${config.frontendFolder}/generate/openapi -g typescript-axios --skip-validate-spec`)
                // log.info("nuxt project completed")                
                callback()
                })
            
            })       
    }else{
        //assume environment ready
        callback()
    }
}

export const prettyNuxt = ()=>{
    
    prepareOpenApiClient()
    exec(`cd ${config.frontendFolder};npx prettier --write "./pages/**/*.vue" "./components/**/*.vue" "./generate/*/*.ts" `)
                        
}
export const prettyNest = ()=>{
    exec(`cd ${config.backendFolder};npm run format;npx prettier --write src/dicts/foreignkeys.json`)
}

export const prepareOpenApiClient = () => {
    const executestr = `openapi-generator-cli generate -i  ${config.backendFolder}/openapi.yaml -o ${config.frontendFolder}/generate/openapi -g typescript-axios --skip-validate-spec`
    log.info("execute generate openapi:")
    log.info(executestr)

    const child5 = spawn('openapi-generator-cli',['generate','-i',`${config.backendFolder}/openapi.yaml`,'-o',`${config.frontendFolder}/simpleapp/generate/openapi`,'-g','typescript-axios','--skip-validate-spec'],{  stdio: 'inherit',})
    // exec(executestr)
}