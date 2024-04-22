# Introduction
SimpleApp generator is a typescript code generator for convert jsonschemas become workable frontend (nuxt) and backend (nest). There is plenty of benefit included:
1. complex multi-tenancy data isolation structure which support tenant/organization/branches
2. unified frontend and backend data validation according jsonschemas
3. Auto generate frontend template, frontend developer freely modify layout without worry integration lose
4. It design as easy to understand as possible, developer can work at frontend and backend separately after code generated.
5. It design with concept allow unlimited regenerate without break your codes, schemas can change anytime and the impact should be minimal
6. visualize as much as possible programming design, formula in jsonschemas, reduce burden of software audit and handover. included
  a. schemas
  b. additional api besides CRUD
  c. document status
  d. authorization
  e. formulas of specific fields
  f. data types and validations
7. build in enterprise functionality included:
  a. document numbering [x]
  b. authentication and authorization [x]
  c. data modification audit trail []
  d. SSO [x]
  e. openapi interface [x]
  f. pdf document []
  g. document uploads[]
8. BPMN workflow integration
  a. streamline business flow with BPMN
  b. implement philosophy of bpmn documentation is source code
  c. fill in minimal source code in generated listener to run whole bpmn process
  d. build in integrate between both frontend and backend
  e. declare workflow in jsonschema
9. graphql 

# Documentation
1. [jsonschemas](./docs/jsonschema.md)
2. [backend walk through](./docs/backend.md)
3. [frontend walk through](./docs/frontend.md)
4. [End to End test](./docs/test.md)
5. [BPMN walk through](./docs/bpmn.md)
6. [Language](./doc/language.md)
7. Viewer, with add, update. using event after and properties `paras`
8. Document Status
9. Additional Api & define api schema
10.SimpleAppInputs
11.Role Base Access Control
12.graphql


# Quick start
1. Simpleapp implement database transaction, and require mongodb cluster, below setup 3 nodes
```sh
#create network
docker network create mongoCluster
#prepare node1
docker run -d -p 27017:27017 --name mongo1 --network mongoCluster mongo:6 mongod --replSet myReplicaSet --bind_ip localhost,mongo1
#prepare node2
docker run -d  -p 27018:27017 --name mongo2 --network mongoCluster mongo:6 mongod --replSet myReplicaSet --bind_ip localhost,mongo2
#prepare node3
docker run -d  -p 27019:27017 --name mongo3 --network mongoCluster mongo:6 mongod --replSet myReplicaSet --bind_ip localhost,mongo3


# build cluster
docker exec -it mongo1 mongosh --eval "rs.initiate({
 _id: \"myReplicaSet\",
 members: [
   {_id: 0, host: \"mongo1\"},
   {_id: 1, host: \"mongo2\"},
   {_id: 2, host: \"mongo3\"}
 ]
})"

# set mongod1 high priority as primary server
docker exec -it mongo1 mongosh --eval "cfg = rs.conf()
cfg.members[0].priority = 50
cfg.members[1].priority = 1
cfg.members[2].priority = 1
rs.reconfig(cfg)"

#check cluster status
docker exec -it mongo1 mongosh --eval "rs.status()"

```

** you may need to append below code into your `/etc/hosts`
```
127.0.0.1 mongo1 mongo2 mongo3
```



2. create project folder
```sh
mkdir ~/project1
cd ~/project1
```
3. install latest simpleapp-generator
```sh

npm install -g @simitgroup/simpleapp-generator ts-node
```
4. init project folder, it will create some samples too
```sh
simpleapp-generator -g init
# !important
# Modify value in config.json, it will copy over to both frontend and backend .env
```

5. prepare backend
```sh
./build.sh backend
```
6. update backend configurations file by modify `~/project1/backend/.env`, change mongodb, keycloak settings according your requirements
7. start backend:
```sh
cd ~/project1/backend
pnpm start:dev
```

8. prepare frontend (i use pnpm cause faster)
```sh
./build.sh frontend
```
9. modify frontend configuration by modify `~/project1/frontend/.env`, change keycloak settings
```sh
OAUTH2_BASEURL=https://server-url    #keycloak server url
OAUTH2_CONFIGURL=https://server-url/realms/testingrealm
OAUTH2_REALM=testingrealm
OAUTH2_CLIENTID=client1
OAUTH2_CLIENTSECRET=aaaa-xxxxx-yyyy-zzzzz-www
ADMIN_EMAIL=your@ykeycloakemail.com    #if you have multiple, separate by ','
```
10. start frontend:
```sh
cd ~/project1/frontend
pnpm dev

#or use production way
nuxi build
nuxi preview
```


# Perform Development
1. add some schemas at `~/project1/schemas`
2. then run 
```sh
./build.sh updatebackend
./build.sh updatefrontend
```
3. to add different user group permission, you may change `project1/groups`



# Error Troubleshoot

## Cannot start backend due to `Unable to connect to the database. Retryi...`
1. You may have wrong configuration of mongodb connection string, try use mongodb compass access your clusters using same connection string
2. the mongodb primary node may switch to another host, try restart mongodb container `node2`,`node3` until primary server at `node1`. monitor using 
```sh
docker exec -it mongo1 mongosh --eval "rs.status()"
```


## ERROR  [worker reload] [worker init] Cannot find package 'memory-cache' imported 
1. nuxt seems have some issue, try install this package manually
```sh
cd ~/project1/frontend
pnpm install memory-cache
```