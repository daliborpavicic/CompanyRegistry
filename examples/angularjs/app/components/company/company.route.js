(function() {
	"use strict";

	angular
		.module('company-registry.company')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.companyList', {
				url: '/company',
				views: {
					'content@': {
						resolve: {
							companies: getCompanies
						},
						templateUrl: 'app/components/company/company-list.html',
						controller: 'CompanyListController',
						controllerAs: 'clc'
					}
				}
			})
			.state('main.companyAdd', {
				url: '/company/add',
				views: {
					'content@': {
						resolve: {
							company: createCompany,
							places: getPlaces,
							title: addTitle
						},
						templateUrl: 'app/components/company/company.html',
						controller: 'CompanyController',
						controllerAs: 'cc'
					}
				}
			})
			.state('main.companyEdit', {
				url: '/company/:id',
				views: {
					'content@': {
						resolve: {
							company: retrieveCompany,
							places: getPlaces,
							title: editTitle
						},
						templateUrl: 'app/components/company/company.html',
						controller: 'CompanyController',
						controllerAs: 'cc'
					}
				}
			});

		getCompanies.$inject = ['Company'];
		function getCompanies(Company) {
			return Company.query().$promise;
		}

		getPlaces.$inject = ['Place'];
		function getPlaces(Place) {
			return Place.query().$promise;
		}

		createCompany.$inject = ['Company'];
		function createCompany(Company) {
			return new Company();
		}

		function addTitle() {
			return "Add company";
		}

		retrieveCompany.$inject = ['$stateParams', 'Company'];
		function retrieveCompany($stateParams, Company) {
			return Company.get({id: $stateParams.id}).$promise;
		}

		editTitle.$inject = ['$stateParams'];
		function editTitle($stateParams) {
			return "Edit company with id " + $stateParams.id;
		}
	}
})();