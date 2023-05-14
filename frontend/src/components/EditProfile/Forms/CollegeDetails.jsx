import { Grid, Autocomplete } from "@mui/material";
import React from "react";
import colleges from "../../../data/collegeName";
import InputField from "../../FormFields/InputField";
import { Field } from "formik";
import cities from "../../../data/cities";

const courses = [
  { label: "Information Technology", value: "Information Technology" },
  { label: "Computer Science", value: "Computer Science" },
  { label: "Civil Engineering", value: "Civil Engineering" },
  { label: "Electronics Engineering", value: "Electronics Engineering" },
  { label: "Electrical Engineering", value: "Electrical Engineering" },
  { label: "Mechanical Engineering", value: "Mechanical Engineering" },
  { label: "Production Engineering", value: "Production Engineering" },
  { label: "Mathemetics", value: "Mathemetics" },
];

function CollegeDetails(props) {
  const {
    formField: { college, course, city },
    values,
    handleChange,
    handleBlur,
  } = props;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Field name={college.name}>
            {({ field }) => (
              <Autocomplete
                id="college"
                name={college.name}
                options={colleges}
                getOptionLabel={(option) => option.label}
                value={colleges.find((option) => option.value === values.college )|| null}
                onChange={(event, newValue) => {
                  handleChange({
                    target: { name: "college", value: newValue?.value || null },
                  });
                }}
                onBlur={() => {
                  handleBlur({ target: { name: "college" } });
                }}
                renderInput={(params) => (
                  <InputField
                    {...params}
                    name={college.name}
                    label={college.label}
                  />
                )}
              />
            )}
          </Field>
        </Grid>
        <Grid item xs={12}>
          <Field name={course.name}>
            {({ field }) => (
              <Autocomplete
                id="course"
                name={course.name}
                options={courses}
                getOptionLabel={(option) => option.label}
                value={courses.find((option) => option.value === values.course) || null}
                onChange={(event, newValue) => {
                  handleChange({
                    target: { name: "course", value: newValue?.value || null },
                  });
                }}
                onBlur={() => {
                  handleBlur({ target: { name: "course" } });
                }}
                renderInput={(params) => (
                  <InputField
                    {...params}
                    name={course.name}
                    label={course.label}
                  />
                )}
              />
            )}
          </Field>
        </Grid>
        <Grid item xs={12}>
          <Field name={city.name}>
            {({ field, form }) => (
              <Autocomplete
                id="city"
                name="city"
                options={cities}
                value={cities.find((option) => option.label === values.city.label)|| null}
                onChange={(event, newValue) => {
                  handleChange({ target: { name: 'city', value: newValue || null } });
                }}
                onBlur={() => {
                  handleBlur({ target: { name: 'city' } });
                }}
                renderInput={(params) => (
                  <InputField
                    {...params}
                    name={city.name}
                    label={city.label}
                  />
                )}
              />
            )}
          </Field>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default CollegeDetails;
