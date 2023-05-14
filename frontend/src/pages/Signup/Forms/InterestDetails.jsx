import { Autocomplete, Grid, TextField } from "@mui/material";
import React from "react";
import { Field } from "formik";
import { useSelector } from "react-redux";

function InterestDetails(props) {
  const { formField: { interests }, data} = props;
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Field name="interests">
            {({ field, form }) => (
              <Autocomplete
                multiple
                disableCloseOnSelect
                options={data}
                getOptionLabel={(option) => option.label}
                value={field.value}
                defaultValue={[{}]}
                onChange={(event, newValue) => {
                  form.setFieldValue("interests", newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={interests.label}
                    error={
                      form.touched.interests && Boolean(form.errors.interests)
                    }
                    helperText={form.touched.interests && form.errors.interests}
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

export default InterestDetails;
