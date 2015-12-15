(function () {
	angular
		.module('company-registry.place.place-modal')
		.factory('placeModal', placeModalService);

	placeModalService.$inject = ['$uibModal', 'Place'];
	function placeModalService($uibModal, Place) {

		function openPlaceModal() {

			var modalInstance = $uibModal.open({
				// animation: true,
				templateUrl: 'app/components/place/place-modal/place-modal.html',
				controller: 'PlaceModalController',
				controllerAs: 'pmc',
				resolve: {
					newPlace: function () {
						return new Place();
					}
				}
		    });

			// this function is called when dialog is closed with ok button
			// and data from the dialog are passed as parameter
		    function onModalClose(newPlace) {
		    	debugger;
		    	newPlace._id = newPlace.postalCode;

			    function onUpdateSuccess(data) {
			    	return data;
			    }

		    	return newPlace.$update(onUpdateSuccess);
		    }

			//kad se vrati izvršavanje se nastavlja u kontroleru, npr. employee/employee.controller.js linija 26
		    return modalInstance.result.then(onModalClose);
		}

		return {
			open: openPlaceModal
		};
	}
})();