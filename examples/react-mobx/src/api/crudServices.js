import {
  createCrudServiceForCollection,
  COMPANY_COLLECTION,
  EMPLOYEE_COLLECTION,
  PLACE_COLLECTION
} from './crudServiceFactory';

export const PlaceService = createCrudServiceForCollection(PLACE_COLLECTION);

export const CompanyService = createCrudServiceForCollection(COMPANY_COLLECTION);

export const EmployeeService = createCrudServiceForCollection(EMPLOYEE_COLLECTION);