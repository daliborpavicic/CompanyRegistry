(function() {
	"use strict";

	angular
		.module('company-registry.place')
		.controller('PlaceController', PlaceController);

	PlaceController.$inject = ['$location', 'place', 'title', 'deleteModal'];
	function PlaceController($location, place, title, deleteModal) {
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

			var onDeleteConfirmed = function(isConfirmed) {
				if(isConfirmed) {
					pc.place.$delete(success);
				}
			};

			deleteModal.open("place").then(onDeleteConfirmed);
		};

		function success() {
			$location.path('/place');
		}
	}
})();