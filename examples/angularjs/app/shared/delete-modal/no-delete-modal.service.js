(function () {
	angular
		.module('company-registry.shared')
		.factory('noDeleteModal', noDeleteModal);

	noDeleteModal.$inject = ['$uibModal'];
	function noDeleteModal($uibModal) {

		function openModal(entity) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/shared/delete-modal/no-delete-modal.html',
				controller: 'NoDeleteModalController',
				controllerAs: 'ndmc',				
				resolve: {
					entity: function() {
						return entity;
					}
				}
			});
		}

		return {
			open: openModal
		};
	}
})();