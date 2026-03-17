[2.0.2u-alpha]

1. Enforced strict Keycloak token validation on backend (via AuthGuard + UserContext), returning clear 401 for invalid/expired tokens
2. Blocked user creation when required JWT claims are missing (e.g. uid, email)
3. Improved frontend session handling: refresh-token failures and consistently redirect to login on 401

[2.0.2t-alpha]

1. Fix define type on service file

[2.0.2s-alpha]

1. Reduce expired-token issues
2. Define type on service for readonly

[2.0.2r-alpha]

1. Fix define types on controller fulltextsearch and setStatus
2. Define paramType on json to update define type on service file

[2.0.2q-alpha]

1. Added 'schema' on the TypeScript type

[2.0.2p-alpha]

1. Added explicit return types in generated controller endpoints to improve TypeScript type safety and resolve ESLint `no-unsafe-return` warnings

[2.0.2o-alpha]

1. Revert date.generate.ts for universal use
2. Adjust SimpleAppInput add paras on autocomplete

[2.0.2n-alpha]

1. Fix generated code eslint error

[2.0.2m-alpha]

1. Change date format follow DD/MM/YYYY instead of user laptop
2. Define isBillingUser, isInternalUser and isDevSupport for easy to called role
3. Add escapeRegExp for search student list

[2.0.2l-alpha]

1. Add direct debit mini api scope

[2.0.2k-alpha]

1. add permission devbilling can access tenant invoice page
2. add permission devsupport can access tenant page
3. update profile tenant for user friendly when create tenant

[2.0.2i-alpha]

1. fix bugs cannot run backend
2. fix default search page size to 500

[2.0.2i-alpha]

1. added error handling event for create,update,delete,setStatus
2. improve saga document number generator check max 10 number ahead base on target document's unique key (with data isolation)


[2.0.2g-alpha]

1. fix search no header return pagination


[2.0.2f-alpha]

1. fix mini-app search condition



[2.0.2e-alpha]

1. fix wrong datatype in miniapp search


[2.0.2d-alpha]

1. fix pagination issue


[2.0.2c-alpha]

1. support environment variable off mongodb transaction
2. add /health check endpoint which no need credentials
3. add still buggy pagination setting

[2.0.2b-alpha]

1. fix generate no bugs

[2.0.2a-alpha]

1. interceptor set await close session
2. allow use env variable skip session in document numbering generator
3. some partial type improvement
4. fix some document no format


[2.0.1z-alpha]

1. Handle whitelist confirm and void api

[2.0.1y-alpha]

1. Handle whitelist confirm and void api

[2.0.1x-alpha]

1. disable system cron auto run
2. fix search text syntax mess up

[2.0.1w-alpha]

1. touch up abit debugger in simple-app.service
2. add default queue job option code

[2.0.1v-alpha]

1. Cron add debugger
2. Add remote selection

[2.0.1u-alpha]

1. Allow array string custom field to set input type
2. Fix multi select input size diff

[2.0.1t-alpha]

1. add more field into queue for track execution time

[2.0.1s-alpha]

1. Fix cron set xorg failed. undefined-undefined-undefined
2. Fix findInstalledMiniAppCode

[2.0.1r-alpha]

1. Add findIdThenUnsetField

[2.0.1q-alpha]

1. fixagain delete record cant work in transactions, sharded env

[2.0.1p-alpha]

1. fix delete record cant work in transactions, sharded env

[2.0.1o-alpha]

1. fetch branch image url, and fix maintenance mode data

[2.0.1n-alpha]

1. Add debug for invalid xorg

[2.0.1m-alpha]

1. remove s from environment collection name
2. return maintenanceMessage when system under maintenance
3. fix maintenanceMode cannot set in api

[2.0.1l-alpha]

1. documentevent collection remove 's'

[2.0.1k-alpha]

1. apilog and documentevent collection remove 's'

[2.0.1j-alpha]

1. Fix documentnoformat x-foreign-key

[2.0.1i-alpha]

1. Add org for user info

[2.0.1h-alpha]

1. Set robot user auto capture organization country, currency, timezone

[2.0.1g-alpha]

1. Fix mini app cannot publish

[2.0.1f-alpha]

1. Update image
2. Remove useless docnoformat file
3. Update profile page metadata
4. Fix redirect page

[2.0.1e-alpha]

5. Fix developer portal cannot create app

[2.0.1d-alpha]

1. Compulsory index tenantId for mongodb sharding

[2.0.1c-alpha]

1. Reopen searchWithRelation code

[2.0.1b-alpha]

1. Update menu permission

[2.0.1a-alpha]

1. Add allow clipboard-write for mini app iframe

[2.0.0z-alpha]

1. add more roles like support, billings
2. environment allow add more type of users
3. user context can obtain environment collection value
4. make frontend midleware changable, and support new license, permission strategy
5. improve frontend userstore get xorg method

[2.0.0y-alpha]

1. Allow mini app adjust built in schema

[2.0.0x-alpha]

1. Fix patch many
2. Fix undefined status error
3. Update JS SDK add type

[2.0.0w-alpha]

1. Update api scope
2. Update search with relation

[2.0.0v-alpha]

1. frontend print toolbar control print button permission
2. fix generate form use wrong file name

[2.0.0t-alpha]

1. Fix Developer Portal
2. Add Search With Relation
3. Fix Upload Photo

[2.0.0t-alpha]

1. Fix maintenance cannot execute update script

[2.0.0r-alpha]

1. Fix Developer Portal

[2.0.0q-alpha]

1. Fixed ts log version

[2.0.0p-alpha]

1. Test

[2.0.0p-alpha]

1. auto add imageUrl for those schema have uploadPhoto

