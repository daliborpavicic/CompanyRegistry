import {FieldModel} from './form-field.model';

export interface IFormModel {
  formName: string;
  fields: Array<FieldModel>;
}
