export default interface LoginErrorDefinition {
  email?: string | string[];
  password?: string | string[];
  non_field_errors?: string | string[];
  detail?: string | string[];
}
