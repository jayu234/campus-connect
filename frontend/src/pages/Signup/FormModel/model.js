export default {
  formId: 'signupForm',
  formField: {
    firstName: {
      name: 'firstName',
      label: 'First name *',
      requiredErrorMsg: 'First name is required'
    },
    lastName: {
      name: 'lastName',
      label: 'Last name *',
      requiredErrorMsg: 'Last name is required'
    },
    username: {
      name: 'username',
      label: 'Username *',
      requiredErrorMsg: 'Username is required',
      invalidErrorMsg: 'This username is already taken'
    },
    gender:{
      name: 'gender',
      label: 'Gender *',
      requiredErrorMsg: 'Gender is required.',
    },
    age:{
      name: 'age',
      label: 'Age *',
      requiredErrorMsg: 'Age is required.',
    },
    phone: {
      name: 'phone',
      label: 'Contact no. *',
      requiredErrorMsg: 'Contact no. is required.'
    },
    email: {
      name: 'email',
      label: 'Email *',
      requiredErrorMsg: 'Email is required.'
    },
    password: {
      name: 'password',
      label: 'Password *',
      requiredErrorMsg: 'Password is required',
      invalidErrorMsg: 'Use a strong password with 8+ characters, mixed case letters, numbers, and symbols. Should not include any whitespace.'
    },
    confirmPassword: {
      name: 'confirmPassword',
      label: 'Confirm Password *',
      requiredErrorMsg: 'Please confirm password',
      invalidErrorMsg: 'Incorrect password.'
    },
    college: {
      name: 'college',
      label: 'College name *',
      requiredErrorMsg: 'College name is required',
    },
    course: {
      name: 'course',
      label: 'Course *',
      requiredErrorMsg: 'Course name is required',
    },
    city: {
      name: 'city',
      label: 'City *',
      requiredErrorMsg: 'City is required',
    },
    interests: {
      name: 'interests',
      label: 'Area of interest *',
      requiredErrorMsg: 'Please choose minimum 3 interests.'
    }
  }
};
