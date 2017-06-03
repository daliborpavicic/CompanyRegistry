(function () {
	angular
		.module('company-registry.shared')
		.factory('deleteModal', deleteModal);

	deleteModal.$inject = ['$uibModal'];
	function deleteModal($uibModal) {

		function openModal(entity) {
			var modalInstance = $uibModal.open({
				animation: true,
				templateUrl: 'app/shared/delete-modal/delete-modal.html',
				controller: 'DeleteModalController',
				controllerAs: 'dmc',				
				resolve: {
					entity: function() {
						return entity;
					}
				}
			});

			function confirmDelete(isConfirmed) {
				return isConfirmed;
			}

			return modalInstance.result.then(confirmDelete);
		}

		return {
			open: openModal
		};
	}
})();