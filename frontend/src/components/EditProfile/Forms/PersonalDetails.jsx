import { Grid, Box, Button, Typography, Divider } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../../FormFields/InputField";
import SelectField from "../../FormFields/SelectField";
import PropTypes from "prop-types";

const genders = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }} width={"100%"}>
          <Box component={"div"}>{children}</Box>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function PersonalDetails(props) {
  const {
    formField: { firstName, lastName, gender, age },
    activeTab,
    username,
  } = props;
  return (
    <TabPanel value={activeTab} index={1}>
      <Typography
        sx={{
          fontFamily: "inherit",
          textAlign: "justify",
          fontSize: "1.4rem",
        }}
      >
        Personal Details
      </Typography>
      <Divider />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "inherit",
            textAlign: "justify",
            fontSize: "1.2rem",
            width: "10rem",
          }}
        >
          Username :
        </Typography>
        <InputField
          disabled
          name={"username"}
          label={"Username *"}
          defaultValue={username}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "inherit",
            textAlign: "justify",
            fontSize: "1.2rem",
            width: "10rem",
          }}
        >
          First Name :
        </Typography>
        <InputField name={firstName.name} label={firstName.label}  />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "inherit",
            textAlign: "justify",
            fontSize: "1.2rem",
            width: "10rem",
          }}
        >
          Last Name :
        </Typography>
        <InputField name={lastName.name} label={lastName.label} />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "inherit",
            textAlign: "justify",
            fontSize: "1.2rem",
            width: "10rem",
          }}
        >
          Gender :
        </Typography>
        <SelectField
          name={gender.name}
          label={gender.label}
          data={genders}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Typography
          sx={{
            fontFamily: "inherit",
            textAlign: "justify",
            fontSize: "1.2rem",
            width: "10rem",
          }}
        >
          Age :
        </Typography>
        <InputField name={age.name} label={age.label} />
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginTop: "1.8rem",
        }}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
            fontFamily: "inherit",
          }}
        >
          Save
        </Button>
      </Box> */}
    </TabPanel>
  );
}

export default PersonalDetails;
