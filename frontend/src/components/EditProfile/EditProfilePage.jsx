import React, { useState } from "react";
import { Grid, Box, Tabs, Tab, Button } from "@mui/material";
import { Formik, Form } from "formik";
import model from "./FormModel/model";
import PersonalDetails from "./Forms/PersonalDetails";
import CollegeDetails from "./Forms/CollegeDetails";
import Credentials from "./Forms/Credentials";
import AdditionalInfo from "./Forms/AdditionalInfo";
import validationSchema from "./FormModel/validationSchema";

import { useDispatch, useSelector } from "react-redux";
const { formField, formId } = model;
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
export default function EditProfilePage() {
  const [activeTab, setActiveTab] = useState(1);
  const currentValidationSchema = validationSchema[activeTab];
  const {
    loadUser: {
      data: {
        avatar,
        username,
        firstName,
        lastName,
        email,
        age,
        phone,
        college,
        course,
        gender,
        city,
        skills,
        links,
      },
    },
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const initialValues = {
    firstName: firstName,
    lastName: lastName,
    gender: gender.toLowerCase(),
    age: age,
    city: city,
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
    college: college,
    course: course,
    skills: skills,
    links: links,
  };
  const _renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <PersonalDetails
            formField={formField}
            activeTab={activeTab}
            username={username}
          />
        );
      case 2:
        return <Credentials formField={formField} />;
      case 3:
        return <CollegeDetails formField={formField} />;
      case 3:
        return <AdditionalInfo formField={formField} />;
      default:
        return <div>Not Found</div>;
    }
  };
  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  function _handleSubmit(values, actions) {
    console.log(values);
    if (activeTab === 2) {
    } else {
    }
  }
  return (
    <Grid
      container
      spacing={2}
      sx={{
        height: "100%",
        display: "flex",
        backgroundColor: "#f8fafc",
        justifyContent: "center",
      }}
    >
      <Grid item component={"aside"} xs={10} sx={{ marginLeft: "3rem" }}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "background.paper",
            display: "flex",
            height: 624,
            border: "0.1rem solid #e2e8f0cc",
            borderRadius: "20px",
          }}
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={activeTab}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider", width: "20rem" }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                marginTop: "2rem",
              }}
            >
              <img
                style={{
                  width: "7.5rem",
                  height: "7.5rem",
                  borderRadius: "1rem",
                }}
                src={avatar.url}
                alt="profile_pic"
              />
              <Box sx={{ marginTop: "0.3rem" }}>
                <h3>{firstName + " " + lastName}</h3>
              </Box>
            </Box>
            <Tab
              label="Personal Details"
              {...a11yProps(1)}
              sx={{
                fontWeight: 500,
                color: "black",
                fontSize: "0.9rem",
                fontFamily: "inherit",
              }}
            />
            <Tab
              label="Credentials"
              {...a11yProps(2)}
              sx={{
                fontWeight: 500,
                color: "black",
                fontSize: "0.9rem",
                fontFamily: "inherit",
              }}
            />
            <Tab
              label="Education Details"
              {...a11yProps(3)}
              sx={{
                fontWeight: 500,
                color: "black",
                fontSize: "0.9rem",
                fontFamily: "inherit",
              }}
            />
            <Tab
              label="Additional details"
              {...a11yProps(4)}
              sx={{
                fontWeight: 500,
                color: "black",
                fontSize: "0.9rem",
                fontFamily: "inherit",
              }}
            />
          </Tabs>
          <Box sx={{ paddingLeft: "2rem" }}>
            <Formik
              initialValues={initialValues}
              validationSchema={currentValidationSchema}
              onSubmit={_handleSubmit}
            >
              {({}) => (
                <Form id={formId}>
                  {_renderTabContent()}
                  <div style={{marginLeft: "1rem", position: "relative" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      sx={{
                        textTransform: "none",
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
