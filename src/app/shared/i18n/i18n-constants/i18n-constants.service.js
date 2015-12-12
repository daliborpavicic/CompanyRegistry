(function() {
	"use strict";
	
	var crTranslations = {
		"en": {
			"COMMON": {
				"SAVE":"Save",
				"REVERT":"Revert",
				"DELETE":"Delete",
				"BACK":"Back"
			},

			"EMPLOYEE": {
				"LIST":"Employee list",
				"JMBG":"Jmbg",
				"NAME":"Name",
				"SURNAME":"Surname",
				"EMAIL":"E-mail",
				"PLACEOFBIRTH":"Place of birth",
				"DATEOFBIRTH":"Date of birth",
				"NEW":"Add new employee",

				"ADD":"Add employee",
				"EDIT":"Edit employee with id "
			},
			"LANGUAGE": "English"
		},
		"sr-latn": {
			"COMMON": {
				"SAVE":"Sačuvaj",
				"REVERT":"Poništi",
				"DELETE":"Obriši",
				"BACK":"Povratak"
			},

			"EMPLOYEE": {
				"LIST":"Lista zaposlenih",
				"JMBG":"Jmbg",
				"NAME":"Ime",
				"SURNAME":"Prezime",
				"EMAIL":"E-mail",
				"PLACEOFBIRTH":"Mesto rođenja",
				"DATEOFBIRTH":"Datum rođenja",
				"NEW":"Dodaj novog zaposlenog",

				"ADD":"Dodaj zaposlenog",
				"EDIT":"Izmeni zaposlenog sa id-om "
			},
			"LANGUAGE": "Srpski"
		},
	};

	angular
		.module('company-registry.i18n.constants')
		.constant("crTranslations", crTranslations);
})();