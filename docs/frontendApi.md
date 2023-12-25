# API Documentation

*Please note that this is a high-level overview of the froentend customized API.  
For more detailed information, refer to the source code.*  
  
  
_____
# User Store  
plugins/20.simpleapp-userstore.ts

The user store is a Vuex store that holds the user's information. It has the following state:

### Properties
- `_id`: The user's ID.
- `sessionId`: The user's session ID.
- `tenantId`: The user's tenant ID.
- `orgId`: The user's organization ID.
- `branchId`: The user's branch ID.
- `branchRecordId`: The user's branch record ID.
- `branchCode`: The user's branch code.
- `branchName`: The user's branch name.
- `orgRecordId`: The user's organization record ID.
- `orgCode`: The user's organization code.
- `orgName`: The user's organization name.
- `uid`: The user's UID.
- `email`: The user's email.
- `fullName`: The user's full name.
- `roles`: The user's roles.
- `group`: The user's group.
- `branches`: The user's branches.
- `invites`: The user's invites.
- `time`: The user's time.

### Functions

`loadRemoteUserInfo()`: Loads the user's information from the remote server.  
  
`getCurrentXorg()`: Gets the current organization from the route parameters.  
  
`decideInvitation(id, decision)`: Decides on an invitation.  
  
`canPerform(resourcename, action)`: Checks if the user can perform a certain action.  
  
`haveAccess(resourcename)`: Checks if the user has access to a certain resource.  
  
`getUserInfo()`: Gets the user's information.  

*Please note that this is a high-level overview of the froentend customized API.  
For more detailed information, refer to the source code.*  
  
  
_____
# Documents Client / SimpleAppClient

composable docuemmt like `$UserDoc` 
will extends from the base class `SimpleAppClient`, 
it handle CRUD operations and provide some utility funtions.

Documents Client will also include helpers to create structure & default value from `simpleapp/generate/defaults/<DocumentName>.default.ts`.  

### Properties

- `event`: A function for handling events.
- `listen`: A function for listening to events.
- `schema`: The schema of the document.

### Functions

`getDocType()`: Returns the document type.  
  
`getDocName()`: Returns the document name.  
  
`setNew()`: Sets the document as new.  
  
`isNew()`: Checks if the document is new.  
  
`setSchema(schema: SchemaType)`: Sets the document schema.  
  
`getSchema()`: Returns the document schema.  
  
`getErrors()`: Returns the list of errors.  
  
`getData()`: Returns the document data.  
  
`getApi()`: Returns the API object.  
  
`getReactiveData()`: Returns the reactive data of the document.  
  
`reCalculateValue()`: Recalculates the value of the document.  
  
`setData(data: any)`: Sets the document data.  
  
`getById(id: string)`: Fetches a document by its ID.  
  
`create()`: Creates a new document.  
  
`update()`: Updates the document.  
  
`delete(id: string)`: Deletes a document by its ID.  
  
`search(searchbody: SearchBody)`: Searches for documents.  
  
`hook(type: string, data: TData)`: A hook function.  
  
`validateFailed()`: Validates the document and returns any errors.  
  
*Please note that this is a high-level overview of the froentend customized API.  
For more detailed information, refer to the source code.*  
  
  
_____
# Composable 
source : frontend/composables
  
_____
# getDocument.generate
provides functions for handling documents and menus in the application.

### Function 
`getDocument(docname: string)`: Returns an array of document metadata.
  - Parameters: 
      - `docname` (string) - The name of the document.
  - Returns: `DocumentMetaData` objects

_____
# getMenus.generate
This module provides several utility functions for handling documents and menus in the application.

### Functions
`getDocTypes()`: Returns all documents that have a page.
  - Parameters: None
  - Returns: Array of documents

`getAllDocFormats()`: Returns all documents that have a document number.
  - Parameters: None
  - Returns: Array of documents

`getPublicResource(xorg: string)`: Returns a list of public resources as menu data.
  - Parameters: `xorg` (string) - The organization identifier
  - Returns: Array of `MenuData` objects

`getMenus()`: Returns a list of menus that the current user has access to.
  - Parameters: None
  - Returns: Array of `MenuData` objects


  
_____
# getOpenApi.generate

This module provides several utility functions for interacting with the SimpleApp API.

### Properties

- `config` : `o.Configuration` : Holds the configuration for Axios.

### Functions 

`getAxiosConfig()` : 
  - Parameters: None
  - Returns: An Axios configuration object.

`getDocumentApi(apiname: string)`:
  - Parameters: `apiname` (string) - The name of the API.
  - Returns: The API object for the specified document or `undefined` if the API does not exist.

`getAllApi()`:
  - Parameters: None
  - Returns: All the API objects.

