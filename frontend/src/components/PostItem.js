import React, { useState } from "react"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import { Divider, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { FiShare2 } from "react-icons/fi"
import { useSelector } from "react-redux"
import axios from "axios"

const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

export default function PostItem({ post }) {
	const { loadUser } = useSelector((state) => state.user)
	const userId = loadUser.data._id
	const [isLiked, setIsLiked] = useState(post.likes.includes(userId))
	const [likes, setLikes] = useState(post.likes.length)
	const date = new Date(post.createdAt)
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
	return (
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
						aria-label="avatar"
						sx={{ width: { md: "36px", xs: "28px" }, height: { md: "36px", xs: "28px" } }}
					/>
				}
				title={post.author.firstName + " " + post.author.lastName}
				subheader={`${post.author.username} ~ ${months[date.getMonth()]
					} ${date.getDate()}, ${date.getFullYear()}`}
				sx={{ padding: "1rem 1.5rem" }}
				subheaderTypographyProps={{ fontFamily: "inherit", fontSize: { md: "14px", xs: "11px" } }}
				titleTypographyProps={{
					fontFamily: "inherit",
					fontSize: { md: "18px", xs: "12px" },
					fontWeight: "500",
				}}
			/>
			<CardContent sx={{ padding: "0rem 1rem" }}>
				<Typography
					variant="h5"
					sx={{ fontFamily: "inherit", fontWeight: "500", fontSize: { xs: "16px", md: "20px" } }}
				>
					{post.title}
				</Typography>
				<Typography
					variant="body1"
					color="text.secondary"
					sx={{ marginTop: {md: "0.5rem", xs: "0.25rem"}, fontFamily: "inherit", textAlign: "justify", fontSize: { xs: "12px", md: "16px" } }}
				>
					{post.content}
				</Typography>
			</CardContent>
			{post.images.length > 0 && (
				<Box
					component="img"
					sx={{
						margin : {md: "1rem 0rem 0rem", xs: "1rem auto 0"},
						height: {md: 500, xs: 'auto'},
						width: {md: 800, xs: 300},
						maxHeight: { xs: 'auto', md: 'auto' },
						maxWidth: { xs: 400, md: 862 },
					}}
					alt="post_image"
					src={post.images[0].url}
				/>
			)}
			<CardActions
				sx={{ display: "flex", padding: { md: "0.3rem 2rem", xs: "0.5rem 1rem" } }}
				disableSpacing
			>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<IconButton onClick={handleToggleLikeUnlike} sx={{ width: { xs: "32px", md: "36px" } }}>
						{isLiked ? (
							<BsHeartFill color="#1A64CC" />
						) : (
							<BsHeart color="#1A64CC" />
						)}
					</IconButton>
					{likes > 0 && (
						<Typography
							component={"p"}
							variant="body1"
							fontFamily={"inherit"}
							sx={{ textTransform: "none", fontSize: { xs: "14px", md: "16px"}, marginRight: { md: "1rem", xs: "0.5rem" } }}
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
						sx={{ width: { xs: "32px", md: "36px" } }}
					>
						<FiShare2 color="#1A64CC" />
					</IconButton>
				</Box>
			</CardActions>
			<Divider />
		</Card>
	)
}
