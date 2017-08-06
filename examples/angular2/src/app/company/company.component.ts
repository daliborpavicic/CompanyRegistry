import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    templateUrl: './company.component.html',
    styles: [`
        em {
            color: #E05C65;
            padding-left: 10px
        }

        .error input {
            background-color: #E3C3C5;
        }
    `]
})

export class CompanyComponent implements OnInit {
    companyForm: FormGroup;
    vatNumber: FormControl;
    companyName: FormControl;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.vatNumber = new FormControl('111', [
            Validators.required,
            Validators.pattern('[0-9].*')
        ]);
        this.companyName = new FormControl('Naovis', [
            Validators.required,
            this.restrictedWords(['foo', 'bar'])
        ]);

        this.companyForm = new FormGroup({
            vatNumber: this.vatNumber,
            companyName: this.companyName
        });
    }

    // Custom validator
    private restrictedWords(words: string[]) {
        return (control: FormControl): {[key: string]: any} => {
            if (!words) {
              return null;
            }

            const invalidWords = words
                .map(word => control.value.includes(word) ? word : null)
                .filter(word => word != null);

            return invalidWords && invalidWords.length > 0
                ? { 'restrictedWords': invalidWords.join(', ') }
                : null;
        };
    }

    saveCompany(formValues) {
        if (this.companyForm.valid) {
            console.log(formValues);
        } else {
            console.log('invalid company form');
        }
    }

    validateVatNumber() {
        return this.vatNumber.valid &&
            this.vatNumber.untouched;
    }

    validateCompanyName() {
        return this.companyName.valid &&
            this.companyName.untouched;
    }

    cancel() {
        this.router.navigate(['/places']);
    }
}
