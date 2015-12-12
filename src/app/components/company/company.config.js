(function() {
	angular
		.module('company-registry.company')
		.run(run);

	run.$inject = ['$rootScope', '$window'];
	function run($rootScope, $window) {
		//Kad se okine $stateChangeError, što ui-router radi kad dođe do greške, izvrši errorFunction
		$rootScope.$on('$stateChangeError', errorFunction);

		function errorFunction(event, toState, toParams, fromState, fromParams) {
			var error = "An error has occured!\n";
			//+= je kao da smo napisali error = error + string
			if(toState.name == "main.companyEdit") {
				error += "The company with the PIB " + toParams.id + " doesn't exist!";
			}
			$window.alert(error);
		}
	}
})();