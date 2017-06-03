(function () {
	angular
		.module('company-registry.shared')
		.controller('DeleteModalController', DeleteModalController);

	DeleteModalController.$inject = ['$uibModalInstance' ,'entity'];
	function DeleteModalController($uibModalInstance, entity) {
		var dmc = this;

		dmc.entity = entity;
		dmc.yes = yes;
		dmc.cancel = cancel;

		function yes() {
			var isDeleteConfirmed = true;
			$uibModalInstance.close(isDeleteConfirmed);
		}

		function cancel() {
			$uibModalInstance.dismiss();
		}
	}
})();