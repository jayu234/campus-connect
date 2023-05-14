import { Grid, Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import InputField from "../../FormFields/InputField";
import SelectField from "../../FormFields/SelectField";

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

function PersonalDetails(props) {
  const {
    formField: { firstName, lastName, gender, age, username },
  } = props;
  const [selectedImage, setSelectedImage] = useState(null)
	const [imageUrl, setImageUrl] = useState(null)
	useEffect(() => {
		if (selectedImage) {
			setImageUrl(URL.createObjectURL(selectedImage))
		}
	}, [selectedImage])

  return (
    <React.Fragment>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={6}>
          <InputField name={firstName.name} label={firstName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={lastName.name} label={lastName.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <SelectField
            name={gender.name}
            label={gender.label}
            data={genders}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={age.name} label={age.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField name={username.name} label={username.label} fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PersonalDetails;
