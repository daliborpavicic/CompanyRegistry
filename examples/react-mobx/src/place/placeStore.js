import { observable, action } from 'mobx';
import { PlaceService } from '../api/crudServices';

export const createPlaceStore = () => {
  const state = observable({
    places: observable.shallowArray([]),
    selectedPlace: null,
    isLoading: false,
  });

  const setPlaces = action((newPlaces) => {
    state.places.replace(newPlaces);
  });

  const setSelectedPlace = action((place) => {
    state.selectedPlace = place;
  });

  const setIsLoading = action((isLoading) => {
    state.isLoading = isLoading;
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
      setSelectedPlace(place);
      setIsLoading(false);
    }), action(() => {
      setIsLoading(false);
    }));
  });

  return {
    state,
    setPlaces,
    setSelectedPlace,
    fetchPlaces,
    fetchPlaceById,
  };
};
