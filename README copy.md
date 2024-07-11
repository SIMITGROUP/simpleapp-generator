# Quick start 
1. git clone from simpleapp-generator
```sh
git clone https://github.com/SIMITGROUP/simpleapp-generator-template myapp
cd ~/myapp
simpleapp-generator -c config.json
```
2. start backend
```sh
cd ~/myapp/backend
pnpm start:dev
```
3. start frontend
```sh
cd ~/myapp/frontend
pnpm dev
```
4. try ui:
* frontend: (http://localhost:8080)[http://localhost:8080]
* backend: (http://localhost:8000/api)[http://localhost:8000/api]
5. Match the json schema and the generated forms
```sh
code ~/mydoc
```

# Concept of Development
Development using simpleapp-generator involve below steps:
[Simple]
1. create appropriate jsonschema
2. generate frontend and backend architectures
3. start backend service, obtain and save api definations into openapi.yaml
4. regenerate codes so frontend can obtain openapi clients
5. align frontend UI, add necessary component such as css and ui components

[Advance]
1. complete simple task
2. add more api/process at backend `controller`,`service`,`schema`. Such as:
  a. special search
  b. special workflows
  c. connect external api
  d. additional data processing and validation which is not supported by jsonschema (AJV)
3. security like sso/jwt, plugins
  a. keycloak integration at frontends
  b. backend manage jwt
4. allow additional field formats, validations by modifying ajv
  a. allow custom jsonschema field property, and do something at backend
  b. allow custom field format, and do something at backend
5. repeat same typscript formula at frontend and backend


after generate
1. `./backend/tsconfig.ts` add bolow into compile options
```typescript
"resolveJsonModule": true,
"esModuleInterop": true,
```
2.`./backend/.env` change mongodb setting as below example:
```bash
MONGODB_URL='mongodb://mongoadmin:secret@localhost:27017/admin?authMechanism=DEFAULT'
```
3. download http://localhost:8080/api into `./openapi.yaml`
4. regenerate code (for frontend can function completely)
5. 


1. install openapi-generator, pnpm, nest, rename openapi for new setup
2. load backend tsconfig and add more property: **
3. add prettier formating option for frontend
4. error messages
5. fix single and multi select bugs
6. function of remain menulist
7. security of string input, block xss


errors formating
18.keep audit trail into db
10.add backend find options
10.add frontend find options
11.retain modifications of controller, service, apiclients
14.add permission control
16.access right
17.setting of tenants

authentication in nuxt
jwt in backend


9. beautify default tailwind ui
  1. front page
  2. top bar
  3. menu bars
  4. default with of each component is it nicely fit
  5. table layout  
  7. error formating
9. write proper user guide
13.add workflow functions



hold

10.plugin for ajv
  long string format for description

# Todo
x21.control csrf
x8. simpleapp generate currentfolder error **
x1. override app.vue * 
x2. create layout  
  simpleapp (first time only) 
      /default *
x3. components/  (first time only)
x    /MonitorEvent.vue *
x    /CrudBasic.vue **
x    /Menubar *
4. create page/docs (everytime)
  /index.ts
  //create page if docs/documentname not exists  ***
  //override if docs/documentname/delete-me-for-avoid-override exists  *
5. login/logout sessions
x6. auto create *
x    server/api to backend *





1. define foreign key relationship in json schema2
2. auto index and block deletion
3. when delete identify foreign connected documents
4. how to unique key
5. how to multi-tenancy
6. login/logout in nuxt
7. jwt in nestjs
8. format errors at server side link back client side
9. how to auto toast
10.server side custom validation link back client side
11.permission controls
12.find records
13.audit trail
14.data isolation by org, branch and tenant
15.statistics, aggregations
16.auto generate frontend page
17.





# simpleapp-generator
## this project still in alpha stage!

SimpleApp is an frontend and backend code generator, the ideal of this project is to allow developer build reliable and scalable application with low code methods. 

It suitable for complex schema +complex calculation such as:
1. sales invoice: having parent and childs as 1 document, it need to calculate tax, discount, exchange rate
2. delivery order: need to calculate total quantity, unit of measurement conversion

Key Ideal:
1. Every data store as json format, name as `document`
2. Every document defined by jsonschema, and store in folder `definations`
3. We store jsonschema as `<uniquedocumentname>.<uniquedocumentshortname>.jsonschema.json`. Example: `purchaseorder.po.jsonschema.json`, `student.std.jsonschema.json`
4. `JsonSchema` used to generate:
    - multiple pattern of data types for database, dto, frontend, backend. The data type match to `jsonschema`
    - api controller (openapi)
    - simpleapp frontend and backend objects
5. Generated code will control data validation in both frontend and backend using `ajv`
6. There is few important keyword need to know:
    - `jsondata`: actual data like `{"document_no":"PO001",amount:300}`
    - `jsonschema`: it is schema of `jsondata`, we use it to generate CRUD codes 
    - `frontend`: user interface framework using nuxt (vue+typescript), it doesn't store any data
    - `backend`: api server using nest(typescript), it provide openapi, and store data into mongodb
    - `doc service`: a typescript class use for process specific document in server. example" `po.service.ts`
    - `doc controller`: it is api router for route http traffic to document service. example: `po.controller.ts`
    - `doc client`: frontend client, it provide reactive data and data processing mechanism for frontend

6. To make our app useful, we perform development at
    - backend: modify `api controller` and `backend document service`
    - frontend: layout user interface, bind input fields to `doc client` , and modify `doc client` required
7. We may frequently change `jsonschema`, `doc service`, `doc controller`, `doc client`:
    - the previous modified code remain when you regenerate code (with specific rules)
8. After regenerate codes, some data processing codes in `doc service` will sync into `doc client`, to reduce repeat coding at both end

## Benefit
- Use `jsonschema` generate most of the frontend and backend code
- Generated frontend and backend code in typescript+OOP.
- it control as tight as possible the frontend and backend data consistency
- support complex data schema, included parent and childs, nested objects
- enforce frontend and backend use same data type
- data store in mongodb, exactly same with schema, no join no headache
- flexible frontend, you can code react or vue, no problem. `simpleapp generator` only focus data, not ui
- allow developer enforce specific data processing in frontend and backend
- you can regenerate source code multiple time without worry your customization gone (there is a way!)


Init Nuxt script
1. npm i -D @sidebase/nuxt-auth
2. pnpm i --save next-auth@4.21.1
npm i -D @sidebase/nuxt-session



## You shall know
This project assume you familiar with below:
1. typescript (no typescript, not reliable frontend)
2. mongodb
3. vue/react kind of ecosystem

# Special Format:
There is special format value:
1. `field-autcomplete-code`:field for document code, like `student_code,document_no`
2. `field-autocomplete-label`: field for document name, like `student_name, product_name`

# Special properties:
## object:
* autocomplete-src=category  => autocomplete list from server-url/category/autocomplete

You need to install mongodb and openapi generator:
1. https://www.mongodb.com/docs/manual/installation/
2. https://openapi-generator.tech/docs/installation/

# Quick Start
This quick start create a example project developed by simpleapp-generator      
1. Install `simpleapp-generator`
```sh
npm install -g simpleapp-generator
```
2. mkdir project folder for store frontend and backend codes
```sh
mkdir ~/myapp
cd myapp
```
3. generate sample project 
```sh
simpleapp-generator -e person    # -e mean use example schema "person". Currently only 1 example
```

4. run backend apiserver
```sh
cd backend
pnpm start:dev
```
5. browse to `http://localhost:8000/api` for swagger ui, `http://localhost:8000/api-yaml` for openapi documents
6. You may use vscode to see the example code in `backend/src/docs/pes`:
- pes.controller.ts   //document api controller
- pes.service.ts      //document service controller
- pes.type.ts, pes.apischema.ts, pes.model.ts         //multiple datatype or schema








```
mkdir definations   #we put json schema here

```
3. create configuration file `config.json` 
```sh
echo '{"definationsFolder":"./definations","backendFolder":"./backend", "frontendFolder":"./frontend","openapi3Yaml":""}' > config.json
```
4. create below content and save as `~/myapp/definations/person.pes.jsonschema.json`
```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "example": [
            "John"
          ]
        },
        "lastName": {
          "type": "string",
          "example": [
            "Fox"
          ]
        }
      }
    },
    "age": {
      "type": "integer",
      "example": [
        20
      ]
    },
    "email": {
      "type": "string",
      "example": [
        "john@example.com"
      ],
      "format": "email"
    },
    "dob": {
      "type": "string",
      "example": [
        "2000-01-01"
      ],
      "format": "date"
    },
    "hobbies": {
      "type": "array",
      "items": {
        "type": "string",
        "example": [
          "badminton",
          "dota",
          "reading"
        ]
      }
    },
    "addresses": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "street1",
          "street2",
          "postcode"
        ],
        "properties": {
          "street1": {
            "type": "string",
            "example": [
              "11, Fox Road"
            ]
          },
          "street2": {
            "type": "string",
            "example": [
              "My Home Town"
            ]
          },
          "postcode": {
            "type": "integer",
            "example": [
              12345
            ]
          }
        }
      }
    }
  }
}
```
5. generate backend and frontend codes, and define backend/.env `mongodb connection` string:
```sh
simpleapp-generator -c ./config.json
code backend # use vscode open backend project, edit .env
```
6. You can start backend server and try the generated api at `http://localhost:8000/api`
```sh
cd ~/myapp/backend
pnpm start:dev   
```
7. Next we need more frontend work, put content of `http://localhost:8000/api-yaml` into `~/myapp/openapi.yaml`, and edit config.json as:
```json
{
    "definationsFolder":"./definations",
    "backendFolder":"./backend",
    "frontendFolder":"./frontend",
    "openapi3Yaml":"./openapi.yaml"
 }
```
8. regenerate source code, and use vscode open both backend and frontend project:
 ```sh
simpleapp-generator -c ./config.json
code ./frontend ;
code ./backend ;
```


# The complete development process:
1. Prepare documents
    a. Prepare sample json data
    b. Convert `json` data to `jsonschema`
    c. touch up jsonschema, like define require fields, format, minLength and etc
    d. place json schema into `definations` folder
2. Generate source codes
    a. generate source code into backend project
    b. start backend service, obtain yaml content and save into project folder
    c. re-generate source code, it create required codes for frontend 
3. Begin Frontend development:
    a. use vscode open frontend project
    b. create user interface with several input fields, bind to generated simpleapp object

## 1. Prepare documents
1.  [click here](https://www.convertsimple.com/convert-javascript-to-json/) allow you create json data with lesser effort. Lets use this example:
```json
{
  "docNo": "SI001",
  "customer": "My Customer Pte Ltd",
  "amount": 200,
  "products": [
    "apple",
    "orange"
  ],
  "details": [
    {
      "item": "apple",
      "qty": 100,
      "unitprice": 1,
      "subtotal": 100
    },
    {
      "item": "orange",
      "qty": 100,
      "unitprice": 1,
      "subtotal": 100
    }
  ],
  "remarks": "need fast delivery"
}
```
b. Copy generated json data to [here](https://redocly.com/tools/json-to-json-schema) using below setting, you may define data type/format/required parameters according [jsonschema standard](https://json-schema.org/understanding-json-schema/reference/index.html)
```
output format: json
add example to schema: true
infer require property for array items: true
disable additionalProperty: true
```
Here is the result:
```json
{
  "type": "object",
  "properties": {
    "docNo": {
      "type": "string",
      "example": [
        "SI001"
      ]
    },
    "customer": {
      "type": "string",
      "example": [
        "My Customer Pte Ltd"
      ]
    },
    "amount": {
      "type": "integer",
      "example": [
        200
      ]
    },
    "products": {
      "type": "array",
      "items": {
        "type": "string",
        "example": [
          "apple",
          "orange"
        ]
      }
    },
    "details": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "item",
          "qty",
          "unitprice",
          "subtotal"
        ],
        "properties": {
          "item": {
            "type": "string",
            "example": [
              "apple",
              "orange"
            ]
          },
          "qty": {
            "type": "integer",
            "example": [
              100,
              100
            ]
          },
          "unitprice": {
            "type": "integer",
            "example": [
              1,
              1
            ]
          },
          "subtotal": {
            "type": "integer",
            "example": [
              100,
              100
            ]
          }
        }
      }
    },
    "remarks": {
      "type": "string",
      "example": [
        "need fast delivery"
      ]
    }
  }
}
```
c. save the json data into `definations` folder





## Backend NestJS project preparation
1. install backend nest application: `npm i -g pnpm @nestjs/cli` (cli tools for pnpm and nestjs)
2. create a folder `~/myapp`
3. cd `~/myapp`
4. create blank nest project `nest new backend`, pick `pnpm`
5. enter backend folder: `cd backend`
6. install dependency: `pnpm install --save @nestjs/swagger @nestjs/mongoose mongoose  ajv ajv-formats @nestjs/config` (ignore ✕ missing peer webpack)
7. create .env file with following settings:
```sh
MONGODB_URL='mongodb://<user>:<pass>@<host>:<port>/<db>?authMechanism=DEFAULT'
HTTP_PORT=8000
PROJECT_NAME='SimpleApp Demo1'
PROJECT_DESCRIPTION='Try CRUD'
PROJECT_VERSION='1.0.0'
```
7. change `src/main.ts`, allow openapi document:
```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle(process.env.PROJECT_NAME)
    .setDescription(process.env.PROJECT_DESCRIPTION)
    .setVersion(process.env.PROJECT_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { showExtensions: true },
  });

  await app.listen(process.env.HTTP_PORT); //listen which port
}
bootstrap();
```
9. start backend server `pnpm start:dev`, monitor [http://localhost:3000/api](http://localhost:3000/api)


## Frontend NuxtJS project preparation (or, any others framework if you have know how)
1. `cd ~/myapp`
2. create new frontend nuxt project `npx nuxi@latest init frontend`
3. `cd frontend`
4. install required package: `pnpm install ajv ajv-formats axios json-schema`
5. create .env file with below content
```sh
SIMPLEAPP_BACKEND_URL=http://localhost:8000
PORT=8800
```
6. run frontend: `pnpm dev -o`


## setup Mongodb
1. you can use mongodb, either docker or install binary
https://www.mongodb.com/docs/manual/installation/
** remember create database, and define suitable credentials (user/password)

## Setup openapi-generator
Refer below:
https://openapi-generator.tech/docs/installation/

I'm using mac, so i use `brew install openapi-generator`


# Job Begin!
3 steps:
1. Prepare json schema
2. use json schema generate frontend and backend codes
3. persom simple development

## 1. Prepare sample data schema
1. lets assume we have a sample data:
```json
{
    "name":{"firstName":"John","lastName":"Fox"},
    "age":20,
    "email":"john@example.com",
    "dob":"2000-01-01",
    "hobbies":["badminton","dota","reading"],
    "addresses": [{"street1":"11, Fox Road","street2":"My Home Town","postcode":12345}]
  }
```
2. Generate it become `jsonschema` [here](https://redocly.com/tools/json-to-json-schema), format as json. Follow below settings:
```
add example to schema: true
infer require property for array items: true
disable additionalProperty: true
```

Below is the sample of jsonschema:
```json
{
  "type": "object",
  "properties": {
    "name": {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "example": [
            "John"
          ]
        },
        "lastName": {
          "type": "string",
          "example": [
            "Fox"
          ]
        }
      }
    },
    "age": {
      "type": "integer",
      "example": [
        20
      ]
    },
    "email": {
      "type": "string",
      "example": [
        "john@example.com"
      ],
      "format": "email"
    },
    "dob": {
      "type": "string",
      "example": [
        "2000-01-01"
      ],
      "format": "date"
    },
    "hobbies": {
      "type": "array",
      "items": {
        "type": "string",
        "example": [
          "badminton",
          "dota",
          "reading"
        ]
      }
    },
    "addresses": {
      "type": "array",
      "items": {
        "type": "object",
        "required": [
          "street1",
          "street2",
          "postcode"
        ],
        "properties": {
          "street1": {
            "type": "string",
            "example": [
              "11, Fox Road"
            ]
          },
          "street2": {
            "type": "string",
            "example": [
              "My Home Town"
            ]
          },
          "postcode": {
            "type": "integer",
            "example": [
              12345
            ]
          }
        }
      }
    }
  }
}
```

## Generate Code
1. install simpleapp-generetor `npm install -g simpleapp-generator`
2. create a folder `~/myapp/definations`
3. copy above jsonschema example as `~/myapp/definations/person.ps.jsonschema.json`. 
* `person`: unique document name (small letter alphabet `[a-z]`)
* `ps`: unique document type (small letter `[a-z]`)
* `jsonschema.json`: all files ending with this extension will process
4. create `~/myapp/config.json` with below content
```json
{
    "definationsFolder":"./definations",
    "backendFolder":"./mybackend", 
    "backendPort":"8000",
    "mongoConnectStr":"mongodb://<user>:<pass>@<host>:<port>/<db>?authMechanism=DEFAULT",
    "frontendFolder":"./myfrontend",
    "frontendPort":"8080",
    "openapi3Yaml":"./openapi.yaml",
}
```
5. run `simpleapp-generator -c ./config.json`
6. restart nestjs, the microservice is ready and you can test at `http://localhost:8000/api`. All generated api accessible via swagger-ui.
7. Frontend need further work. Browse `http://localhost:8000/api-yaml`, save content as `openapi.yaml`
8. Rerun `simpleapp-generator -c ./config.json`, it will help us to generate axios executable using openapi.yaml
9. use vscode open both `~/myapp/frontend` and `~/myapp/backend`



## perform simple development
1. in `frontend` project, edit `app.vue`, put in below code:
```vue
<template>
  <div>
    <div>
      <label>Firstname</label>
      <input v-model="reactivedata.name.firstName">  
    </div>
    {{ reactivedata }}
    <button @click="person.create().then((res)=>console.log(res.data))">try</button>
  </div>
</template>
<script setup lang="ts">
import {PersonDoc} from './server/docs/PersonDoc'
const person = new PersonDoc()

// person.update().then((res)=>console.log("dosomething"))
// person.delete('record-id').then((res)=>console.log("dosomething"))
// person.getById('record-id').then((res)=>console.log("dosomething"))
// person.list().then((res)=>console.log(res))
const noreactivedata = person.getData()  //give not reactive data, it cant apply 2 way data binding
const reactivedata = person.getReactiveData() //give vue reactive data, it can apply 2 way data binding using v-model
</script>
```

We notice:
1. `PersonDoc` auto generated, it come with plenty of build in crud features which you can use without knowing API:
```typescript
person.create().then((res)=>console.log("dosomething"))
person.update().then((res)=>console.log("dosomething"))
person.delete('record-id').then((res)=>console.log("dosomething"))
person.getById('record-id').then((res)=>console.log("dosomething"))
person.list().then((res)=>console.log(res))
```
2. `person.getData()` gave reactive object, we can bind all properties directly to `vue` component using `v-model`
3. you may try add more input bind to `reactivedata.name.lastName`,`reactivedata.email`, `reactivedata.age` and monitor result
4. `button` can directly trigger `save` method from person.getData()
5. You wont able to save the record because it not pass validation rules, check browser console it tell you what is happening
6. There is UI component `simpleapp-uicomponent` which can integrate nicely with with `PersonDoc`. Refer the link [here](...)

# We can do more With SimpleApp
## no time for full documentation yet
1. Monitor variable change at frontend
step 1: add new methods for frontend's class `PesonDoc.ts` 
```
    watchChanges = ()=>{
        watch(this.getReactiveData(),(newdata)=>{ 
            this.getReactiveData().age=calculateAge(newdata.dob)
            //apply others changes here
            })
    }
```
step 2: edit `app.vue` to on the watcher
```typescript
//others codes
const person = new PersonDoc()
person.watchChanges()  //<-- add this line to on watcher at frontend
//others codes
```

2. create more api to `person`, such as `post /person/:id/sendEmail {title:"title",body:"body"}`
step 1: edit backend `<backend>/src/docs/pes/pes.controller.ts`, add new source code between `<begin-controller-code>` and `<end-controller-code>`:
```typescript
//<begin-controller-code>
//new api, wont override when regenerate code
  @Get('/try/:id')
  @ApiResponse({
    status: 200,
    description: 'success',
    type: pesapischema.Person,
  })
  @ApiResponse({ status: 404, description: 'Document not found' })
  @ApiResponse({ status: 500, description: 'Internal error' })
  @ApiOperation({ operationId: 'newFindOne' })  //important, frontend access it via person.newFindOne()
  async newFindOne(@Param('id') id: string) {
    return this._findOne(id);
  } 
  //<end-controller-code>
```
step 2: try browse to `http://localhost:8000/api` to check new api appear or not. 
step 3: You shall regenerate the code
```bash
simpleapp-generator -c ./config.json
```
step 4: go frontend project, edit `app.vue` you may try type  `person.newFindOne()` see new method exists?

step 3: Regenerate code for frontend  

4. create backend only execution for `person`. It is useful cause some work only 
step 1: Edit backend `backend/src/docs/pes/pes.service.ts`, add new source code between `<begin-backend-code>` and `<end-backend-code>`:
```typescript
//<begin-backend-code>
   //new method, wont override when regenerate code
  logSomething = () => {
    console.log('Access try api');
  };
  //<end-backend-code>
```
step 2: modify `<backend>/src/docs/pes/pes.controller.ts`, call the new method
```typescript
async newFindOne(@Param('id') id: string) {
    this.service.logSomething();  //this.service is our service class
    return this._findOne(id);
  }
```


5. create frontend only code for `person`, such as:
    `person.addHobbies('hobby1')`,`person.addAddress({})`,`person.delAddress(index:number)` edit `newFindOne`:
```
```
6. create bothend code for `person`



foreign key
cat
  category_id
  category_code
  category_name

product
  product_id
  product_code
  product_name
  category => category_id: category_code



invoice
  invoice_id
  invoice_no
  invoice_date
  total
  details => 
    product => product_id: product_code
    qty 
    price 
    subtotal

order
  order_id
  order_no
  order_date
  total
  details => 
    product => product_id: product_code
    qty 
    price 
    subtotal

    
cat => foreignkey: []
prd => foreignkey: category => category
invoice => foreignkey: detail.product=>product
order => foreignkey: detail.product=>product

cat =[product.category]
product=[invoice.detail.product, order.detail.product]




todo:
## high priority Job

[ ] add special search like isolate by user for autocomplete (add property of)
    choose org then branch
[ ] create invoice and receipt
[x] fix error reporting and success reporting at frontend
[x] define some allow override and some not
[ ] json schema can set generate what page type, no define = no generate page
[ ] create tenant/org/branch auto increament
[ ] focus on functions customer, product, invoice and receipt
[~] repeat same typscript formula at frontend and backend
[ ] frontend search
[ ] new transaction CRUD ui
[ ] student UI
[ ] structure of save into another document

Permission and Authorization
[x] hide no permission window
[ ] hide no permission buttons
[x] permission user/group (pick hard coded group from some place)
[ ] figure how to get enum list from permission list for user schema



1. copy group-to-role to both frontend and backend 
2. loop backend role code, and define into user role
3. loop frontend role code, and 
    1 update to getMenus, 
    2. existing all menus store as permission list
    3. crud and etc page need verify existing user can go in this menu or not. if can't will render no permission
    4. use directive to control show or not show button (new, save, delete)



Custom Document Status and API
[ ] document status control
[ ] document api touch up
1. auto add document status column
2. change document status when change status
3. enum document status, but UI dont show the field
4. have document action, then show document button


# Quick start 
** You need to have mongodb installed **
1. git clone from simpleapp-generator
```sh
npm -i @simitgroup/simpleapp-generator@latest
git clone https://github.com/SIMITGROUP/simpleapp-generator-template myapp
# edit myapp/config.json to match you mongodb connection string
cd ~/myapp
simpleapp-generator -c config.json
```
2. start backend
```sh
cd ~/myapp/backend
pnpm start:dev
```
3. start frontend
```sh
cd ~/myapp/frontend
pnpm dev
```
4. try ui:
* frontend: [http://localhost:8080](http://localhost:8080)
* backend: [http://localhost:8000/api](http://localhost:8000/api)
5. Open project with vscode, explore json schema and the generated forms
```sh
code ~/mydoc
```
you can change your project at:
* myapp/backend/.env
* myapp/backend/src/hooks/*

* myapp/frontend/.env
* myapp/frontend/pages/*



# Special Properties:
## Special root level property
_id: 
tenantId:
orgId:
branchId:
created:
createdBy:
updated:
updatedBy:
documentStatus
_v:
x-document-status: [optional]array of document satus: such as:
  {
      "":{"readonly":false,"allowApi":["confirm","void"],"description":"new"},
      "D":{"readonly":false,"allowApi":["confirm","void"],"description":"draft"},
      "V":{"readonly":true,"allowApi":[],"description":"v"},
      "CO":{"readonly":true,"allowApi":["void","revert"],"description":"confirmed"},
      "CL":{"readonly":true,"allowApi":[],"description":"closed"}
    }
x-document-api: [optional]array of custom api (beside default)

```typescript
[
      {"action":"confirm","method":"put","setDocumentStatus":"CO", "bpmn":"generic-confirm", 
          "data":{"document":"document"}},
      {"action":"void",,"method":"put", "setDocumentStatus":"V", "bpmn":"generic-void", 
          "data":{"document":"document"}},
      {"action":"revert",,"method":"put", "setDocumentStatus":"D", "bpmn":"generic-revert", 
        "data":{"document":"document"}},
      {"action":"duplicate", ,"method":"post","data":{"document":"document"}},
      {"action":"switchStatus",,"method":"put","data":{"statusName":"string","document":"document"}}
    ]
```
## Custom Format

## Custom Property

# Concept of Development
Development using simpleapp-generator involve below steps:
## Simple
1. create appropriate jsonschema
2. generate frontend and backend architectures
3. start backend service, obtain and save api definations into openapi.yaml
4. regenerate codes so frontend can obtain openapi clients
5. align frontend UI, add necessary component such as css and ui components

## Advance
1. complete simple task
2. add more api/process at backend `controller`,`service`,`schema`. Such as:
  a. customized search and filters
  b. customized workflows
  c. connect external api
  d. additional data processing and validation which is not supported by jsonschema (AJV)
3. security like sso/jwt, plugins
  a. keycloak integration at frontends
  b. backend manage jwt
4. allow additional field formats, validations by modifying ajv
  a. allow custom jsonschema field property, and do something at backend
  b. allow custom field format, and do something at backend
5. repeat same typscript formula at frontend and backend

Special Root Level property
[x] x-ignore-autocomplete: optional boolean, define it to allow undefine x-document-no & x-document-label
[x] x-isolation-type: optional string, how data isolated, 'none,tenant,org,branch', default 'org'

Special Field Level property



# JSON Schema supported String Format
all format recognize by ajv plus below:

1. tel: only digit, auto generate input tel
2. documentno : will use documentno generator for auto generate document no 
3. text: do nothing, will auto generate textarea
4. html editor: do nothing, will auto generate html editor



# Todo
## Update documentation and reference
1. create github simpleapp-generator-template and documentation
2. update documentation for `simpleapp-generator` and `simpleapp-vue-component`


workflow ideal
1. define apiserver at backend .env
2. api-service class can have standardway for
  a. excute new workflow
  b. get tasklist belong to me or my group
  c. trigger task move
  d. cancel workflow
  e. can define workflow inputs
3. bind hook to workflow?





1. try possibility of no backend modifications
3. completely hide all generated codes of frontend and backend, except allow change items
1. define hidden control infra of admin tenant, user api+ui (like need special role system-admin from keycloak)
add lodash  plugin at both side


autocomplete can have more dependency filter like setting in jsonschema
2. way in jsonschema to use share source code for frontend/backend like
  calculate tax
  calculate subtotal

5. new transaction crud
d. windows
new user no tenant record how to do?
8. way to handle :id/api
9. service class which not using source code



1. create follow data
  a. users
  b. tenant / users
  c. org
      branch/user
      group
  
  
3. json schema setting can define isolation type
2. page/index first login can pick tenant
3. create all window as xorg/index
4. transaction crud window 
    with x-document-api can have button for api-buttons, control by document status
    support readonly status
5. simple crud only support crud
6. support document-no
7. add special isolation method by user
8. beautify nuxt page
9. foreign key with different schema


2. tidy up error at frontend/backend messages
fix success msg at frontend
11.add simple and consistent external hook in service class. 
13.have way to create more api using different openapi schema but on same object
1. support half schema setting in crud, the rest at background

no auto logout after session expired, or auto renew token
    - menulist  ** less priority, can customize manually
10.auto bind apiclient methods to compatible with openapi methods
  a. create backend service method
  b. create controller handle
  
  b. add popup dialog for edit table
  c. separate list table and form table
  d. 
5. tenant setting
6. user management
5. security of string input, block xss
12.add pusher listener in apiclient also

18. add transaction screen templates


## Lower Priority
3. multi-lingual
6. audit trails
7. permissions
7. update record need replace  updated,updatedBy, line item also need headache

11.frontend add parent/child ui for invoices

[done]
x16. support table details in generator
x3. settle instancePath in form
x17. auto add source code for addarray item
a. render autocomplete readonly field
xauto index x-document-name
x8. jwt
ximprove tel control to allow empty string
x15. some autocomplete wish to allow additional column like 6% tax, now become additional fields
x9. frontend authentication
x1. auto pretty backend and frontend
x2. fix pages:id issue
x3. search at backend
1. remain codes after regenerate (backend)
x    - service
x    - schema
x    - controller
x8. block uniquekey
1. remain codes after regenerate (frontend)
x    - pages
x    - composable  (no need )
x6. fill in data for tenant/org/branch created,updated,createdBy,updatedBy
14. force x-document-no/name is required



## Bug fix
1. Openapi some schema like primarykey/more not generated, cause error in ide


Document Numbering System
1. generate prepare list of document no for generate. 
  x-document-no + document-format
2. if x-document-no, will auto add docformat={}
3. button can pick document-no format
4. have add new function
5. if type manually wont create new
6. preview next no api
7. generate next no api
8. if _id = '', will auto preview next no
9. after change default format, will preview another next no
10. have list to pick format
11. support transactions
12. only list current branch document no options
11. master data
  a. add list for document type
  b. click doctype then can available document settings
  c. document will set by branch


SimpleApp-Vue-Component Fix:
1. table
  a. column title
  b. nested column data, like primarykey label
  c. search and functions like filters, pagination, large datas
1. single/multi select
4. search at frontend


Coding Rules
1. create type and codes in 'shares'
2. service class and doc class 




JSON Properties
document level property
{ 
  "type":"object"
  "x-simpleapp-config":{
    //isolation type, none/tenant/org/branch
    "isolationType":"none",       
    
    //what special allow access it, undefine mean only super admin, and resource+action role can go in  
    "requiredRoles":["SuperAdmin"],   
    
    // page type (example: crud), undefine will not generate page in frontend
    "pageType":"crud",        
    
    //unique key for document, it build compound index depends on isolationtype
    "uniqueKey":"invoiceNo",  
    
    //use as display name in autocomplete, also add into textsearch
    "documentTitle":"InvoiceTitle",      //no define this will not have auto complete and text search for this field
    
    
    //frontend uniqueKey field become special input field which can generate doc number, once activated auto create new field `docNoFormat`
    "generateDocumentNumber":true,
    
    //frontend use this field to show current month document, docNumberFormat generator will have monthly document number setting
    "documentDate":"invoiceDate",

    //manage document status and accessibility, it auto add field `documentStatus` when define
    "allStatus":[
      {"status":"CO","readOnly":true,"actions":["revert","void","close"]},
      {"status":"V","readOnly":true,"actions":["revert"]},
    ],
    
    //all custom api, response, paras, operation put here. variable define at entryPoint or querypara
    "allApi":[{
      "action":"confirm",
      "entrypoint":":id/confirm",
      "requiredrole":["SuperUser"],
      "method":"post", 
      "execute":"ping",
      "description":"confirm document and change status to CO"
    },{
      "action":"void",
      "entrypoint":":id/void",
      "querypara":["reason"],
      "requiredrole":["SuperUser"],
      "method":"post", 
      "execute":"ping",
      "description":"confirm document and change status to CO"
    }],      

    // simple => pure model and service(no page,api),
    // default => force masterdata property,  
    // transaction => force masterdata property
    "schemaType": "default",  

    //frontend(client) and backend (processor) typescript class auto import this lib, helper for `formula`
    "libs":[{"lib":"lodash","as":"_"}],   // both process class and frontend client class will import same lib

    // frontend apply recalculation everytime current document change
    // backend auto apply formula during create and update
    "formula": [   //apply both frontend and backend, it different with concept on change, sequence of formula important
      {"jsonPath":"$.subtotal","formula":"jslib.getDocumentSubTotal(@F{$.details})"},  //apply formula into single field
      {"jsonPath":"$.tags","formula":"$F{$.tags}.map(item=>item.toUppeCase())"}, //apply upper case to all item in string array
      {"jsonPath":"$.details","loop":"jslib.calculateLineTotal(item)"}, //apply multiple calculation of subtotal, tax, amtaftertax and etc, using loop
      {"jsonPath":"$.total","formula":"@F{$.subtotal} + @F{$.taxamt}"}, //apply simple formula here
    ],    
    
    // auto generate fields
    documentType: 'SI',
    documentName: 'Sales Invoice',

    //auto generated foreign keys catalogue
    "foreignKeys":{ "customer":["$.customer._id"], "user":[{"$.preparedby._id"},{$.approveby._id"}]}  
  },
  "properties":{
      "invoiceDate":{"type":"string"},
       //and others field
   }
}
