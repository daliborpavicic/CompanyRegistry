(function() {
	"use strict";

	angular
		.module('company-registry.place')
		.controller('PlaceListController', PlaceListController);

	PlaceListController.$inject = ['$location', 'places'];
	function PlaceListController($location, places) {
		//Objekat koji sadrži podatke vezane za straničenje
		var plc = this;
		plc.places = places;

		plc.pagination = {
			currentPage: 1,
			pageSize: 5,
			pages: new Array(Math.ceil(plc.places.length / 5)),
			changePage: function(page) {
				if(plc.pagination.currentPage != page && page > 0 && page <= plc.pagination.pages.length) {
					plc.pagination.currentPage = page;
				}
			}
		};

		plc.tableChanged = function(sortParam) {
			if(plc.sort === sortParam) {
				plc.sortDirection = plc.sortDirection == '+' ? '-' : '+';
			} else {
				plc.sort = sortParam;
				plc.sortDirection = '+';
			}
		};

		plc.edit = function(id) {
			$location.path("/place/"+id);
		};
	}
})();