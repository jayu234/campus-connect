import React from "react"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import { Button, Divider, Menu, MenuItem } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import ShareIcon from "@mui/icons-material/Share"
import { Box } from "@mui/system"

import CreateIcon from "@mui/icons-material/Create"
import ProfileQuestionModal from "./ProfileQuestionModal"
import { useSelector } from "react-redux"

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
]

function ProfileQuestionComponent({ doubt }) {
	const { loadUser } = useSelector((state) => state.user);
	const id = loadUser.data._id;

	const [open, setOpen] = React.useState(false)

	const date = new Date(doubt.createdAt)

	return (
		<>
			{open && <ProfileQuestionModal open={open} tabInd={0} setOpen={setOpen} />}
			<Card
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					backgroundColor: "#f8fafc",
					marginBottom: "1rem",
				}}
			>
				<CardContent sx={{ padding: '0.8rem 1.5rem 0rem 1.5rem' }}>
					<Typography variant="subtitle1" sx={{ fontFamily: "inherit" }}>
						<strong>{doubt.content}</strong>
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ fontFamily: "inherit" }}
					>
						{doubt.answers.length}
						{doubt.answers.length < 2 ? " Answer" : " Answers"}
					</Typography>
				</CardContent>
				{doubt.author._id !== id && <Box sx={{ padding: '0.4rem 0rem 1rem 1rem' }}>
					<Button
						variant="contained"
						component="p"
						sx={{
							marginX: 1,
							backgroundColor: "white",
							borderRadius: "20px",
							textTransform: "none",
							color: 'black',
							boxShadow: "none",
							":hover": { backgroundColor: '#f8fafc' },
						}}
						onClick={() => {
							setOpen(true)
						}}
					>
						Give Answer
					</Button>
				</Box>}
			</Card>
		</>
	)
}

export default ProfileQuestionComponent
