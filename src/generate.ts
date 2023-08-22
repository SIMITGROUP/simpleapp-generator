// import { readFormBuilder } from './processors/formbuilder.tsa';
// import { readJsonSchemaBuilder } from './processors/jsonschemabuilder';
import {readJsonSchemaBuilder} from './processors/jsonschemabuilder'
// import { compile } from 'json-schema-to-typescript';
// import { Fieldtypes, SchemaModel, ChildModels } from './type';
import { Fieldtypes, SchemaModel, ChildModels } from './type'
const path = require('path');
const {mkdirSync,readdir,readFileSync,writeFileSync,existsSync} = require('fs');
const { Eta } = require('eta');
const { capitalizeFirstLetter }= require('./libs');
const extFb = '.xfb.json';
const extHfb = '.xhfb.json';
const extjsonschema = '.jsonschema.json';
let jsonschemas = {};
const docs = [];

export const initialize = async (defFolder:string,backendfolder:string,frontendfolder:string) => {
  await readdir(defFolder, (err, files) => {
    files.forEach((file) => {
      const filearr = file.split('.');
      let rendertype = 'basic';
      const docname = filearr[0].toLowerCase();
      const doctype = filearr[1].toLowerCase();
      const jsonstring = readFileSync(defFolder +path.sep+ file, 'utf-8');
      const jsondata = JSON.parse(jsonstring);
      let allmodels: ChildModels = {} as ChildModels;
      
      if (file.endsWith(extFb)) {
        rendertype = 'fb';
        // schema = readFormBuilder(doctype, docname, jsondata);
      } else if (file.endsWith(extjsonschema)) {
        rendertype = 'basic';
        jsonschemas[docname] = jsondata;
        allmodels = readJsonSchemaBuilder(doctype, docname, jsondata);
      } else if (file.endsWith(extHfb)) {
        rendertype = 'hfv';
        console.error(file + ' is hfb and not supported yet');
      } else {
        console.error(file + ' is not supported');
      }

      if (allmodels) {
        generate(docname, doctype, rendertype, allmodels,backendfolder,frontendfolder);
      }
    });
  });
  
  console.log(
    'all document generate successfully, refer src/docs/<docs>/README.md to understand how to activate each document api',
  );
};

