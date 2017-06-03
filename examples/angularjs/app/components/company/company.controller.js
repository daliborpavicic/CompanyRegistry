(function() {
	"use strict";

	angular
		.module('company-registry.company')
		.controller('CompanyController', CompanyController);

	CompanyController.$inject = ['$location', 'company', 'places', 'title', 'placeModal'];
	function CompanyController($location, company, places, title, placeModal) {
		var cc = this;

		cc.places = places;
		cc.company = company;
		cc.companyCopy = angular.copy(cc.company);
		cc.title = title;

		cc.revertChanges = function() {
			cc.company = angular.copy(cc.companyCopy);
		};

		cc.openModal = function () {

			var onUpdateSuccess = function(data) {
				// when database update succedds, 
				// update view model also
				cc.places.push(data);
				cc.company.headquarters = data.name;
			};

			placeModal.open().then(onUpdateSuccess);
		};

		cc.save = function() {
			if(!cc.company._id) {
				cc.company._id = cc.company.pib;
			}
			cc.company.$update(success);
		};

		cc.remove = function() {
			cc.company.$delete(success);
		};

		function success() {
			$location.path('/company');
		}
	}
})();