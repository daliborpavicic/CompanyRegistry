(function() {
	angular
		.module('company-registry.employee')
		.run(run);

	run.$inject = ['$rootScope', '$window'];
	function run($rootScope, $window) {
		//Kad se okine $stateChangeError, što ui-router radi kad dođe do greške, izvrši errorFunction
		$rootScope.$on('$stateChangeError', errorFunction);

		function errorFunction(event, toState, toParams, fromState, fromParams) {
			var error = "An error has occured!\n";
			if(toState.name == "main.employeeEdit") {
				error += "The employee with the JMBG " + toParams.id + " doesn't exist!";
			}
			$window.alert(error);
		}
	}
})();