import { Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function SignupSuccess() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(()=>{
      navigate("/login");
    }, 2500)
  }, [])
  
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography fontSize={24}>
            Redirecting...
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}

export default SignupSuccess