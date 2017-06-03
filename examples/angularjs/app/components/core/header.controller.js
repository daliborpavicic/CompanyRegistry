(function () {
	angular
		.module('company-registry.core')
		.controller('HeaderController', HeaderController);

	HeaderController.$inject = ['$translate', 'tmhDynamicLocale', 'crTranslations'];
	function HeaderController($translate, tmhDynamicLocale, crTranslations) {
		var hc = this;

		hc.isLanguageDropdownOpen = false;

		hc.currentLanguage = crTranslations[$translate.use()].LANGUAGE;
		hc.changeLocale = changeLocale;

		function changeLocale(locale) {
			$translate.use(locale);
			tmhDynamicLocale.set(locale);
			hc.currentLanguage = crTranslations[locale].LANGUAGE;
		}
	} 
})();
