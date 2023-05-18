import React from "react"
import Header from "../../components/Header"
import { Grid, Box } from "@mui/material"
import UserDetails from "./UserDetails"
import UserData from "./UserData"

function Profile() {
	return (
		<React.Fragment>
			<Header iconShow={false}/>
			<Grid
				container
				spacing={2}
				sx={{
					display: "flex",
					backgroundColor: "#f8fafc",
                    marginTop: 0
				}}
			>
				<Grid item xs={12} md={3} sx={{ marginLeft: {md: "3rem", xs: "0"} }}>
					<Box
						sx={{
							backgroundColor: "white",
							borderRadius: "1rem",
							border: "1px solid #e2e8f0cc",
							":hover": { borderColor: "#c9c9c9" },
						}}
					>
						<UserDetails />
					</Box>
				</Grid>
				<Grid item xs={12} md={7}>
					<Box
						sx={{
							backgroundColor: "white",
							borderRadius: "1rem",
							border: "1px solid #e2e8f0cc",
							":hover": { borderColor: "#c9c9c9" },
						}}
					>
						<UserData />
					</Box>
				</Grid>
			</Grid>
		</React.Fragment>
	)
}

export default Profile
