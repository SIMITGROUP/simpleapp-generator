import { IsolationType, SchemaType } from '../type';

export const customfield: SchemaType = {
  type: 'object',
  'x-simpleapp-config': {
    documentType: 'customfield',
    documentName: 'customfield',
    isolationType: IsolationType.org,
    uniqueKey: 'collectionName',
    documentTitle: 'collectionName'
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
        schema: {
          type: 'string',
          minLength: 2
        }
      }
    }
  }
};
