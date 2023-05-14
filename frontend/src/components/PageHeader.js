import * as React from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Grid } from "@mui/material";

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
					sx={{ mr: 1 }}
				>
					<img
						src="/images/logo1.png"
						width={32}
						style={{
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
						fontSize: "1.8rem",
						textAlign: "center",
						fontFamily: "'Inter', sans-serif",
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
