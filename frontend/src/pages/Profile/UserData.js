import React from "react"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import Posts from "./Posts"
import Doubts from "./Doubts"
import Answers from "./Answers"

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	}
}

function UserData({ type = "my_profile" }) {
	const [value, setValue] = React.useState(0)

	const handleChange = (event, newValue) => {
		setValue(newValue)
	}

	return (
		<>
			<Box sx={{ width: "100%" }}>
				<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="basic tabs example"
						centered
					>
						<Tab label="Post" {...a11yProps(0)} sx={{ textTransform: 'none', fontFamily: "inherit" }}/>
						<Tab label="Questions" {...a11yProps(1)} sx={{ textTransform: 'none', fontFamily: "inherit" }}/>
						<Tab label="Answers" {...a11yProps(2)} sx={{ textTransform: 'none', fontFamily: "inherit" }}/>
						{type !== "my_profile" && <Tab label="Following" {...a11yProps(3)} />}
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<Posts />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Doubts />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<Answers />
				</TabPanel>
				{/* {type !== "my_profile" && <TabPanel value={value} index={3}>
					<ProfileFollowing />
				</TabPanel>} */}
			</Box>
		</>
	)
}

export default UserData
