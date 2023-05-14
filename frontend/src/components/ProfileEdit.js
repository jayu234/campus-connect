import React, { useEffect, useState } from "react"
import Header from "./Header"
import { Grid, Box, Button, Autocomplete, Select, FormControl, InputLabel, CircularProgress, IconButton } from "@mui/material"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import { BsGithub, BsLinkedin, BsTwitter } from "react-icons/bs"
import { Divider } from "@mui/material"
import TextField from "@mui/material/TextField"
import MenuItem from "@mui/material/MenuItem"
import colleges from "../data/collegeName"
import cities from "../data/cities"
import { useDispatch, useSelector } from "react-redux"
import { skills as Skills } from "../data/skills"
import { loadUser, resetEditState, updateProfile } from "../store/userSlice"
import Alert from "./Alert"
import { Camera, CameraAlt } from "@mui/icons-material"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }} width={"100%"}>
					<Box component={"div"}>{children}</Box>
				</Box>
			)}
		</div>
	)
}
const courses = [
	{ label: "Information Technology", value: "Information Technology" },
	{ label: "Computer Science", value: "Computer Science" },
	{ label: "Civil Engineering", value: "Civil Engineering" },
	{ label: "Electronics Engineering", value: "Electronics Engineering" },
	{ label: "Electrical Engineering", value: "Electrical Engineering" },
	{ label: "Mechanical Engineering", value: "Mechanical Engineering" },
	{ label: "Production Engineering", value: "Production Engineering" },
	{ label: "Mathemetics", value: "Mathemetics" },
]

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
}

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		"aria-controls": `vertical-tabpanel-${index}`,
	}
}

