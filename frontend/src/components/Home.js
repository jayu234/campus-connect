import React, { useEffect } from 'react'
import { Grid, Box } from '@mui/material'
import LeftSidebar from './LeftSidebar'
import Footer from './Footer'
import Header from './Header'
import RightSidebar from './RightSidebar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function Home() {
    return (
        <>
            <Header />
            <Box sx={{ paddingX: {md: '1rem'} }}>
                <Grid container spacing={2} component="div" sx={{ height: "100%" }}>
                    <Grid item component={'aside'} xs={2.5}>
                        <Box sx={{ position: 'sticky', top: '20px' }}>
                            <LeftSidebar />
                            <Footer />
                        </Box>
                    </Grid>
                    <Grid item md={7} xs={12}>
                        <Outlet />
                    </Grid>
                    <Grid item  xs={2.5}>
                        <RightSidebar />
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default Home