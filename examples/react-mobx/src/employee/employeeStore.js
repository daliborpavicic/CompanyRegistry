import { observable, action } from 'mobx';
import { EmployeeService } from '../api/crudServices';
import { isRequired } from '../common/validators';
import { createForm } from '../common/formHelpers';
import { TableStore } from '../common/TableStore';

const createEmptyEmployee = () => ({
  _id: '',
  jmbg: '',
  name: '',
  surname: '',
  email: '',
  placeOfBirth: '',
});

const columns = [
  {key: 'jmbg', name: 'JMBG'},
  {key: 'name', name: 'Name'},
  {key: 'surname', name: 'Surname'},
  {key: 'email', name: 'Email'},
  {key: 'placeOfBirth', name: 'Place of birth'},
];

export const createEmployeeStore = () => {
  const state = observable({
    employees: observable.shallowArray([]),
    selectedEmployee: null,
    isLoading: false,
    employeeForm: observable.ref(null),
    get isEmployeeSelected() {
      return state.selectedEmployee !== null && state.employeeForm !== null;
    },
  });

  const tableStoreArgs = { columns, initialSort: 'jmbg', dataGetter: () => state.employees };
  const employeesTableStore = new TableStore(tableStoreArgs);

  state.tableStore = employeesTableStore;

  const createEmployeeForm = (employee) => {
    const employeeFormFields = {
      _id: {},
      jmbg: { label: 'JMBG', validators: [isRequired] },
      name: { label: 'Name', validators: [isRequired] },
      surname: { label: 'Surname', validators: [isRequired] },
      email: { label: 'Email', validators: [isRequired] },
      placeOfBirth: { label: 'Place of birth', validators: [isRequired] }
    };

    if(employee._id) {
      employeeFormFields._id.initialValue = employee._id;
    }

    employeeFormFields.jmbg.initialValue = employee.jmbg;
    employeeFormFields.name.initialValue = employee.name;
    employeeFormFields.surname.initialValue = employee.surname;
    employeeFormFields.email.initialValue = employee.email;
    employeeFormFields.placeOfBirth.initialValue = employee.placeOfBirth

    return createForm(employeeFormFields);
  };

  const setEmployees = action((newEmployees) => {
    state.employees.replace(newEmployees);
  });

  const setSelectedEmployee = action((place) => {
    state.selectedEmployee = place;
  });

  const selectEmployeeForEdit = (employee) => {
    setSelectedEmployee(employee);
    state.employeeForm = createEmployeeForm(employee);
  };

  const selectEmployeeForAdd = () => {
    const newEmployee = createEmptyEmployee();
    setSelectedEmployee(newEmployee);
    state.employeeForm = createEmployeeForm(newEmployee);
  };

  const setIsLoading = action((isLoading) => {
    state.isLoading = isLoading;
  });

  const clearSelectedEmployee = action(() => {
    state.selectedEmployee = null;
    state.employeeForm = null;
  });

  const fetchEmployees = action(() => {
    setIsLoading(true);

    EmployeeService.getAllResources().then(action(employees => {
      setEmployees(employees);
      setIsLoading(false);
    }), action(() => {
      setIsLoading(false);
    }))
  });

  const fetchEmployeeById = action((id) => {
    setIsLoading(true);

    EmployeeService.getResourceById(id).then(action(employee => {
      selectEmployeeForEdit(employee);
      setIsLoading(false);
    }), action(() => {
      clearSelectedEmployee();
      setIsLoading(false);
    }));
  });

  const saveSelectedEmployee = () => {
    const employeeFormValues = state.employeeForm.getAllValues();

    if(!employeeFormValues._id) {
      employeeFormValues._id = employeeFormValues.postalCode;
    }

    return EmployeeService.saveOrUpdateResource(employeeFormValues);
  };

  const deleteSelectedEmployee = () => {
    return EmployeeService.deleteResourceWithId(state.selectedEmployee._id);
  };

  const isExistingEmployeeSelected = () => state.isEmployeeSelected && !!state.selectedEmployee._id;

  return {
    state,
    selectEmployeeForAdd,
    fetchEmployees,
    fetchEmployeeById,
    saveSelectedEmployee,
    deleteSelectedEmployee,
    isExistingEmployeeSelected,
  };
};
