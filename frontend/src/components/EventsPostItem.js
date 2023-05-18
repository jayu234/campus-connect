import React, { } from "react"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { CardMedia, Card, CardContent, CardActions, IconButton, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

export default function EventsPostItem({ post }) {
	const { loadUser } = useSelector((state) => state.user);
	const userId = loadUser.data._id;
	const [isLiked, setIsLiked] = React.useState(post.likes.includes(userId));
	const [likes, setLikes] = React.useState(post.likes.length);
	const navigate = useNavigate();
	const handleToggleLikeUnlike = async () => {
		if (isLiked) {
			setIsLiked(!isLiked);
			setLikes(likes - 1);
			await axios.post(`${process.env.REACT_APP_BASE_URL}/event/like/${post._id}`).catch((err) => {
				setLikes(likes + 1);
				setIsLiked(!isLiked);
				console.log("Falied to unlike post", err);
			});
		} else {
			setIsLiked(!isLiked);
			setLikes(likes + 1);
			await axios.post(`${process.env.REACT_APP_BASE_URL}/event/like/${post._id}`).catch((err) => {
				setLikes(likes - 1);
				setIsLiked(!isLiked);
				console.log("Falied to like post", err);
			});
		}
	}
	const date = new Date(post.createdAt);
	const options = { hour: 'numeric', hour12: true };
	const timeString = date.toLocaleString('en-US', options);
	const [time, period] = timeString.split(' ');
	const formattedTime = `${time} ${period}`;
	return (
		<Card sx={{ display: "flex", width: { xs: "auto", md: "100%" }, padding: { xs: "0.5rem 0.5rem 0 0.5rem", md: 0 }, marginX: { xs: "0.5rem", md: 0 }, marginTop: "1rem", boxShadow: "none", justifyContent: "space-between", flexDirection: { xs: "column-reverse", md: "row" } }}>
			<Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"}>
				<CardContent sx={{ padding: { md: "1rem 1.5rem", xs: "0.5rem 1rem 0" } }}>
					<Typography
						sx={{
							fontFamily: "inherit",
							fontWeight: "500",
							fontSize: { md: "24px", xs: "16px" },
							cursor: "pointer"
						}}
						onClick={() => { navigate(`/event/${post._id}`) }}
					>
						{post.title}
					</Typography>
					<Typography
						color={"text.secondary"}
						sx={{
							fontFamily: "inherit",
							fontSize: { xs: "14px", md: "18px" },
							marginTop: { xs: "0.5rem", md: "1.5rem" },
						}}
					>
						Time : {formattedTime}
					</Typography>
					<Typography
						color={"text.secondary"}
						sx={{
							fontFamily: "inherit",
							fontSize: { xs: "14px", md: "18px" },
						}}
					>
						Date : {` ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
					</Typography>
				</CardContent>

				<CardActions sx={{ display: "flex", marginY: { md: "0.75rem", xs: 0 }, padding: { md: "0.3rem 1.5rem" } }} disableSpacing >
					<Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
						<IconButton color={"black"} onClick={handleToggleLikeUnlike} sx={{ width: { xs: "32px", md: "36px" }, ":hover": { backgroundColor: "transparent" } }} disableTouchRipple>
							{isLiked ? <BsHeartFill /> : <BsHeart />}
						</IconButton>
						{likes > 0 && <Typography color={"black"} component={"span"} variant="body1" fontFamily={"inherit"} marginRight={"1rem"} sx={{ textTransform: "none", fontSize: { xs: "14px", md: "16px" }, marginRight: { md: "1rem", xs: "0.5rem" } }}>
							{likes}
						</Typography>}
					</Box>
				</CardActions>
			</Box>
			{post.image && <CardMedia
				component="img"
				sx={{
					width: { xs: '90%', md: "300px" },
					height: { md: "200px", xs: "auto" },
					margin: { xs: 'auto', md: "1rem" },
					borderRadius: "12px",
				}}
				alt="event_pic"
				image={post.image.url}
			/>}
		</Card>
	)
}
