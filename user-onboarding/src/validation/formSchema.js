import * as yup from 'yup';

export default yup.object().shape({
  first_name: yup.string().required('We need your first name for onboarding.'),
  last_name: yup.string().required('We need your last name for onboarding.'),
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Please enter a valid email address.'),
  password: yup
    .string()
    .required()
    .min(7, 'Password must be at least 7 characters long.'),
  terms: yup.boolean().oneOf([true]),
});
