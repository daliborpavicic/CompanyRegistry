(function() {
	"use strict";

	angular
		.module('company-registry.employee')
		.controller('EmployeeListController', EmployeeListController);

	EmployeeListController.$inject = ['$location', 'employees', 'places'];
	function EmployeeListController($location, employees, places) {
		//Objekat koji sadrži podatke vezane za straničenje
		var elc = this;
		elc.employees = employees;
		elc.places = places;

		elc.pagination = {
			currentPage: 1,
			pageSize: 5,
			pages: new Array(Math.ceil(elc.employees.length / 5)),
			changePage: function(page) {
				if(elc.pagination.currentPage != page && page > 0 && page <= elc.pagination.pages.length) {
					elc.pagination.currentPage = page;
				}
			}
		};

		elc.tableChanged = function(sortParam) {
			if(elc.sort === sortParam) {
				elc.sortDirection = elc.sortDirection == '+' ? '-' : '+';
			} else {
				elc.sort = sortParam;
				elc.sortDirection = '+';
			}
		};

		elc.edit = function(id) {
			$location.path("/employee/"+id);
		};
	}
})();