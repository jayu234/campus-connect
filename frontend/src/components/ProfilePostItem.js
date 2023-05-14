import * as React from "react"
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
import PostItem from "./PostItem"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { FiShare2 } from "react-icons/fi"
import { useState } from "react"


import { useSelector } from "react-redux"
import axios from "axios"

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

export default function ProfilePostItem({ post }) {
	const [anchorEl, setAnchorEl] = React.useState(null)
	const { loadUser } = useSelector((state) => state.user)


	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const userId = loadUser.data._id

	const [isLiked, setIsLiked] = useState(post.likes.includes(userId))
	const [likes, setLikes] = useState(post.likes.length)


	const handleToggleLikeUnlike = async () => {
		if (isLiked) {
			setIsLiked(!isLiked)

			setLikes(likes - 1)
			await axios
				.post(`${process.env.REACT_APP_BASE_URL}/post/like/${post._id}`)
				.catch((err) => {
					setLikes(likes + 1)
					console.log("Falied to unlike post", err)
				})
		} else {
			setIsLiked(!isLiked)
			setLikes(likes + 1)
			await axios
				.post(`${process.env.REACT_APP_BASE_URL}/post/like/${post._id}`)
				.catch((err) => {
					setLikes(likes - 1)
					console.log("Falied to like post", err)
				})
		}
	}

	async function sharePost({ title, text, url }) {
		if (navigator.share) {
			try {
				await navigator.share({ title, text, url })
			} catch (e) {
				console.log("Error while sharing the post", e)
			}
		}
	}

	const date = new Date(post.createdAt)
	return (
		<Box key={post._id} sx={{ marginBottom: "1rem" }}>
			<Card
				sx={{
					marginTop: "0.2rem",
					display: "flex",
					flexDirection: "column",
					boxShadow: "none",
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
				<CardContent sx={{ padding: "0rem 1.5rem" }}>
					<Typography
						variant="h5"
						sx={{ fontFamily: "inherit", fontWeight: "500" }}
					>
						{post.title}
					</Typography>
					<Typography
						variant="body1"
						color="text.secondary"
						sx={{ fontFamily: "inherit", textAlign: "justify" }}
					>
						{post.content}
					</Typography>
				</CardContent>
				{post.images.length > 0 && (
					<Box
						component="img"
						sx={{
							marginBottom: "0rem",
							marginTop: "1rem",
							height: 500,
							width: 800,
							maxHeight: { xs: 400, md: 1000 },
							maxWidth: { xs: 400, md: 862 },
						}}
						alt="post_image"
						src={post.images[0].url}
					/>
				)}
				<CardActions
					sx={{ display: "flex", padding: "0.3rem 2rem" }}
					disableSpacing
				>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<IconButton onClick={handleToggleLikeUnlike}>
							{isLiked ? (
								<BsHeartFill size={23} color="#1A64CC" />
							) : (
								<BsHeart size={23} color="#1A64CC" />
							)}
						</IconButton>
						{likes > 0 && (
							<Typography
								component={"span"}
								variant="body1"
								fontFamily={"inherit"}
								marginRight={"1rem"}
							>
								{likes}
							</Typography>
						)}
						<IconButton
							onClick={() => {
								sharePost({
									title: post.title,
									url: `${process.env.REACT_APP_HOST}/post/${post._id}`,
								})
							}}
						>
							<FiShare2 color="#1A64CC" />
						</IconButton>
					</Box>
				</CardActions>
				<Divider />
			</Card>
		</Box>
	)
}
