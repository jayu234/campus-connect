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
import { BsHeart, BsHeartFill } from "react-icons/bs"

import { Button, CardMedia, Divider, Menu, MenuItem } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import ShareIcon from "@mui/icons-material/Share"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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
		<Card
			sx={{ padding: "0.5rem", marginX: "0.5rem", maxWidth: 345, marginTop: "1rem", boxShadow: "none" }}
		// sx={{
		// 	marginTop: "1rem",
		// 	width: "100%",
		// 	display: "flex",
		// 	boxShadow: "none",
		// 	justifyContent: "space-between",
		// }}
		>
			{post.image && <CardMedia
				component="img"
				sx={{
					width: '90%',
					marginX: 'auto',
					height: 200,
					borderRadius: "12px",
				}}
				alt="The house from the offer."
				image={post.image.url}
			/>}
			<CardContent sx={{ padding: {md: "1rem 1.5rem", xs: "0.5rem 1rem 0"} }}>
				<Typography
					sx={{
						fontFamily: "inherit",
						fontWeight: "500",
						fontSize: { md: "30px", xs: "16px" },
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
						fontSize: "14px",
						marginTop: "0.5rem",
					}}
				>
					Time : {formattedTime}
				</Typography>
				<Typography
					color={"text.secondary"}
					sx={{
						fontFamily: "inherit",
						fontSize: "14px",
					}}
				>
					Date : {` ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
				</Typography>
			</CardContent>

			<CardActions sx={{ display: "flex", padding:{md:"0.3rem 2rem"} }} disableSpacing >
				<Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
					<IconButton color={"black"} onClick={handleToggleLikeUnlike} sx={{ width: { xs: "32px", md: "36px" } }}>
						{isLiked ? <BsHeartFill /> : <BsHeart />}
					</IconButton>
					{likes > 0 && <Typography color={"black"} component={"span"} variant="body1" fontFamily={"inherit"} marginRight={"1rem"} sx={{ textTransform: "none", fontSize: { xs: "14px", md: "16px" }, marginRight: { md: "1rem", xs: "0.5rem" } }}>
						{likes}
					</Typography>}
				</Box>
			</CardActions>
		</Card>
	)
}
