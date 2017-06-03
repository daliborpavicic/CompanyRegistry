(function() {
	"use strict";

	angular
		.module('company-registry.place')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.placeList', {
				url: '/place',
				views: {
					'content@': {
						resolve: {
							places: getPlaces
						},
						templateUrl: 'app/components/place/place-list.html',
						controller: 'PlaceListController',
						controllerAs: 'plc'
					}
				}
			})
			.state('main.placeAdd', {
				url: '/place/add',
				views: {
					'content@': {
						resolve: {
							place: createPlace,
							title: addTitle
						},
						templateUrl: 'app/components/place/place.html',
						controller: 'PlaceController',
						controllerAs: 'pc'
					}
				}
			})
			.state('main.placeEdit', {
				url: '/place/:id',
				views: {
					'content@': {
						resolve: {
							place: retrievePlace,
							title: editTitle
						},
						templateUrl: 'app/components/place/place.html',
						controller: 'PlaceController',
						controllerAs: 'pc'
					}
				}
			});

		getPlaces.$inject = ['Place'];
		function getPlaces(Place) {
			return Place.query().$promise;
		}

		createPlace.$inject = ['Place'];
		function createPlace(Place) {
			return new Place();
		}

		function addTitle() {
			return "Add place";
		}

		retrievePlace.$inject = ['$stateParams', 'Place'];
		function retrievePlace($stateParams, Place) {
			return Place.get({id: $stateParams.id}).$promise;
		}

		editTitle.$inject = ['$stateParams'];
		function editTitle($stateParams) {
			return "Edit place with id " + $stateParams.id;
		}
	}
})();