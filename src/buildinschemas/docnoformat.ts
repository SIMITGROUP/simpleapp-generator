import { SchemaType, RESTMethods, IsolationType } from '../type';

export const docnoformat: SchemaType = {
  type: 'object',
  'x-simpleapp-config': {
    isolationType: IsolationType.org,
    documentType: 'docno',
    documentName: 'docnoformat',
    pageType: 'crud',
    uniqueKey: 'docNoFormatNo',
    documentTitle: 'docNoFormatName',
    additionalAutoCompleteFields: ['default'],
    additionalApis: [
      {
        action: 'listDocFormats',
        entryPoint: '/listdocformats/:doctype',
        requiredRole: ['User'],
        responseType: '[Docnoformat]',
        method: RESTMethods.get,
        description: 'get list of document format for 1 doctype'
      }
    ],
    resourceName: 'documentNoFormat'
  },
  properties: {
    _id: { type: 'string' },
    created: { type: 'string' },
    updated: { type: 'string' },
    createdBy: { type: 'string' },
    updatedBy: { type: 'string' },
    tenantId: { type: 'integer', default: 1, minimum: 1 },
    orgId: { type: 'integer', default: 1, minimum: 1 },
    branchId: { type: 'integer', default: 1, minimum: 1 },
    branch: {
      type: 'object',
      'x-foreignkey': 'branch',
      properties: {
        _id: { type: 'string' },
        label: { type: 'string' },
        branchId: { type: 'integer' }
      }
    },
    docNoFormatNo: { type: 'string', examples: ['INV'] },
    docNoFormatName: { type: 'string', examples: ['Invoice Default Format'] },
    active: { type: 'boolean', examples: [true], default: true },
    default: { type: 'boolean', examples: [true], default: true },
    docNoType: { type: 'string', examples: ['SI', 'PI'] },
    docNoPattern: {
      type: 'string',
      examples: ['SI{YYMM}-<000>', 'PI-2023-<0000>'],
      description: '{date} format as ISO8601 symbol'
    },
    nextNumber: { type: 'integer', default: 1 }
  }
};
