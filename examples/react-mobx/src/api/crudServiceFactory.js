import { deleteResource, getResource, postJson, putJson } from '../utils/http';
import { BASE_URL, withApiKey } from './mongoApi';

export const PLACE_COLLECTION = 'places';
export const EMPLOYEE_COLLECTION = 'employees';
export const COMPANY_COLLECTION = 'companies';

const validCollections = [PLACE_COLLECTION, EMPLOYEE_COLLECTION, COMPANY_COLLECTION];

const isInvalidCollection = collection => validCollections.indexOf(collection) === -1;

export function createCrudServiceForCollection(collection = '') {
  if(isInvalidCollection(collection)) {
    throw new Error(`Invalid collection '${collection}'`);
  }

  const collectionUrl = `${BASE_URL}/${collection}`;

  const getAllResources = () => getResource(withApiKey(collectionUrl));

  const getResourceById = id => getResource(withApiKey(`${collectionUrl}/${id}`));

  const saveOrUpdateResource = (resource = {}) => {
    if(resource._id) {
      return putJson(withApiKey(`${collectionUrl}/${resource._id}`), resource);
    } else {
      return postJson(withApiKey(collectionUrl), resource);
    }
  };

  const deleteResourceWithId = id => deleteResource(withApiKey(`${collectionUrl}/${id}`));

  return {
    getAllResources,
    getResourceById,
    saveOrUpdateResource,
    deleteResourceWithId
  };
};