
const isEmpty = value => (
  typeof value === 'undefined' ||
  value === null ||
  value === ''
);

export function isRequired(value) {
  return isEmpty(value)
    ? 'Please enter a value'
    : null;
}

export function isEmail(value) {
  return String(value).indexOf('@') <= 0
    ? 'Invalid email format'
    : null;
}