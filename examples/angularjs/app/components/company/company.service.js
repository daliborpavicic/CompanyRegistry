(function() {
	"use strict";

	angular
		.module('company-registry.company')
		.factory('Company', Company);

	Company.$inject = ['$resource'];
	function Company($resource) {
		var apiKey = "ibGX1jtg9reXu0NcrrLwLuv5jpiUULnw";
		var dbName = "angulardb";
		var collectionName = "companies";
		return $resource("https://api.mongolab.com/api/1/databases/:dbName/collections/:collectionName/:id",
			{apiKey: apiKey, id: "@_id", dbName: dbName, collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();