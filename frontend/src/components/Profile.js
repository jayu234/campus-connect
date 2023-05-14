import React from "react"
import Header from "./Header"
import ProfileLeftSidebar from "./ProfileLeftSidebar"
import ProfileRightSidebar from "./ProfileRightSidebar"
import { Grid, Box } from "@mui/material"

function Profile() {
	return (
		<>
			<Header  iconShow={false}/>
			<Grid
				container
				spacing={2}
				sx={{
					height: "100%",
					display: "flex",
					backgroundColor: "#f8fafc",
				}}
			>
				<Grid item component={"aside"} xs={12} md={3} sx={{ marginLeft: {md: "3rem", xs: "0"} }}>
					<Box
						sx={{
							position: "sticky",
							top: "20px",
							backgroundColor: "white",
							borderRadius: "1rem",
							border: "1px solid #e2e8f0cc",
							":hover": { borderColor: "#c9c9c9" },
						}}
					>
						<ProfileLeftSidebar />
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
						<ProfileRightSidebar />
					</Box>
				</Grid>
			</Grid>
		</>
	)
}

export default Profile
