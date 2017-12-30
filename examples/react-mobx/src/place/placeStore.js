import { observable, action } from 'mobx';
import { PlaceService } from '../api/crudServices';
import { isRequired } from '../common/validators';
import { createForm } from '../common/formHelpers';
import { TableStore } from '../common/TableStore';

const createEmptyPlace = () => ({
  _id: '',
  name: '',
  postalCode: '',
});

const columns = [
  {key: 'postalCode', name: 'Postal Code'},
  {key: 'name', name: 'Name'},
];

export const createPlaceStore = () => {
  const state = observable({
    places: observable.shallowArray([]),
    selectedCompany: null,
    isLoading: false,
    companyForm: observable.ref(null),
    get isCompanySelected() {
      return state.selectedCompany !== null && state.companyForm !== null;
    },
  });

  const tableStoreArgs = { columns, initialSort: 'postalCode', dataGetter: () => state.places };
  const placesTableStore = new TableStore(tableStoreArgs);

  state.tableStore = placesTableStore;

  const createPlaceForm = (place) => {
    const placeFormFields = {
      _id: {},
      postalCode: { label: 'Postal Code', validators: [isRequired] },
      name: { label: 'Name', validators: [isRequired] }
    };

    if(place._id) {
      placeFormFields._id.initialValue = place._id;
    }

    placeFormFields.postalCode.initialValue = place.postalCode;
    placeFormFields.name.initialValue = place.name;

    return createForm(placeFormFields);
  };

  const setPlaces = action((newPlaces) => {
    state.places.replace(newPlaces);
  });

  const setSelectedPlace = action((place) => {
    state.selectedCompany = place;
  });

  const selectPlaceForEdit = (place) => {
    setSelectedPlace(place);
    state.companyForm = createPlaceForm(place);
  };

  const selectPlaceForAdd = () => {
    const newPlace = createEmptyPlace();
    setSelectedPlace(newPlace);
    state.companyForm = createPlaceForm(newPlace);
  };

  const setIsLoading = action((isLoading) => {
    state.isLoading = isLoading;
  });

  const clearSelectedPlace = action(() => {
    state.selectedCompany = null;
    state.companyForm = null;
  });

  const fetchPlaces = action(() => {
    setIsLoading(true);

    PlaceService.getAllResources().then(action(places => {
      setPlaces(places);
      setIsLoading(false);
    }), action(() => {
      setIsLoading(false);
    }))
  });

  const fetchPlaceById = action((id) => {
    setIsLoading(true);

    PlaceService.getResourceById(id).then(action(place => {
      selectPlaceForEdit(place);
      setIsLoading(false);
    }), action(() => {
      clearSelectedPlace();
      setIsLoading(false);
    }));
  });

  const saveSelectedPlace = () => {
    const placeFormValues = state.companyForm.getAllValues();

    if(!placeFormValues._id) {
      placeFormValues._id = placeFormValues.postalCode;
    }

    return PlaceService.saveOrUpdateResource(placeFormValues);
  };

  const deleteSelectedPlace = () => {
    return PlaceService.deleteResourceWithId(state.selectedCompany._id);
  };

  const isExistingPlaceSelected = () => state.isCompanySelected && !!state.selectedCompany._id;

  return {
    state,
    selectPlaceForAdd,
    fetchPlaces,
    fetchPlaceById,
    saveSelectedPlace,
    deleteSelectedPlace,
    isExistingPlaceSelected,
  };
};
