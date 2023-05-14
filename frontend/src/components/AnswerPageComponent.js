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
import { BsHeart } from "react-icons/bs"

import { Button, Divider, Menu, MenuItem } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import ShareIcon from "@mui/icons-material/Share"
import { Box } from "@mui/system"

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

function AnswerPageComponent({ post }) {
	const date = new Date(post.createdAt)
	return (
		<React.Fragment>
			<Card
				sx={{
					marginTop: "1rem",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					boxShadow: "none",
					borderRadius: "1rem",
				}}
			>
				<CardHeader
					avatar={
						<Avatar
							src={post.author.avatar.url}
							aria-label="recipe"
							sx={{ width: "3rem", height: "3rem" }}
						/>
					}
					title={post.author.firstName + " " + post.author.lastName}
					subheader={`${post.author.username} ~ ${
						months[date.getMonth()]
					} ${date.getDate()}, ${date.getFullYear()}`}
					sx={{ padding: "1rem 1.5rem 0.7rem 1.5rem" }}
					subheaderTypographyProps={{
						fontFamily: "inherit",
						fontSize: "0.9rem",
					}}
					titleTypographyProps={{
						fontFamily: "inherit",
						fontSize: "1.2rem",
						fontWeight: "500",
					}}
				/>
				<CardContent sx={{ padding: "0.2rem 1.5rem" }}>
					<Typography
						sx={{
							fontFamily: "inherit",
							fontWeight: "400",
							fontSize: "1.1rem",
							textAlign: "justify",
						}}
					>
						{post.content}
					</Typography>
				</CardContent>
				<CardActions
					sx={{
						display: "flex",
						padding: "0rem 1.5rem",
						paddingBottom: "1.3rem",
						marginTop: "0.6rem",
					}}
					disableSpacing
				>
					<Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
						<Button
							component={"div"}
							sx={{
								display: "flex",
								alignItems: "center",
								cursor: "pointer",
								fontSize: "1.1rem",
								paddingX: "2rem",
								borderRadius: "1.5rem",
								color: "#000",
								border: "1px solid #b7b7b7",
							}}
							startIcon={<BsHeart size={23} />}
						>
							{post.likes.length > 0 && post.likes.length}
						</Button>
					</Box>
				</CardActions>
				<Divider />
			</Card>
		</React.Fragment>
	)
}

export default AnswerPageComponent