`getWorkflowApi()`:
  - Parameters: None
  - Returns: The API object for the workflow.
  
_____
# getTenant.generate

This function is used to get the tenant.

### Functions 

`getTenant()` : 
  - Parameters: None
  - Returns: The tenant `xorg` as a string.
  
_____
# getUserStore.generate

provides functions for interacting with the user store.

### Functions 

`getUserStore()` : 
  - Parameters: None
  - Returns: The user store object.

`reloadUserStore()` : 
  - Parameters: None
  - Returns: Promise<void> - Asynchronously reloads the user store.

`getUserProfile()` : 
  - Parameters: None
  - Returns: The user profile information.

`getCurrentXorg()` : 
  - Parameters: None
  - Returns: The current Xorg.

`getPageBaseUrl(resourcename: string)` : 
  - Parameters: `resourcename` (string) - The name of the resource.
  - Returns: The base URL for the page of the specified resource.

`canPerform(resource: string, action: string)` : 
  - Parameters: 
    - `resource` (string) - The name of the resource.
    - `action` (string) - The action to perform.

_____
# goTo.generate

provides functions for navigation.

### Functions 

`getDocumentUrl(document: string, id?: string, querystr?: string)` : 
  - Parameters: 
    - `document` (string) - The name of the document.
    - `id` (string, optional) - The id of the document.
    - `querystr` (string, optional) - The query string.
  - Returns: The URL for the document.

`goTo(document: string, id?: string, querystr?: string)` : 
  - Parameters: 
    - `document` (string) - The name of the document.
    - `id` (string, optional) - The id of the document.
    - `querystr` (string, optional) - The query string.
  - Returns: None. Navigates to the URL for the document.

`goBranch(branchRecordId: string)` : 
  - Parameters: `branchRecordId` (string) - The record id of the branch.
  - Returns: None. Navigates to the URL for the branch.

_____
# logout.generate

This function is used to log out the user.

### Functions 

`logout()` : 
  - Parameters: None
  - Returns: Promise<void>. Asynchronously logs out the user and optionally redirects to an external path.


# notification.generate

provides function for getting the color associated with a notification status.

### Functions 

`getStatusColor(status: NotificationStatus)` : 
  - Parameters: `status` (NotificationStatus) - The status of the notification.
  - Returns: String. The color associated with the given status.
  
_____
# roles.generate

provides functions for interacting with roles.

### Functions 

`getAllRoles()` : 
  - Parameters: None
  - Returns: Array of all roles.

`getUniqueResource()` : 
  - Parameters: None
  - Returns: Array of unique resources.

`getActionFromResource(resource: string)` : 
  - Parameters: `resource` (string) - The name of the resource.
  - Returns: Array of actions for the specified resource.

`getAllGroups()` : 
  - Parameters: None
  - Returns: Array of all groups.

`getGroupRoles(groupname: string)` : 
  - Parameters: `groupname` (string) - The name of the group.
  - Returns: Array of roles for the specified group.

`getGroupResourcePermission(groupname: string, targetresource: string)` : 
  - Parameters: 
    - `groupname` (string) - The name of the group.
    - `targetresource` (string) - The target resource.
  - Returns: Array of permissions for the specified group and resource.

`canPerformAction(groupname: string, resource: string, actionname: string)` : 
  - Parameters: 
    - `groupname` (string) - The name of the group.
    - `resource` (string) - The name of the resource.
    - `actionname` (string) - The name of the action.
  - Returns: Boolean - Whether the specified group can perform the specified action on the specified resource.
  
_____
# stringHelper.generate

provides functions for string manipulation and conversion.

### Functions 

`camelCaseToWords(s: string)` : 
  - Parameters: `s` (string) - The string in camel case.
  - Returns: String. The input string converted to words.

`md5(s: string)` : 
  - Parameters: `s` (string) - The input string.
  - Returns: String. The MD5 hash of the input string.

`getAvatarLink(email: string, size: number)` : 
  - Parameters: 
    - `email` (string) - The email address.
    - `size` (number) - The size of the avatar.
  - Returns: String. The URL of the avatar.

`toLocalDate(dateiso8601: string)` : 
  - Parameters: `dateiso8601` (string) - The date in ISO 8601 format.
  - Returns: String. The date in local date format.

`t(txt: string, options?: any)` : 
  - Parameters: 
    - `txt` (string) - The text to translate.
    - `options` (any, optional) - The options for translation.
  - Returns: String. The translated text.
  
_____
# themes.generate

provides function for getting the color of the avatar based on the current color mode.

### Functions 

`getAvatarColor()` : 
  - Parameters: None
  - Returns: String. The color of the avatar based on the current color mode.