const generate = (
  docname: string,
  doctype: string,
  rendertype: string,
  allmodels: ChildModels,
  backendfolder:string,
  frontendfolder:string
) => {
  const targetfolder = `${backendfolder}/${doctype}`;

  try {
    
    mkdirSync(targetfolder,{ recursive: true });
    mkdirSync(frontendfolder,{ recursive: true });
    
  } catch (err) {
    //do nothing if folder exists
  } finally {
    const templatefolder = `./templates/${rendertype}`;
    console.log('Generate ', docname, doctype, templatefolder);
    const eta = new Eta({
      views: templatefolder,
      functionHeader:
        'const capitalizeFirstLetter = (str) => str.slice(0, 1).toUpperCase() + str.slice(1);' +
        'const initType=(str)=>{console.log(str);return ["string","number","boolean","array","object"].includes(str) ? capitalizeFirstLetter(str) : str;}',
    });
    console.log('generate 1');
    const variables = {
      name: docname,
      doctype: doctype,
      models: allmodels,
      schema: allmodels[capitalizeFirstLetter(docname)].model,
      apiSchemaName: capitalizeFirstLetter(docname), //capitalizeFirstLetter(doctype) + 'ApiSchema',
      typename: capitalizeFirstLetter(docname),
      fullApiSchemaName:
        doctype + 'apischema.' + capitalizeFirstLetter(docname),
      fullTypeName: doctype + 'type.' + capitalizeFirstLetter(docname),
      jsonschema: jsonschemas[docname],
      bothEndCode: '',
      frontEndCode: '',
      backEndCode: '',
    };

    // console.log('generate 2', JSON.stringify(variables));

    // // const txtUISchema = eta.render('./uischema', variables);

    // console.log('generate 4');
    // console.log('generate 2', variables);
    const txtType = eta.render('./type', variables);
    writeFileSync(`${targetfolder}/${doctype}.type.ts`, txtType);
    // compile(jsonschemas[docname], docname).then((txtType: string) => {
    //   writeFileSync(`${targetfolder}/${doctype}.type.ts`, txtType);
    // });

    // generate jsonschema object, use for data validation
    const txtJsonSchema = eta.render('./jsonschema', variables);
    writeFileSync(`${targetfolder}/${doctype}.jsonschema.ts`, txtJsonSchema);

    // generate before save source code, wont override after regenerate
    const customizefilename = `${targetfolder}/${doctype}.beforesave.ts`;
    if (!existsSync(customizefilename)) {
      const txtBeforeSave = eta.render('./beforesave', variables);
      writeFileSync(
        `${targetfolder}/${doctype}.beforesave.ts`,
        txtBeforeSave,
      );
    }
    // write mongoose model file
    const txtModel = eta.render('./model', variables);
    writeFileSync(`${targetfolder}/${doctype}.model.ts`, txtModel);

    // prepare openapi schema
    const txtApiSchema = eta.render('./apischema', variables);
    writeFileSync(`${targetfolder}/${doctype}.apischema.ts`, txtApiSchema);

    // prepare backend classes
    // prepare frontend api client

    const servicefile = `${targetfolder}/${doctype}.service.ts`;
    let bothEndCode = '';
    let backEndCode = '';
    if (existsSync(servicefile)) {
      const servicecodes = readFileSync(servicefile).toString();

      /* extract string bothend and backend, put in back */
      const regex1 =
        /\/\/<begin-bothend-code>([\s\S]*?)\/\/<end-bothend-code>/g;
      const regex2 =
        /\/\/<begin-backend-code>([\s\S]*?)\/\/<end-backend-code>/g;
      const bothendresult = servicecodes.match(regex1);
      const backendresult = servicecodes.match(regex2);
      console.log('bothendresult', bothendresult);
      console.log('backendresult', backendresult);
      if (bothendresult) {
        bothEndCode = bothendresult[0];
        console.log('bothEndCode=======', bothEndCode);
      }

      if (backendresult) {
        backEndCode = backendresult[0];
        console.log('backEndCode=======', backEndCode);
      }
    }

    variables.bothEndCode = bothEndCode ?? '';
    variables.backEndCode = backEndCode ?? '';
    const txtService = eta.render('./service', variables);
    writeFileSync(`${targetfolder}/${doctype}.service.ts`, txtService);

    // prepare api router, allow add more api and wont override after regenerate
    const controllerfile = `${targetfolder}/${doctype}.controller.ts`;
    if (!existsSync(controllerfile)) {
      const txtController = eta.render('./controller', variables);
      writeFileSync(controllerfile, txtController);
    }

    // prepare module
    const txtModule = eta.render('./module', variables);
    writeFileSync(`${targetfolder}/${doctype}.module.ts`, txtModule);

    // prepare readme
    const txtReadme = eta.render('./readme', variables);
    writeFileSync(`${targetfolder}/README.md`, txtReadme);

    const frontendfile = `${frontendfolder}/${variables.typename}Doc.ts`;
    let frontEndCode = '';
    if (existsSync(frontendfile)) {
      const clientcodes = readFileSync(frontendfile).toString();

      /* extract string frontend code, put in back */
      const regex3 =
        /\/\/<begin-frontend-code>([\s\S]*?)\/\/<end-frontend-code>/g;

      const frontendresult = clientcodes.match(regex3);

      if (frontendresult) {
        frontEndCode = frontendresult[0];
        console.log('frontEndCode=======', frontEndCode);
      }
    }
    variables.frontEndCode = frontEndCode ?? '';
    const txtDocClient = eta.render('./apiclient', variables);
    writeFileSync(frontendfile, txtDocClient);

    // // fs.writeFileSync(`${targetfolder}/${doctype}.uischema.ts`, txtUISchema);

    console.log('write done: ', doctype);
    //create type
    //create service
    //create controller
    //create module
    //create apischema
    //create beforesave if not exists
    // console.log(schema, res);
  }
};


