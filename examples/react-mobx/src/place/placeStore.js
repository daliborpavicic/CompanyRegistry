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
    selectedPlace: null,
    isLoading: false,
    placeForm: observable.ref(null),
    get isPlaceSelected() {
      return state.selectedPlace !== null && state.placeForm !== null;
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
    state.selectedPlace = place;
  });

  const selectPlaceForEdit = (place) => {
    setSelectedPlace(place);
    state.placeForm = createPlaceForm(place);
  };

  const selectPlaceForAdd = () => {
    const newPlace = createEmptyPlace();
    setSelectedPlace(newPlace);
    state.placeForm = createPlaceForm(newPlace);
  };

  const setIsLoading = action((isLoading) => {
    state.isLoading = isLoading;
  });

  const clearSelectedPlace = action(() => {
    state.selectedPlace = null;
    state.placeForm = null;
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
    const placeFormValues = state.placeForm.getAllValues();

    if(!placeFormValues._id) {
      placeFormValues._id = placeFormValues.postalCode;
    }

    return PlaceService.saveOrUpdateResource(placeFormValues);
  };

  const deleteSelectedPlace = () => {
    return PlaceService.deleteResourceWithId(state.selectedPlace._id);
  };

  const revertFormChanges = () => {
    state.placeForm.reset();
  };

  const isExistingPlaceSelected = () => state.isPlaceSelected && !!state.selectedPlace._id;

  return {
    state,
    selectPlaceForAdd,
    fetchPlaces,
    fetchPlaceById,
    saveSelectedPlace,
    deleteSelectedPlace,
    revertFormChanges,
    isExistingPlaceSelected,
  };
};
