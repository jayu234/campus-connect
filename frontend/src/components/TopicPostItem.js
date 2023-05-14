import React, {useState} from "react"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { BsHeart, BsHeartFill } from "react-icons/bs"

import { Button, Divider, Menu, MenuItem } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
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

export default function TopicPostItem({ post }) {
	const { loadUser } = useSelector((state) => state.user);
	const userId = loadUser.data._id;
	const [isLiked, setIsLiked] = useState(post.likes.includes(userId));
	const [likes, setLikes] = useState(post.likes.length);
	const handleToggleLikeUnlike = async () => {
		if (isLiked) {
			setIsLiked(!isLiked);
			setLikes(likes - 1);
			axios.defaults.withCredentials = true
			await axios.post(`${process.env.REACT_APP_BASE_URL}/post/like/${post._id}`).catch((err) => {
				setLikes(likes + 1);
				setIsLiked(!isLiked);
				console.log("Falied to unlike post", err);
			});
		} else {
			setIsLiked(!isLiked);
			setLikes(likes + 1);
			axios.defaults.withCredentials = true
			await axios.post(`${process.env.REACT_APP_BASE_URL}/post/like/${post._id}`).catch((err) => {
				setLikes(likes - 1);
				setIsLiked(!isLiked);
				console.log("Falied to like post", err);
			});
		}
	}
	const date = new Date(post.createdAt)
	return (
		<Card
			sx={{
				marginTop: "1rem",
				width: "100%",
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
				subheader={`${post.author.username} ~ ${months[date.getMonth()]
					} ${date.getDate()}, ${date.getFullYear()}`}
				sx={{ padding: "1rem 1.5rem 0.7rem 1.5rem" }}
				subheaderTypographyProps={{ fontFamily: "inherit", fontSize: "0.9rem" }}
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
			{(post.images.length > 0) && (<Box
				component="img"
				sx={{
					marginBottom: "0rem",
					marginTop: "1rem",
					height: 500,
					width: 1000,
					maxHeight: { xs: 400, md: 1000 },
					maxWidth: { xs: 400, md: 1000 },
				}}
				alt="The house from the offer."
				src={post.images[0].url}
			/>)}
			<CardActions
				sx={{ display: "flex", padding: "0.3rem 2rem" }}
				disableSpacing
			>
				<Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
					<IconButton color={"black"} onClick={handleToggleLikeUnlike}>
						{isLiked ? <BsHeartFill size={23} /> : <BsHeart size={23} />}
					</IconButton>
					{likes > 0 && <Typography color={"black"} component={"span"} variant="body1" fontFamily={"inherit"} marginRight={"1rem"}>
						{likes}
					</Typography>}
				</Box>
			</CardActions>
			<Divider />
		</Card>
	)
}
