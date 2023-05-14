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

function ProfileAnswerComponent({ post }) {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const date = new Date(post.createdAt)
	return (
		<>
			<Card
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "column",
					backgroundColor: "#f8fafc",
					marginBottom: "1rem",
				}}
			>
				<CardHeader
					avatar={<Avatar src={post.author.avatar.url} aria-label="recipe" />}
					title={post.author.firstName + " " + post.author.lastName}
					subheader={`${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
					sx={{ padding: "1rem 1rem 0rem 1.4rem" }}
					subheaderTypographyProps={{ textTransform: "none", fontFamily: "inherit" }}
					titleTypographyProps={{ textTransform: "none", fontFamily: "inherit", fontWeight: "3" }}
				/>
				<CardContent sx={{ padding: "0.5rem 1.5rem 0rem 1.5rem" }}>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ textTransform: "none", fontFamily: "inherit" }}
					>
						{post.content}
					</Typography>
				</CardContent>
			</Card>
		</>
	)
}

export default ProfileAnswerComponent
