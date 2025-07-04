import { SchemaType, RESTMethods, IsolationType } from '../type';

export const organization: SchemaType = {
  type: 'object',
  'x-simpleapp-config': {
    isolationType: IsolationType.tenant,
    documentType: 'org',
    documentName: 'organization',
    pageType: 'crud',
    uniqueKey: 'orgCode',
    uniqueKeys: [['orgId']],
    documentTitle: 'orgName',
    additionalAutoCompleteFields: ['orgId'],
    additionalApis: [
      {
        action: 'getlogo',
        entryPoint: 'logo',
        requiredRole: ['User'],
        method: RESTMethods.get,
        responseType: 'String',
        description: 'obtain avatar base64 jpg image'
      },
      {
        action: 'uploadlogo',
        entryPoint: 'logo',
        requiredRole: ['Admin'],
        method: RESTMethods.post,
        schema: 'KeyValue',
        responseType: 'String',
        description: 'post avatar in base64 jpg image'
      }
    ],
    resourceName: 'organization'
  },
  required: ['orgId', 'orgCode', 'orgName'],
  properties: {
    _id: { type: 'string' },
    created: { type: 'string' },
    updated: { type: 'string' },
    createdBy: { type: 'string' },
    updatedBy: { type: 'string' },
    tenantId: { type: 'integer', default: 1, minimum: 1 },
    orgId: { type: 'integer', default: 1, minimum: 1 },
    branchId: { type: 'integer', default: 1, minimum: 0 },
    orgCode: { type: 'string', minLength: 1 },
    orgName: { type: 'string' },
    registrationNo: { type: 'string' },
    active: { type: 'boolean', default: true },
    description: { type: 'string', format: 'text' },
    timeZone: { type: 'string', examples: ['Asia/Kuala_Lumpur'] },
    offsetMinute: { type: 'number', default: 0 },
    currency: { type: 'string', minimum: 3, maximum: 3 },
    country: { type: 'string', minimum: 2, maximum: 2 }
  }
};
