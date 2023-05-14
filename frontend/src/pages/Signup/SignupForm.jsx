import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Stack,
  Snackbar
} from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { Formik, Form } from "formik";

import PersonalDetails from "./Forms/PersonalDetails";
import CollegeDetails from "./Forms/CollegeDetails";
import Credentials from "./Forms/Credentials";
import InterestDetails from "./Forms/InterestDetails";

import validationSchema from "./FormModel/validationSchema";
import model from "./FormModel/model";
import initialValues from "./FormModel/initialValues";

import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../store/userSlice";
import { getAllTopics } from "../../store/topicSlice";
import { useNavigate } from "react-router-dom";

const steps = [
  "Personal Details",
  "Login Details",
  "Education Details",
  "Area of Interest",
];
const { formId, formField } = model;

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const vertical = 'bottom', horizontal = 'center';


export default function SignupForm() {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = validationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const dispatch = useDispatch();
	const navigate = useNavigate();
	const [alertMessage, setAlertMessage] = React.useState("");
	const [open, setOpen] = React.useState(false);
  const {user, success, isError, isLoading, message } = useSelector((state) => state.user.signup);
  const { allTopics} = useSelector((state) => state.topic);
  const [interestsData, setInterestsData] = useState([]);
  function _sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const _renderStepContent = (
    step,
    setFieldValue,
    values,
    handleChange,
    handleBlur
  ) => {
    switch (step) {
      case 0:
        return <PersonalDetails formField={formField} />;
      case 1:
        return <Credentials formField={formField} />;
      case 2:
        return (
          <CollegeDetails
            formField={formField}
            setFieldValue={setFieldValue}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
          />
        );
      case 3:
        return <InterestDetails formField={formField} values={values} data={interestsData}/>;
      default:
        return <div>Not Found</div>;
    }
  };
  async function _submitForm(values, actions) {
    dispatch(userSignup(values));
    // await _sleep(2000);
    // actions.setSubmitting(false);
  }

  function _handleSubmit(values, actions) {
    if (isLastStep) {
      _submitForm(values, actions);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }
  const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};
	React.useEffect(() => {
		dispatch(getAllTopics())
	}, [dispatch]);
  React.useEffect(()=>{
    if(allTopics.success){
      const temp = allTopics.data?.map((item)=>{return {_id: item._id, label: item.label}})
      setInterestsData(temp);
    }
    if(allTopics.isError){
      setInterestsData([])
    }
  },[allTopics.isLoading])
	React.useEffect(() => {
		if (isError) {
			setAlertMessage(message);
			setOpen(true);
		}
    if (user && success) {
      setAlertMessage("Signned up successfully!!");
      setOpen(true);
      setTimeout(()=>{
        navigate("/")
      },2000)
		}
	}, [isLoading])
  return (
    <React.Fragment>
      <Grid
        container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "1.5rem",
        }}
      >
        <Grid item xs={10} sx={{ marginBottom: "1.5rem" }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>
                  <Typography variant="body2" fontFamily="'Inter', sans-serif">
                    {label}
                  </Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Grid>
        <Grid item xs={9}>
          <React.Fragment>
              <Formik
                initialValues={initialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {({
                  setFieldValue,
                  values,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <Form id={formId}>
                    {_renderStepContent(
                      activeStep,
                      setFieldValue,
                      values,
                      handleChange,
                      handleBlur,
                    )}

                    <div
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      {activeStep !== 0 && (
                        <Button
                          disableTouchRipple
                          onClick={_handleBack}
                          sx={{
                            marginTop: "24px",
                            marginLeft: "8px",
                            textTransform: "none",
                          }}
                        >
                          {" "}
                          Back{" "}
                        </Button>
                      )}
                      <div style={{ margin: "8px", position: "relative" }}>
                        <Button
                          disabled={isLoading}
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{
                            marginTop: "24px",
                            marginLeft: "8px",
                            textTransform: "none",
                          }}
                        >
                          {isLastStep ? "Sign up" : "Next"}
                        </Button>
                        {isLoading && (
                          <CircularProgress
                            size={24}
                            sx={{
                              position: "absolute",
                              bottom: "10%",
                              right: "30%",
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
          </React.Fragment>
        </Grid>
      </Grid>
      <Stack spacing={2} sx={{ width: '100%' }}>
				<Snackbar
					open={open}
					anchorOrigin={{ vertical, horizontal }}
					key={vertical + horizontal}
					autoHideDuration={2000}
					onClose={handleClose}
				>
					<Alert onClose={handleClose} severity={isError ? "error" : "success"} sx={{ width: '100%' }}>
						{alertMessage}
					</Alert>
				</Snackbar>
			</Stack>
    </React.Fragment>
  );
}
