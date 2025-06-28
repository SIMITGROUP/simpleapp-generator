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