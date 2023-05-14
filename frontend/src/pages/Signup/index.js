import { Box, Button, Container, Typography } from "@mui/material"
import SignupForm from "./SignupForm"
import styles from "./styles"
import { useNavigate } from "react-router-dom"
import PageHeader from "../PageHeader"

export default function SignupPage() {
	const navigate = useNavigate()
	return (
		<Box sx={styles.root}>
			<PageHeader />
			<div style={styles.formContainer}>
				<Container component={"div"} sx={styles.form}>
					<Typography
						className="gradientText"
						variant="h4"
						fontFamily="inherit"
						fontWeight={600}
						align="center"
					>
						Sign up
					</Typography>
					<SignupForm />
				</Container>
			</div>
			<div
				style={{
					marginTop: "1rem",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Typography variant="body2" fontFamily="inherit" align="center">
					{" "}
					Already have an account?
				</Typography>
				<Button
					disableTouchRipple
					disableFocusRipple
					sx={{
						textTransform: "none",
						fontFamily: "inherit",
						":hover": { backgroundColor: "transparent" },
					}}
					onClick={() => {
						navigate("/")
					}}
				>
					Login
				</Button>
			</div>
		</Box>
	)
}
