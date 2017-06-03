(function () {
	angular
		.module('company-registry.shared')
		.controller('NoDeleteModalController', NoDeleteModalController);

	NoDeleteModalController.$inject = ['$uibModalInstance' ,'entity'];
	function NoDeleteModalController($uibModalInstance, entity) {
		var ndmc = this;

		ndmc.entity = entity;
		ndmc.cancel = cancel;

		function cancel() {
			$uibModalInstance.dismiss();
		}
	}
})();