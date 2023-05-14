import * as Yup from 'yup';
import model from './model';
const {
  formField: {
    firstName,
    lastName,
    gender,
    age,
    city,
    oldPassword,
    newPassword,
    confirmPassword,
    college,
    course,
    skills,
    links
  }
} = model;

const pwdRegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?!.*\s).{8,}$/

export default [
  Yup.object().shape({
    [firstName.name]: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required(`${lastName.requiredErrorMsg}`),
    [gender.name]: Yup.string().required(`${gender.requiredErrorMsg}`),
    [age.name]: Yup.number().positive("Invalid age").integer("Invalid age").moreThan(14, "Invalid age. Age should be between 15 and 30").lessThan(31, "Invalid age. Age should be between 15 and 30").required(`${age.requiredErrorMsg}`).typeError("Invalid age"),
    
  }),
  Yup.object().shape({
    [oldPassword.name]: Yup.string().matches(pwdRegExp, oldPassword.invalidErrorMsg).required(`${oldPassword.requiredErrorMsg}`),
    [newPassword.name]: Yup.string().matches(pwdRegExp, newPassword.invalidErrorMsg).required(`${newPassword.requiredErrorMsg}`),
    [confirmPassword.name]: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Passwords must match.').required(`${confirmPassword.requiredErrorMsg}`)
  }),
  Yup.object().shape({
    [college.name]: Yup.string().required(`${college.requiredErrorMsg}`),
    [course.name]: Yup.string().required(`${course.requiredErrorMsg}`),
    [city.name]: Yup.object().required(`${city.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [skills.name]: Yup.array().of(Yup.object()),
    [links.name]: Yup.object().shape({
      platform: Yup.string().oneOf(["github", "linkedin", "twitter"]).required("Platform name is required"),
      utl: Yup.string().matches(/((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,'Enter correct url!').required("Link is required")
    })
  })
];