[2.0.0o-alpha]

1. Fix create many bugs
2. support request multiple number

[2.0.0n-alpha]

1. fix bugs on declare generator version
2. show generator version on swagger ui

[2.0.0m-alpha]

1. support before/after patch resource
2. fix auto increament bugs cause cannot create branch and tenant
3. tiny improvement on variable name
4. plenty of misc enhancement and bug fix

[2.0.0l-alpha]

1. switch organization/branch no reload mini-app bugs

[2.0.0k-alpha]

1. change .core/.resources become \_core/\_resources to prevent vscode cant index

[2.0.0j-alpha]

1. fix webhook no trigger

[2.0.0i-alpha]

1. fix some document no print api available

[2.0.0h-alpha]

1. add software license config folder

[2.0.0g-alpha]

1. fix create many no await cause transaction error

[2.0.0f-alpha]

1. add back document no and webhook

[2.0.0e-alpha]

1. add fix frontend ImageAvatar/ImageOrg template and add suitable refresh event.use bunny as image storage
2. profile allow upload images
3. prepare a place to access all jsonschemas
4.

[2.0.0d-alpha]

1. provide tenantInfo, orgInfo, branchInfo to frontend

[2.0.0c-alpha]

1. fix profile session keeping error

[2.0.0b-alpha]

1. fix audit trail
2. add patch many api
3. fix webhook

[2.0.0a-alpha]

1. big restructure of files and folders

[1.6.7o-alpha]

1. exclude findIdThenPatch to execute beforeUpdate and afterUpdate

[1.6.7m-alpha]

1. insert many bug fix

[1.6.7l-alpha]

1. insert many support transaction

[1.6.7k-alpha]

1. Add More Setter For User Context
2. Fix createManyWithId No Use Session

[1.6.7j-alpha]

1. Add Custom Field Constant File For Mini Api
2. Update Scope Constant File
3. Implement read/write split. for read data mongoose preferable go secondary server, which hope can reduce primary server load

[1.6.7i-alpha]

1. Restructure Mini App
2. Support Mini Api Access
3. Validate Mini App Scope

[1.6.7h-alpha]

1. Remove Navigate To Mobile Url
2. Add Label Value Type

[1.6.7g-alpha]

1. fix some api schema cause cannot run backend

[1.6.7f-alpha]

1. Allow Mini App Filter, Sort, And Select Field When Call Resource List Function

[1.6.7e-alpha]

1. Add Current Navigation For Mini App JS SDK
2. Fix Webhook Log Resource Name No Follow Naming Rule

[1.6.7d-alpha]

1. Change Table Remove Button Color

[1.6.7c-alpha]

1. Add Require Plan For Mini App

[1.6.7b-alpha]

1. Fix Missing Import

[1.6.7a-alpha]

1. Add Mini App
2. Add Custom Field
3. Restructure Mini App Bridge Folder
4. Make Custom Field View Input Can Show Table
5. Change Mini App Page Setting Key

[1.6.6z-alpha]

1. Add dataId in webhooklog

[1.6.6w-alpha]

1. Beautify webhooklog body histories

[1.6.6v-alpha]

1. Fix webhook no store logs, and add api to obtain webhook execution histories

[1.6.6u-alpha]

1. Fix repo crash

[1.6.6s-alpha]

1. Fix wrong typo cause backend middleware build error

[1.6.6r-alpha]

1. Make webhook working

[1.6.6o-alpha]

1. Fix Auto Complete Type

[1.6.6n-alpha]

1. Add Custom Field
2. Add Plugin

[1.6.6m-alpha]

1. Update Gitignore

[1.6.6l-alpha]

1. Change additional module

[1.6.6k-alpha]

1. Tmp dirty fix for Simtrain

[1.6.6j-alpha]

1. Webhook add field "body", which will render using mustache engine and send out (instead if send current data)

[1.6.6i-alpha]

1. Fix a-api-key env.

[1.6.6h-alpha]

1. Fix package.json

[1.6.6g-alpha]

1. improve x-api-key & x-api-secret, fix schema example
2. Fix getAvatarByUid.

[1.6.6f-alpha]

1. Remove unwanted required

[1.6.6e-alpha]

1. Fix jsonpath import method

[1.6.6d-alpha]

1. fix new project cannot run

[1.6.6c-alpha]

1. fix plenty of frontend lib generate bugs (after change api name)
2. fix search lookup long

[1.6.6b-alpha]

1. add missing customkeycloak guard

[1.6.6a-alpha]

1. fix simpleapp generated frontend lib bugs

[1.6.5g]

1. change simpleapp document controller use document name instead of document type
2. allow use header x-api-key(match env X_API_KEY), x-api-secret (match env X_API_SECRET), to by pass access token. which will use robotuser in user context
3. add support of x-guest-accesstoken (submit by external user source, like parent/student app), it store into usercontext as guestinfo, since appuser = robotuser
4. Fix document search properties to restrict (required field and sorts)

[1.6.5f]

1. added webhook db
2. support audit trail
3. support upload avatar to cloudapi
4. added html input for simpleapp

[1.2.0]

1. lot of house keeping
2. frontend more stable login using keycloak
3. reduce too much console log at backend
4. build frontend/lang/df.ts instead of directly edit
5. some improvement of simpleappinput, like add more probs and reduce console error
6. simplified generated frontend page by using centralize tool bar
7. support document status
8. give frontend freedom to edit header bar and menu bar

[1.1.24]

1. fix cannot create tenant due to fullname miss-spell
2. fix viewer create record auto redirect
3. allow listview have more flexible usecase
4. allow user.json template use lose isolation
5. remove dependency of @nuxt/ui
6. swagger ui add more xorg sample string
