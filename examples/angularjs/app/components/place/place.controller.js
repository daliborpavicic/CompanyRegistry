(function() {
	"use strict";

	angular
		.module('company-registry.place')
		.controller('PlaceController', PlaceController);

	PlaceController.$inject = ['$location', 'place', 'title', 'deleteModal', 'noDeleteModal', '$q', 'Employee', 'Company'];
	function PlaceController($location, place, title, deleteModal, noDeleteModal, $q, Employee, Company) {
		var pc = this;
			
		pc.place = place;
		pc.placeCopy = angular.copy(pc.place);
		pc.title = title;

		pc.revertChanges = function() {
			pc.place = angular.copy(pc.placeCopy);
		};

		pc.save = function() {
			if(!pc.place._id) {
				pc.place._id = pc.place.postalCode;
			}
			pc.place.$update(success);
		};

		pc.remove = function() {
			var employeePromise = Employee.query().$promise,
				companyPromise = Company.query().$promise;

			$q.all([employeePromise, companyPromise]).then(onSuccessDataLoad);

			function onSuccessDataLoad(data) {
				var canBeDeleted = true,
					employees = data[0],
					companies = data[1];

				if (isPlaceReferencedInEmployees(employees) || 
						isPlaceReferencedInCompanies(companies)) {

					canBeDeleted = false;
				}

				if (canBeDeleted) {
					askForConfirmation();
				} else {
					showNoDeleteWarning();	
				}
			}

			function isPlaceReferencedInEmployees(employees) {
				var isReferenced = false;

				angular.forEach(employees, function(employee) {

					if (employee.placeOfBirth === pc.place.name) {
						isReferenced = true;
						// it should break loop here when reference is found,
						// but angular forEach doesn't support that
					}
				});

				return isReferenced;
			}

			function isPlaceReferencedInCompanies(companies) {
				var isReferenced = false;

				angular.forEach(companies, function(company) {

					if (company.headquarters === pc.place.name) {
						isReferenced = true;
						// it should break loop here when reference is found,
						// but angular forEach doesn't support that
					}
				});

				return isReferenced;
			}

			function askForConfirmation() {

				var onDeleteConfirmed = function(isConfirmed) {
					if(isConfirmed) {
						pc.place.$delete(success);
					}
				};

				deleteModal.open("place").then(onDeleteConfirmed);
			}

			function showNoDeleteWarning() {
				noDeleteModal.open(pc.place.name);
			}
		};

		function success() {
			$location.path('/place');
		}
	}
})();