function ProfileEdit() {
	const [activeTab, setActiveTab] = React.useState(1);
	const [open, setOpen] = useState(false);
	const { loadUser: { data: { avatar, username, firstName, lastName, email, age, phone, college, course, gender, city, skills, links } } } = useSelector((state) => state.user);
	const { editUser: { isLoading } } = useSelector((state) => state.user);
	const { loadUser } = useSelector((state) => state.user);
	const { editUser } = useSelector((state) => state.user);
	const [githubLink, setGithubLink] = useState(links[0]?.url || null);
	const [linkedInLink, setLinkedInLink] = useState(links[1]?.url || null);
	const [twitterLink, setTwitterLink] = useState(links[2]?.url || null);
	const handleChange = (event, newValue) => {
		setActiveTab(newValue)
	}
	const initialValues = {
		firstName: firstName,
		lastName: lastName,
		age: age,
		gender: gender.toLowerCase(),
		oldPassword: "",
		newPassword: "",
		cofirmPassword: "",
		college: college.toUpperCase(),
		course: course,
		city: city,
		skills: skills
	}
	const [formData, setFormData] = useState(initialValues);
	const dispatch = useDispatch();
	const [image, setImage] = useState();
	const [imagePreview, setImagePreview] = useState(avatar?.url || "");
	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage({});
		setImagePreview("");
		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setImagePreview(reader.result);
				setImage(reader.result);
			}
		};
		reader.readAsDataURL(file)
	}
	useEffect(() => {
		if (loadUser.success) {
			setFormData({
				firstName: firstName,
				lastName: lastName,
				age: age,
				gender: gender.toLowerCase(),
				oldPassword: "",
				newPassword: "",
				cofirmPassword: "",
				college: college.toUpperCase(),
				course: course,
				city: city,
				skills: skills
			});
		}
	}, [loadUser.data])
	useEffect(() => {
		if (editUser.success) {
			setOpen(true);
			dispatch(resetEditState());
			setTimeout(() => {
				setOpen(false);
			}, 3500)
		}
	}, [isLoading])
	return (
		<>
			<Header iconShow={false} btnShow={false} />
			<Grid
				container
				spacing={2}
				sx={{
					height: "100%",
					display: "flex",
					backgroundColor: "#f8fafc",
					justifyContent: "center",
				}}
			>
				<Grid item component={"aside"} xs={10} sx={{ marginLeft: "3rem" }}>
					<Box
						sx={{
							flexGrow: 1,
							bgcolor: "background.paper",
							display: "flex",
							height: 624,
							border: "0.1rem solid #e2e8f0cc",
							borderRadius: "20px",
						}}
					>
						<Tabs
							orientation="vertical"
							variant="scrollable"
							value={activeTab}
							onChange={handleChange}
							aria-label="Vertical tabs example"
							sx={{ borderRight: 1, borderColor: "divider", width: "20rem" }}
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "center",
									flexDirection: "column",
									alignItems: "center",
									marginTop: "2rem",
									position: "relative"
								}}
							>
								<img
									style={{
										width: "7.5rem",
										height: "7.5rem",
										borderRadius: "1rem",
									}}
									src={imagePreview}
									alt="profile_pic"
								/>
								<div style={{ position: "absolute", bottom: "45%" }}>
									<input
										accept="image/*"
										type="file"
										id="select-image"
										style={{ display: "none" }}
										onChange={handleImageChange}
									/>
									<label htmlFor="select-image">
										{/* <IconButton component="span" variant='text' sx={{ textTransform: 'none', color: "#979797", background: "#efefef" }} >*/}
										<CameraAlt />
										{/* </IconButton> */}
									</label>
								</div>
								<Button size="small" variant="contained" sx={{ marginTop: "0.5rem", fontFamily: "inherit", textTransform: "none" }} onClick={() => { }}>
									Change profile
								</Button>
								<Box sx={{ marginTop: "0.3rem" }}>
									<h3>{firstName + " " + lastName}</h3>
								</Box>
							</Box>
							<Tab
								label="Personal Details"
								{...a11yProps(1)}
								sx={{ fontWeight: 500, color: "black", fontSize: "0.9rem", fontFamily: "inherit" }}
							/>
							<Tab
								label="Credentials"
								{...a11yProps(2)}
								sx={{ fontWeight: 500, color: "black", fontSize: "0.9rem", fontFamily: "inherit" }}
							/>
							<Tab
								label="Education Details"
								{...a11yProps(3)}
								sx={{ fontWeight: 500, color: "black", fontSize: "0.9rem", fontFamily: "inherit" }}
							/>
							<Tab
								label="Additional details"
								{...a11yProps(4)}
								sx={{ fontWeight: 500, color: "black", fontSize: "0.9rem", fontFamily: "inherit" }}
							/>
						</Tabs>
						<Box sx={{ paddingLeft: "2rem" }}>
							<TabPanel value={activeTab} index={1}>
								<Typography
									sx={{
										fontFamily: "inherit",
										textAlign: "justify",
										fontSize: "1.4rem",
									}}
								>
									Personal Details
								</Typography>
								<Divider />
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "2rem",
									}}
								>
									<Typography
										sx={{
											fontFamily: "inherit",
											textAlign: "justify",
											fontSize: "1.2rem",
											width: "10rem",
										}}
									>
										Username :
									</Typography>
									<TextField
										disabled
										id="outlined-required"
										label="Required"
										defaultValue={username}
									/>
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "1rem",
									}}
								>
									<Typography
										sx={{
											fontFamily: "inherit",
											textAlign: "justify",
											fontSize: "1.2rem",
											width: "10rem",
										}}
									>
										First Name :
									</Typography>
									<TextField
										required
										id="firstName"
										name="firstName"
										label="First name"
										value={formData.firstName}
										onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
									/>
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "1rem",
									}}
								>
									<Typography
										sx={{
											fontFamily: "inherit",
											textAlign: "justify",
											fontSize: "1.2rem",
											width: "10rem",
										}}
									>
										Last Name :
									</Typography>
									<TextField
										required
										id="lastName"
										label="Last Name"
										name="lastName"
										value={formData.lastName}
										onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
									/>
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "1rem",
									}}
								>
									<Typography
										sx={{
											fontFamily: "inherit",
											textAlign: "justify",
											fontSize: "1.2rem",
											width: "10rem",
										}}
									>
										Gender :
									</Typography>
									<FormControl>
										<InputLabel id="demo-simple-select-label">Gender</InputLabel>
										<Select
											id="gender"
											label="Gender"
											name="gender"
											value={formData.gender}
											onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
										>
											<MenuItem value={"male"}>Male</MenuItem>
											<MenuItem value={"female"}>Female</MenuItem>
											<MenuItem value={"other"}>Other</MenuItem>
										</Select>
									</FormControl>
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "1rem",
									}}
								>
									<Typography
										sx={{
											fontFamily: "inherit",
											textAlign: "justify",
											fontSize: "1.2rem",
											width: "10rem",
										}}
									>
										Age :
									</Typography>
									<TextField
										id="age"
										required
										type="text"
										label="Age"
										name="age"
										value={formData.age}
										onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
									/>
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "1.8rem",
										position: "relative"
									}}
								>
									{isLoading && (
										<CircularProgress
											size={24}
											sx={{
												position: "absolute",
												bottom: "10%",
												left: "4%",
											}}
										/>
									)}
									<Button disabled={isLoading} variant="contained" onClick={() => { dispatch(updateProfile(formData)); }} sx={{ textTransform: "none", fontFamily: "inherit" }}>Save</Button>
								</Box>
							</TabPanel>
							<TabPanel value={activeTab} index={2}>
								<Typography
									sx={{
										fontFamily: "inherit",
										textAlign: "justify",
										fontSize: "1.4rem",
									}}
								>
									Login Details
								</Typography>
								<Divider />
								<form>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginTop: "2rem",
										}}
									>
										<Typography
											sx={{
												fontFamily: "inherit",
												textAlign: "justify",
												fontSize: "1.2rem",
												width: "13rem",
											}}
										>
											Contact No :
										</Typography>
										<TextField
											disabled
											id="outlined-number"
											label="Phone number *"
											type="text"
											defaultValue={phone}
										/>
									</Box>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginTop: "1rem",
										}}
									>
										<Typography
											sx={{
												fontFamily: "inherit",
												textAlign: "justify",
												fontSize: "1.2rem",
												width: "13rem",
											}}
										>
											Email :
										</Typography>
										<TextField
											disabled
											id="outlined-required"
											label="Email *"
											defaultValue={email}
											sx={{ width: "20rem" }}
										/>
									</Box>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginTop: "1rem",
										}}
									>
										<Typography
											sx={{
												fontFamily: "inherit",
												textAlign: "justify",
												fontSize: "1.2rem",
												width: "13rem",
											}}
										>
											Current Password :
										</Typography>
										<TextField
											id="currentPassword"
											label="Current Password"
											type="password"
											autoComplete="current-password"
											name="oldPassword"
											onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
											sx={{ width: "20rem" }}
										/>
									</Box>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginTop: "1rem",
										}}
									>
										<Typography
											sx={{
												fontFamily: "inherit",
												textAlign: "justify",
												fontSize: "1.2rem",
												width: "13rem",
											}}
										>
											New Password :
										</Typography>
										<TextField
											id="newPassword"
											label="New Password"
											type="password"
											name="newPassword"
											autoComplete="current-password"
											sx={{ width: "20rem" }}
											onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
										/>
									</Box>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
											marginTop: "1rem",
										}}
									>
										<Typography
											sx={{
												fontFamily: "inherit",
												textAlign: "justify",
												fontSize: "1.2rem",
												width: "13rem",
											}}
										>
											C. New Password :
										</Typography>
										<TextField
											id="confirmPassword"
											label="Confirm Password"
											type="password"
											autoComplete="current-password"
											sx={{ width: "20rem" }}
											name="confirmPassword"
											onChange={(e) => { setFormData({ ...formData, [e.target.name]: e.target.value }) }}
										/>
									</Box>
								</form>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "1.8rem",
										position: "relative"
									}}
								>
									{isLoading && (
										<CircularProgress
											size={24}
											sx={{
												position: "absolute",
												bottom: "10%",
												left: "4%",
											}}
										/>
									)}
									<Button variant="contained" onClick={() => { dispatch(updateProfile(formData)) }} sx={{ textTransform: "none", fontFamily: "inherit" }}>Change Password</Button>
								</Box>
							</TabPanel>
							<TabPanel value={activeTab} index={3}>
								<Typography
									sx={{
										fontFamily: "inherit",
										textAlign: "justify",
										fontSize: "1.4rem",
									}}
								>
									Education Details
								</Typography>
								<Divider />
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "2rem",
									}}
								>
									<Typography
										sx={{
											fontFamily: "inherit",
											textAlign: "justify",
											fontSize: "1.2rem",
											width: "13rem",
										}}
									>
										College Name :
									</Typography>
									<Autocomplete
										disablePortal
										id="college"
										options={colleges}
										value={colleges.find((option) => option.value === formData.college) || null}
										getOptionLabel={(option) => option.label}
										onChange={(e, newValue) => { setFormData({ ...formData, college: newValue?.value || null }) }}
										sx={{ width: 300 }}
										renderInput={(params) => (
											<TextField {...params} label="College *" name="college" />
										)}
									/>
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "1rem",
									}}
								>
									<Typography
										sx={{
											fontFamily: "inherit",
											textAlign: "justify",
											fontSize: "1.2rem",
											width: "13rem",
										}}
									>
										Course :
									</Typography>
									<Autocomplete
										disablePortal
										id="combo-box-demo"
										options={courses}
										value={courses.find((option) => option.value === formData.course) || null}
										sx={{ width: 300 }}
										onChange={(event, newValue) => { setFormData({ ...formData, course: newValue?.value || null }) }}
										renderInput={(params) => (
											<TextField {...params} label="Course *" />
										)}
									/>
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "1rem",
									}}
								>
									<Typography
										sx={{
											fontFamily: "inherit",
											textAlign: "justify",
											fontSize: "1.2rem",
											width: "13rem",
										}}
									>
										City :
									</Typography>
									<Autocomplete
										disablePortal
										id="combo-box-demo"
										options={cities}
										value={cities.find((option) => option.label === formData.city.label) || null}
										onChange={(event, newValue) => { setFormData({ ...formData, city: newValue || null }) }}
										getOptionLabel={(option) => option.label}
										sx={{ width: 300 }}
										renderInput={(params) => (
											<TextField {...params} label="City" />
										)}
									/>
								</Box>

								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "2.4rem",
										position: "relative"
									}}
								>
									{isLoading && (
										<CircularProgress
											size={24}
											sx={{
												position: "absolute",
												bottom: "10%",
												left: "4%",
											}}
										/>
									)}
									<Button disabled={isLoading} variant="contained" sx={{ fontFamily: "inherit", textTransform: "none" }} onClick={() => { dispatch(updateProfile(formData)); }}>Save</Button>
								</Box>
							</TabPanel>
							<TabPanel value={activeTab} index={4}>
								<Typography
									sx={{
										fontFamily: "inherit",
										textAlign: "justify",
										fontSize: "1.4rem",
									}}
								>
									Additional details
								</Typography>
								<Divider />
								<Box
									sx={{
										display: "flex",
										width: "100%",
										justifyContent: "space-between",
										gap: "5rem",
										alignItems: "center",
										marginTop: "2rem",
									}}
								>
									<Typography
										sx={{
											fontFamily: "inherit",
											textAlign: "justify",
											fontSize: "1.2rem",
										}}
									>
										Skills
									</Typography>
									<Autocomplete
										fullWidth
										disablePortal
										multiple
										id="combo-box-demo"
										options={Skills}
										value={formData.skills || null}
										onChange={(e, newValue) => { setFormData({ ...formData, skills: newValue || null }) }}
										renderInput={(params) => (
											<TextField {...params} label="Skills" />
										)}
									/>
								</Box>
								<Box
									sx={{
										width: "100%",
										display: "flex",
										justifyContent: "space-between",
										gap: "5rem",
										alignItems: "flex-start",
										marginTop: "2rem",
									}}
								>
									<Box>
										<Typography
											sx={{
												fontFamily: "inherit",
												textAlign: "justify",
												fontSize: "1.2rem",
											}}
										>
											Links
										</Typography>
									</Box>
									<Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: "1rem" }}>
										<Box sx={{ display: 'flex', alignItems: 'flex-end', gap: "1rem" }}>
											<BsGithub size={20} />
											<TextField
												fullWidth
												variant="standard"
												id="github-link"
												type="text"
												value={githubLink}
												placeholder="Github profile"
												onChange={(e) => { setGithubLink(e.target.value) }}
											/>
										</Box>
										<Box sx={{ display: 'flex', alignItems: 'flex-end', gap: "1rem" }}>
											<BsLinkedin size={20} />
											<TextField
												fullWidth
												variant="standard"
												id="linkedin-link"
												type="text"
												value={linkedInLink}
												placeholder="LinkedIn profile"
												onChange={(e) => { setLinkedInLink(e.target.value) }}
											/>
										</Box>
										<Box sx={{ display: 'flex', alignItems: 'flex-end', gap: "1rem" }}>
											<BsTwitter size={20} />
											<TextField
												fullWidth
												variant="standard"
												id="twitter-link"
												type="text"
												value={twitterLink}
												placeholder="Twitter profile"
												onChange={(e) => { setTwitterLink(e.target.value) }}
											/>
										</Box>
									</Box>
								</Box>
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										marginTop: "2.4rem",
										position: "relative"
									}}
								>
									{isLoading && (
										<CircularProgress
											size={24}
											sx={{
												position: "absolute",
												bottom: "10%",
												left: "4%",
											}}
										/>
									)}
									<Button disabled={isLoading} variant="contained" sx={{ fontFamily: "inherit", textTransform: "none" }}
										onClick={() => {
											const newLinks = [{ platform: "github", url: githubLink }, { platform: "linkedin", url: linkedInLink }, { platform: "twitter", url: twitterLink }];
											dispatch(updateProfile({ ...formData, links: newLinks }));
										}}
									>
										Save
									</Button>
								</Box>
							</TabPanel>
							{open && <Alert message={"Profile updated!!"} severity={"success"} verticalPos={"bottom"} horizontalPos={"right"} />}
						</Box>
					</Box>
				</Grid>
			</Grid >
		</>
	)
}

export default ProfileEdit
