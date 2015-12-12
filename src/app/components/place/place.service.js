(function() {
	"use strict";

	angular
		.module('company-registry.place')
		.factory('Place', Place);

	Place.$inject = ['$resource'];
	function Place($resource) {
		var apiKey = "ibGX1jtg9reXu0NcrrLwLuv5jpiUULnw";
		var dbName = "angulardb";
		var collectionName = "places";
		return $resource("https://api.mongolab.com/api/1/databases/:dbName/collections/:collectionName/:id",
			{apiKey: apiKey, id: "@_id", dbName: dbName, collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();