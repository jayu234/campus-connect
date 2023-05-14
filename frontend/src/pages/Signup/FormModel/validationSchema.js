import * as Yup from 'yup';
import moment from 'moment';
import model from './model';
const {
  formField: {
    firstName,
    lastName,
    username,
    gender,
    age,
    phone,
    email,
    city,
    password,
    confirmPassword,
    college,
    course,
    interests
  }
} = model;

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const pwdRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?!.*\s).{8,}$/
const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(`${lastName.requiredErrorMsg}`),
    [username.name]: Yup.string().min(3, 'Too Short!').max(15, 'Too Long!').required(`${username.requiredErrorMsg}`),
    [gender.name]: Yup.string().required(`${gender.requiredErrorMsg}`),
    [age.name]: Yup.number().positive("Invalid age").integer("Invalid age").moreThan(14, "Invalid age. Age should be between 15 and 30").lessThan(31, "Invalid age. Age should be between 15 and 30").required(`${age.requiredErrorMsg}`).typeError("Invalid age"),
    
  }),
  Yup.object().shape({
    [phone.name]: Yup.string().length(10, 'Invalid contanct no.').matches(phoneRegExp, 'Invalid contanct no.').required(`${phone.requiredErrorMsg}`),
    [email.name]: Yup.string().matches(emailRegExp, 'Invalid email').required(`${email.requiredErrorMsg}`),
    [password.name]: Yup.string().matches(pwdRegExp, password.invalidErrorMsg).required(`${password.requiredErrorMsg}`),
    [confirmPassword.name]: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.').required(`${confirmPassword.requiredErrorMsg}`)
  }),
  Yup.object().shape({
    [college.name]: Yup.string().required(`${college.requiredErrorMsg}`),
    [course.name]: Yup.string().required(`${course.requiredErrorMsg}`),
    [city.name]: Yup.object().required(`${city.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [interests.name]: Yup.array().of(Yup.object()).min(3, interests.requiredErrorMsg).required(`${interests.requiredErrorMsg}`)
  })
];
