import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import Snackbar from "@mui/material/Snackbar"
import Typography from "@mui/material/Typography"
import MuiAlert from "@mui/material/Alert"
import Stack from "@mui/material/Stack"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userLogin } from "../store/userSlice"
import PageHeader from "./PageHeader"
import { Field, Formik, Form } from "formik"
import * as yup from "yup"
import { CircularProgress, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const vertical = "bottom",
	horizontal = "center"

const validationSchema = yup.object({
	email: yup
		.string()
		.email("Enter a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.min(8, "Password should be of minimum 8 characters length")
		.required("Password is required"),
})

function Login() {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		login: { isLoading, isError, message },
	} = useSelector((state) => state.user)
	const [alertMessage, setAlertMessage] = React.useState("")

	const [open, setOpen] = React.useState(false)

	const handleClose = (event, reason) => {
		if (reason === "clickaway") {
			return
		}
		setOpen(false)
	}
	const [showPassword, setShowPassword] = React.useState(false)
	React.useEffect(() => {
		if (isError) {
			setAlertMessage(message)
			setOpen(true)
		}
	}, [isLoading])
	const handleClickShowPassword = () => setShowPassword((show) => !show)

	const handleMouseDownPassword = (event) => {
		event.preventDefault()
	}
	const handleSubmit = (values, actions) => {
		dispatch(userLogin(values))
	}
	return (
		<Box component="div" sx={{ height: "100vh" }}>
			<PageHeader />
			<Grid
				container
				component={"section"}
				direction={"column"}
				spacing={1}
				alignItems={"center"}
				justifyContent={"space-between"}
				sx={{
					width: "500px",
					marginX: "auto",
					marginTop: "3rem",
					padding: "1.5rem",
					backgroundColor: "#FFFFFF",
					borderRadius: "10px",
					border: "1px solid #e2e8f0cc",
				}}
			>
				<Grid item mb={2} xs={12}>
					<Typography
						className="gradientText"
						variant="h4"
						fontFamily="inherit"
						fontWeight={600}
						align="center"
					>
						Login
					</Typography>
				</Grid>
				<Grid item xs={12} sx={{ width: "100%" }}>
					<React.Fragment>
						<Formik
							initialValues={{ email: "", password: "" }}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{() => (
								<Form id="login-form">
									<React.Fragment>
										<Grid container spacing={3} direction={"column"}>
											<Grid item xs={12} sm={6}>
												<Field name="email">
													{({ field, form }) => (
														<TextField
															fullWidth
															id="email"
															label="Email *"
															{...field}
															error={
																form.touched.email && Boolean(form.errors.email)
															}
															helperText={
																form.touched.email && form.errors.email
															}
															autoComplete="username"
														/>
													)}
												</Field>
											</Grid>
											<Grid item xs={12} sm={6}>
												<Field name="password">
													{({ field, form }) => (
														<TextField
															type={showPassword ? "text" : "password"}
															label="Password *"
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
																			{showPassword ? (
																				<Visibility />
																			) : (
																				<VisibilityOff />
																			)}
																		</IconButton>
																	</InputAdornment>
																),
															}}
															error={
																form.touched.password &&
																Boolean(form.errors.password)
															}
															helperText={
																form.touched.password && form.errors.password
															}
														/>
													)}
												</Field>
											</Grid>
										</Grid>
									</React.Fragment>
									<Grid item sx={{ position: "relative" }}>
										<Button
											disabled={isLoading}
											fullWidth
											type="submit"
											variant="contained"
											color="primary"
											sx={{
												marginTop: "24px",
												height: "2.8rem",
												fontSize: "1rem",
												letterSpacing: "0.1rem",
												textTransform: "none",
											}}
										>
											Login
										</Button>
										{isLoading && (
											<CircularProgress
												size={24}
												sx={{
													position: "absolute",
													bottom: "10%",
													right: "46%",
												}}
											/>
										)}
									</Grid>
								</Form>
							)}
						</Formik>
					</React.Fragment>
				</Grid>
				<Grid
					item
					display={"flex"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Typography variant="body2" fontFamily="inherit" align="center">
						Don't have an account?
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
							navigate("/signup")
						}}
					>
						Signup
					</Button>
				</Grid>
			</Grid>
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar
					open={open}
					anchorOrigin={{ vertical, horizontal }}
					key={vertical + horizontal}
					autoHideDuration={3000}
					onClose={handleClose}
				>
					<Alert
						onClose={handleClose}
						severity={isError ? "error" : "success"}
						sx={{ width: "100%" }}
					>
						{alertMessage}
					</Alert>
				</Snackbar>
			</Stack>
		</Box>
	)
}

export default Login
