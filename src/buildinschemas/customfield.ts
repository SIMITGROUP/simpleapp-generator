import { IsolationType, RESTMethods, SchemaType } from '../type';

export const customfield: SchemaType = {
  type: 'object',
  'x-simpleapp-config': {
    documentType: 'customfield',
    documentName: 'customfield',
    isolationType: IsolationType.tenant,
    uniqueKey: 'collectionName',
    documentTitle: 'collectionName',
    pageType: 'pageType',
    resourceName: 'customField'
  },
  properties: {
    _id: { type: 'string' },
    created: { type: 'string' },
    updated: { type: 'string' },
    createdBy: { type: 'string' },
    updatedBy: { type: 'string' },
    tenantId: { type: 'integer', default: 1 },
    orgId: { type: 'integer', default: 1 },
    branchId: { type: 'integer', default: 1 },
    collectionName: {
      type: 'string',
      minLength: 2
    },
    form: {
      type: 'object',
      properties: {
        jsonSchema: {
          type: 'object',
          properties: {}
        }
      }
    },
    list: {
      type: 'object',
      properties: {
        fields: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      }
    }
  }
};
