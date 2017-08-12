import {FormBuilder, FormGroup} from '@angular/forms';
import {Injectable} from '@angular/core';
import {IFormModel} from './form.model';

@Injectable()
export class FormService {
  static validationErrors = [
    {code: 'required', message: 'Field is required'},
    {code: 'email', message: 'Wrong email format'},
    {code: 'restrictedWords', message: 'Input contains restricted words'}
  ];

  form: FormGroup;
  originalEntity: any;
  isEdit: boolean;

  constructor(private _fb: FormBuilder) {
    this.isEdit = false;
  }

  initializeFormGroup(formModel: IFormModel) {
    const groupConfig = formModel.fields.reduce((config, field) => {
      return Object.assign(config, {
        [field.name]: ['', [...field.validators]]
      });
    }, {});

    this.form = this._fb.group(groupConfig);

    return this.form;
  }

  patchValues(newFormValues) {
    Object.keys(this.originalEntity).forEach(propertyName => {
      if (this.form.controls[propertyName]) {
        this.form.controls[propertyName]
          .patchValue(newFormValues[propertyName]);
      }
    });

    this.form.updateValueAndValidity();
  }

  setIsEdit(isEdit: boolean) {
    this.isEdit = isEdit;
  }

  setOriginalEntity(originalData) {
    this.originalEntity = Object.assign({}, originalData);
  }

  updateEntityData(entityData) {
    this.setOriginalEntity(entityData);

    if (entityData._id) {
      this.setIsEdit(true);
      this.patchValues(entityData);
    }
  }

  revertChangesOnEntity() {
    this.patchValues(this.originalEntity);
  }

  isControlValid(controlName) {
    return this.form.controls[controlName].valid;
  }

  isControlTouched(controlName) {
    return this.form.controls[controlName].touched;
  }

  shouldDisplayError(controlName) {
    return !this.isControlValid(controlName) && this.isControlTouched(controlName);
  }

  getErrorMessageForControl(controlName: string) {
    const control = this.form.controls[controlName];

    if (control.invalid) {
      const controlErrors = FormService.validationErrors
        .filter(error => control.hasError(error.code));

      return controlErrors[0].message;
    }

    return '';
  }

  getControlClass(controlName) {
    return {
      'form-group': true,
      'has-error': this.shouldDisplayError(controlName),
    };
  }

  getOriginalEntity() {
    return this.originalEntity;
  }

  getEntityForSubmit() {
    const entity = {
      _id: this.originalEntity._id,
    };

    if (this.form.valid) {
      Object.keys(this.originalEntity).forEach(propertyName => {
        if (this.form.value[propertyName]) {
          entity[propertyName] = this.form.value[propertyName];
        }
      });
    }

    return entity;
  }

  getForm() {
    return this.form;
  }
}
