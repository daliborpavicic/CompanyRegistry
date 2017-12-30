import { observable, action } from 'mobx';
import { CompanyService } from '../api/crudServices';
import { isRequired } from '../common/validators';
import { createForm } from '../common/formHelpers';
import { TableStore } from '../common/TableStore';

const createEmptyCompany = () => ({
  _id: '',
  pib: '',
  name: '',
  phoneNumber: '',
  email: '',
});

const columns = [
  {key: 'pib', name: 'PIB'},
  {key: 'name', name: 'Name'},
  {key: 'phoneNumber', name: 'Phone Number'},
  {key: 'email', name: 'Email'},
];

export const createCompanyStore = () => {
  const state = observable({
    companies: observable.shallowArray([]),
    selectedCompany: null,
    isLoading: false,
    companyForm: observable.ref(null),
    get isCompanySelected() {
      return state.selectedCompany !== null && state.companyForm !== null;
    },
  });

  const tableStoreArgs = { columns, initialSort: 'pib', dataGetter: () => state.companies };
  const companiesTableStore = new TableStore(tableStoreArgs);

  state.tableStore = companiesTableStore;

  const createCompanyForm = (company) => {
    const companyFormFields = {
      _id: {},
      pib: { label: 'PIB', validators: [isRequired] },
      name: { label: 'Name', validators: [isRequired] },
      phoneNumber: { label: 'Phone Number', validators: [isRequired] },
      email: { label: 'Email', validators: [isRequired] }
    };

    if(company._id) {
      companyFormFields._id.initialValue = company._id;
    }

    companyFormFields.pib.initialValue = company.pib;
    companyFormFields.name.initialValue = company.name;
    companyFormFields.phoneNumber.initialValue = company.phoneNumber;
    companyFormFields.email.initialValue = company.email;

    return createForm(companyFormFields);
  };

  const setCompanies = action((newCompanies) => {
    state.companies.replace(newCompanies);
  });

  const setSelectedCompany = action((place) => {
    state.selectedCompany = place;
  });

  const selectCompanyForEdit = (company) => {
    setSelectedCompany(company);
    state.companyForm = createCompanyForm(company);
  };

  const selectCompanyForAdd = () => {
    const newCompany = createEmptyCompany();
    setSelectedCompany(newCompany);
    state.companyForm = createCompanyForm(newCompany);
  };

  const setIsLoading = action((isLoading) => {
    state.isLoading = isLoading;
  });

  const clearSelectedCompany = action(() => {
    state.selectedCompany = null;
    state.companyForm = null;
  });

  const fetchCompanies = action(() => {
    setIsLoading(true);

    CompanyService.getAllResources().then(action(companies => {
      setCompanies(companies);
      setIsLoading(false);
    }), action(() => {
      setIsLoading(false);
    }))
  });

  const fetchCompanyById = action((id) => {
    setIsLoading(true);

    CompanyService.getResourceById(id).then(action(company => {
      selectCompanyForEdit(company);
      setIsLoading(false);
    }), action(() => {
      clearSelectedCompany();
      setIsLoading(false);
    }));
  });

  const saveSelectedCompany = () => {
    const companyFormValues = state.companyForm.getAllValues();

    if(!companyFormValues._id) {
      companyFormValues._id = companyFormValues.postalCode;
    }

    return CompanyService.saveOrUpdateResource(companyFormValues);
  };

  const deleteSelectedCompany = () => {
    return CompanyService.deleteResourceWithId(state.selectedCompany._id);
  };

  const isExistingCompanySelected = () => state.isCompanySelected && !!state.selectedCompany._id;

  return {
    state,
    selectCompanyForAdd,
    fetchCompanies,
    fetchCompanyById,
    saveSelectedCompany,
    deleteSelectedCompany,
    isExistingCompanySelected,
  };
};
