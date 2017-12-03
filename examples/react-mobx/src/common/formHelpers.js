import PropTypes from 'prop-types';
import { action, observable } from 'mobx';

export const FormFieldShape = {
  name: PropTypes.string,
  label: PropTypes.string,
  initialValue: PropTypes.string,
  validators: PropTypes.arrayOf(PropTypes.func),
};

export function createForm(formFields = {}) {
  const fieldNames = Object.keys(formFields);
  const allFields = fieldNames.reduce((fields, name) => {
    const fieldConfig = formFields[name];
    fieldConfig.name = name;

    const formField = createFormField(fieldConfig);
    fields[name] = formField;

    return fields;
  }, {});

  const state = observable({
    fieldNames,
    fields: observable.ref(allFields),
    get isValid() {
      return this.fieldNames
      .map(name => this.fields[name].isValid())
      .filter(isValid => isValid === false)
        .length === 0;
    },
    get isDirty() {
      return this.fieldNames
      .some(name => this.fields[name].isDirty);
    },
    get fieldValues() {
      return this.fieldNames
      .reduce((dataSet, name) => {
        const formField = this.fields[name];
        dataSet[name] = formField.getValue();

        return dataSet;
      }, {});
    },
  });

  const publicAPI = {
    isValid: () => state.isValid,
    isDirty: () => state.isDirty,
    getFields: () => state.fields,
    getField: fieldName => state.fields[fieldName],
    getFieldValue: fieldName => state.fieldValues[fieldName],
    getAllValues: () => state.fieldValues,

    modifyFields: action('modify fields', (modifierFn, fieldsToModify = state.fieldNames) => {
      if (typeof modifierFn === 'function') {
        fieldsToModify.forEach((fieldName) => {
          const field = state.fields[fieldName];
          modifierFn(field);
        });
      } else {
        throw new Error(`Expected function as first parameter but received ${typeof modifierFn}`);
      }
    }),
    reset: action('reset', () => {
      state.fieldNames.forEach(name => state.fields[name].reset());
    }),
  };

  return publicAPI;
}

export function createFormField({
  name,
  label = '',
  initialValue = '',
  validators = [],
}) {
  const state = observable({
    name: observable.ref(name),
    initialValue,
    value: initialValue,
    initialLabel: label,
    label,
    isTouched: false,
    isEnabled: true,
    validators: observable.ref(validators),
    get errors() {
      return this.validators
      .map(validate => validate(this.value, this))
      .filter(result => typeof result === 'string');
    },
    get isValid() {
      return this.errors.length === 0;
    },
    get isDirty() {
      return this.initialValue !== this.value;
    },
    get hasErrors() {
      return this.errors.length > 0;
    }
  });

  const publicAPI = {
    // region Getters
    isTouched: () => state.isTouched,
    isEnabled: () => state.isEnabled,
    isDisabled: () => !publicAPI.isEnabled(),
    getName: () => state.name,
    getValue: () => state.value,
    getLabel: () => state.label,
    isValid: () => state.isValid,
    isDirty: () => state.isDirty,
    hasErrors: () => state.hasErrors,
    getErrors: () => state.errors,
    // endregion

    // region Actions
    addValidators: action('addValidators', (...validators) => {
      validators.forEach(validator => state.validators.push(validator));
    }),

    setValue: action('setValue', (value) => {
      state.value = value;
      state.isTouched = true;
    }),

    disable: action('disableField', () => {
      state.isEnabled = false;
    }),

    enable: action('enableField', () => {
      state.isEnabled = true;
    }),

    setLabel: action('setLabel', (labelValue) => {
      state.label = labelValue;
    }),

    setInitialValue: action('setInitialValue', (value, reset = true) => {
      state.initialValue = value;

      if (reset) {
        state.value = value;
        state.isTouched = false;
      }
    }),

    reset: action('reset', () => {
      state.value = state.initialValue;
      state.isTouched = false;
      state.label = state.initialLabel;
    })
    // endregion
  };

  return publicAPI;
}
