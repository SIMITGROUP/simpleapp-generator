#! /usr/bin/env node
import { error } from 'console';
import * as fw from './framework';
import * as generate from './generate';
import { chmod } from 'fs';
const program = require('commander'); // add this line
const Fieldtypes = require('./type');
// const generate= require( './generate')

const fs = require('fs');
// const  createproject =require( './createproject')
const ps = require('child_process');
const capitalizeFirstLetter = require('./libs');
const { Logger, ILogObj } = require('tslog');

const log: typeof Logger = new Logger();

const figlet = require('figlet');
// const program = new Command();
const pj = require('../package.json');

let version = pj.version;
program
  .version(version)
  .description(
    'An simpleapp CLI tool for generate frontend (vuejs) and backend(nestjs) codes'
  )
  .option('-c, --config-file <value>', 'configuration file')
  .option(
    '-g, --generate-type <value>',
    'generate type init, backend, frontend'
  )
  .parse(process.argv);

let path = '';
const options = program.opts();
console.log(figlet.textSync(`SimpleApp Generator`));
console.log(figlet.textSync(`${version}`));
let continueexecute = true;
if (options.generateType && options.generateType == 'init') {
  continueexecute = false;

  fw.prepareProject(() => {
    chmod(process.cwd() + '/build.sh', 0o755, () => {
      process.exit(1);
    });
  });
} else if (!options.configFile) {
  log.error(
    'Config file parameter is required. Example: simpleapp-generator -c ./config.json'
  );
  throw 'Undefine configuration file';
} else if (options.configFile && options.configFile[0] == '/') {
  path = options.configFile;
} else if (options.configFile) {
  path = process.cwd() + '/' + options.configFile;
} else {
  log.error(
    'undefine configuration file, use command simpleapp-generator -c <configfilename.json>'
  );
  throw error;
}

if (continueexecute) {
  const configs = require(path);
  // console.log("configurations: ",configs)
  const jsonschemaFolder = configs.jsonschemaFolder;
  const bpmnFolder = configs.bpmnFolder;
  const backendFolder = configs.backendFolder;
  const frontendFolder = configs.frontendFolder;

  const run = async () => {
    fw.setConfiguration(configs);
    fw.runCreateNuxt(() => {
      fw.runCreateNest(() => {
        fw.prepareNest(() => {
          fw.prepareNuxt(() => {
            // generate.initialize(jsonschemaFolder,configs.groupFolder,bpmnFolder,backendFolder,frontendFolder,()=>{
            generate.run(configs, ['nest', 'nuxt'], () => {
              fw.prettyNuxt();
              fw.prettyNest();
            });
          });
        });
      });
    });
  };

  const runUpdateMiniAppJsSdk = async () => {
    fw.setConfiguration(configs);
    generate.run(configs, ['miniAppJsSdk'], () => {
      fw.prettyMiniAppJsSdk();
    });
  };

  const reGenFrontend = async () => {
    fw.setConfiguration(configs);
    generate.run(configs, ['nuxt'], () => {
      fw.prettyNuxt();
    });
  };
  const reGenBackend = async () => {
    fw.setConfiguration(configs);
    generate.run(configs, ['nest'], () => {
      fw.prettyNest();
    });
  };

  const runbackend = async () => {
    fw.setConfiguration(configs);
    fw.setConfiguration(configs);
    fw.runCreateNest(() => {
      fw.prepareNest(() => {
        // generate.run(jsonschemaFolder,configs.groupFolder,bpmnFolder,backendFolder,frontendFolder,()=>{
        generate.run(configs, ['nest'], () => {
          fw.prettyNest();
        });
      });
    });
  };

  const runfrontend = async () => {
    fw.setConfiguration(configs);
    fw.runCreateNuxt(() => {
      fw.prepareNuxt(() => {
        // generate.initialize(jsonschemaFolder,configs.groupFolder,bpmnFolder,backendFolder,frontendFolder,()=>{
        generate.run(configs, ['nuxt'], () => {
          fw.prettyNuxt();
        });
      });
    });
  };

  switch (options.generateType) {
    case 'updatefrontend':
      reGenFrontend();
      break;
    case 'updatebackend':
      reGenBackend();
      break;
    case 'frontend':
      runfrontend();
      break;
    case 'backend':
      runbackend();
      break;
    case 'updateMiniAppJsSdk':
      runUpdateMiniAppJsSdk();
      break;
    case 'all':
      run();
      break;
    default:
      log.error('unknown generate type');
      break;
  }
}
