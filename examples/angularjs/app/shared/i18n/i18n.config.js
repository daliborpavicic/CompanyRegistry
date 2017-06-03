(function() {
	"use strict";
	
	angular
		.module('company-registry.i18n')
		.config(config);

	config.$inject = ['$translateProvider', 'tmhDynamicLocaleProvider', 'crTranslations'];
	function config($translateProvider, tmhDynamicLocaleProvider, crTranslations) {
		tmhDynamicLocaleProvider.localeLocationPattern("assets/js/angular-i18n/angular-locale_{{locale}}.js");
		tmhDynamicLocaleProvider.defaultLocale('en');

		//na ključ "ime jezika" postavljamo objekat prevoda
		$translateProvider.translations('sr-latn', crTranslations["sr-latn"]);
		$translateProvider.translations('en', crTranslations.en);
		$translateProvider.preferredLanguage('en');

		$translateProvider.useSanitizeValueStrategy('escape'); // improve security
	}
})();