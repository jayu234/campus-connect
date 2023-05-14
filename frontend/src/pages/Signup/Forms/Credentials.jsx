import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import InputField from "../../FormFields/InputField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Field } from "formik";

function Credentials(props) {
  const {
    formField: { phone, email, password, confirmPassword },
  } = props;
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <InputField name={phone.name} label={phone.label} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputField
            name={email.name}
            label={email.label}
            fullWidth
            autoComplete="username"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={password.name}>
            {({ field, form }) => (
              <TextField
                type={showPassword ? "text" : "password"}
                label={password.label}
                variant="outlined"
                fullWidth
                autoComplete="new-password"
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={form.touched.password && Boolean(form.errors.password)}
                helperText={form.touched.password && form.errors.password}
              />
            )}
          </Field>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field name={confirmPassword.name}>
            {({ field, form }) => (
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                label={confirmPassword.label}
                variant="outlined"
                fullWidth
                autoComplete="new-password"
                {...field}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={ form.touched.confirmPassword && Boolean(form.errors.confirmPassword)}
                helperText={ form.touched.confirmPassword && form.errors.confirmPassword}
              />
            )}
          </Field>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default Credentials;
