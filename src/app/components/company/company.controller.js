(function() {
	"use strict";

	angular
		.module('company-registry.company')
		.controller('CompanyController', CompanyController);

	CompanyController.$inject = ['$location', 'company', 'places', 'title'];
	function CompanyController($location, company, places, title) {
		var cc = this;

		cc.places = places;
		cc.company = company;
		cc.companyCopy = angular.copy(cc.company);
		cc.title = title;

		cc.revertChanges = function() {
			cc.company = angular.copy(cc.companyCopy);
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