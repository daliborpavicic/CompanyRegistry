(function () {
	angular
		.module('company-registry.place.place-modal')
		.controller('PlaceModalController', PlaceModalController);

	PlaceModalController.$inject = ['$uibModalInstance','newPlace'];
	function PlaceModalController($uibModalInstance, newPlace) {
		var pmc = this;

		pmc.ok = ok;
		pmc.cancel = cancel;
		pmc.newPlace = newPlace;

		function ok() {
			$uibModalInstance.close(pmc.newPlace);
		}

		function cancel() {
			$uibModalInstance.dismiss();
		}
	} 
})();