import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Box, Grid } from "@mui/material";

export default function PageHeader() {
	return (
		<Grid container component={"div"} direction={"column"} sx={{ backgroundColor: '#FFFFFF' }}>
			<Grid
				item
				sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
			>
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ marginRight: {md: 0.5, xs: 0.25} }}
				>
					<Box
						component={'img'}
						src="/images/logo1.png"
						alt="logo"
						sx={{
							width: {md: "32px", xs: "28px"},
							cursor: "pointer",
							textAlign: "center",
							display: "flex",
							alignItems: "center",
							userSelect: "none",
						}}
					/>
				</IconButton>
				<Typography
					sx={{
						backgroundColor: "#fff",
						color: "black",
						fontSize: {md: "28px", xs: "26px"},
						textAlign: "center",
						fontFamily: "inherit",
						fontWeight: "600",
						cursor: "pointer",
						textDecoration: "none",
						userSelect: "none",
						letterSpacing: -1,
					}}
				>
					CampusConnect
				</Typography>
			</Grid>
		</Grid>
	);
}
