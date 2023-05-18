import { Box, Button, Typography } from "@mui/material"
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded"
import React from "react"
import { useNavigate } from "react-router-dom"
import Header from "./Header"

function PageNotFound() {
	const navigate = useNavigate()
	return (
		<>
			<Header iconShow={false} btnShow={false} profileBtn={false}/>
			<Box
				component={"container"}
				sx={{
					display: "flex",
					flexDirection: "column",
					width: "75%",
					height: {md:"auto", xs: "70%"},
					margin: "auto",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Box component={'img'} src="/images/404_error.png" alt="Page not found" sx={{width: {md: "300px", xs: "150px"}, height: {md: "300px", xs: "150px"}}}/>
				<Box
					component={"div"}
					sx={{
						width: {md: "50%", xs: "70%"},
						marginX: "auto",
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography fontFamily={"inherit"} sx={{fontSize:{md: "48px", xs: "28px"}}} align={"center"}>
						Oops, <br /> You're Lost!
					</Typography>
					<Typography fontFamily={"inherit"} mt={1} sx={{fontSize:{md: "16px", xs: "14px"}}} align={"center"} color="text.secondary" >
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
							marginTop: {md: "1.5rem", xs: "0.75rem"},
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
