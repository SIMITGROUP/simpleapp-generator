[1.6.5g]
1. change simpleapp document controller use document name instead of document type
2. allow use header x-apikey(match env X_APIKEY), x-apisecret (match env X_APISECRET), to by pass access token. which will use robotuser in user context
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