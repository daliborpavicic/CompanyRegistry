(function() {
	"use strict";

	angular
		.module('company-registry.employee')
		.controller('EmployeeController', EmployeeController);

	EmployeeController.$inject = ['$location', 'employee', 'places', 'title'];
	function EmployeeController($location, employee, places, title) {
		var ec = this;

		ec.places = places;
		ec.employee = employee;
		ec.employeeCopy = angular.copy(ec.employee);
		ec.title = title;

		ec.datepicker = {
			minDate: new Date(1900,1,1),
			maxDate: new Date(),
			format: 'fullDate',
			opened: false
		};

		ec.revertChanges = function() {
			ec.employee = angular.copy(ec.employeeCopy);
		};

		ec.save = function() {
			if(!ec.employee._id) {
				ec.employee._id = ec.employee.jmbg;
			}
			ec.employee.$update(success);
		};

		ec.remove = function() {
			ec.employee.$delete(success);
		};

		function success() {
			$location.path('/employee');
		}
	}
})();