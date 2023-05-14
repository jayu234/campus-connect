export default {
  formId: 'editProfileForm',
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
    oldPassword: {
      name: 'oldPassword',
      label: 'Old Password *',
      requiredErrorMsg: 'Old Password is required',
      invalidErrorMsg: 'Use a strong password with 8+ characters, mixed case letters, numbers, and symbols. Should not include any whitespace.'
    },
    newPassword: {
      name: 'newPassword',
      label: 'New Password *',
      requiredErrorMsg: 'New Password is required',
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
    skills: {
      name: 'siklls',
      label: 'SKills *',
    },
    links: {
      name: 'links',
      label: 'Links *',
    }
  }
};
