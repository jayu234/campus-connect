import { Box, Button, Typography } from "@mui/material"
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded"
import React from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"

function PageNotFound() {
	const navigate = useNavigate()
	return (
		<>
			<Header />
			<Box
				component={"container"}
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "75%",
					marginX: "auto",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<img
					src="/images/404_error.png"
					alt="Page not found"
					width={300}
					height={300}
				/>
				<Box
					component={"div"}
					sx={{
						width: "50%",
						marginX: "auto",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography fontFamily={"inherit"} fontSize={"3rem"}>
						Oops, You're Lost!
					</Typography>
					<Typography fontFamily={"inherit"} fontSize={"1rem"} align={"center"}>
						The page you're looking for might have been removed, had its name
						changed or is temporarily unavilable.
					</Typography>
					<Button
						variant="text"
						disableTouchRipple
						onClick={() => {
							navigate("/")
						}}
						sx={{
							marginTop: "1.5rem",
							fontFamily: "inherit",
							textTransform: "none",
						}}
						startIcon={<KeyboardBackspaceRoundedIcon />}
					>
						Back to home
					</Button>
				</Box>
			</Box>
		</>
	)
}

export default PageNotFound
