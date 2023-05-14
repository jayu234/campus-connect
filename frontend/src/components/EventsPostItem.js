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

import { Button, Divider, Menu, MenuItem } from "@mui/material"
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
			sx={{
				marginTop: "1rem",
				width: "100%",
				display: "flex",
				boxShadow: "none",
				justifyContent: "space-between",
			}}
		>
			<Box>
				<CardContent sx={{ padding: "1rem 1.5rem" }}>
					<Typography
						sx={{
							fontFamily: "inherit",
							fontWeight: "500",
							fontSize: "1.5rem",
							cursor: "pointer"
						}}
						onClick={()=>{navigate(`/event/${post._id}`)}}
					>
						{post.title}
					</Typography>
					<Typography
						sx={{
							fontFamily: "inherit",
							color: "black",
							fontSize: "1.1rem",
							marginTop: "0.5rem",
						}}
					>
						Time : {formattedTime}
					</Typography>
					<Typography
						sx={{
							fontFamily: "inherit",
							color: "black",
							fontSize: "1.1rem",
						}}
					>
						Date : {` ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
					</Typography>
				</CardContent>

				<CardActions
					sx={{ display: "flex", padding: "0.3rem 2rem" }}
					disableSpacing
				>
					<Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
						<IconButton color={"black"} onClick={handleToggleLikeUnlike}>
							{isLiked ? <BsHeartFill size={23} color='#757575' /> : <BsHeart size={23} color='#757575' />}
						</IconButton>
						{likes > 0 && <Typography color={"black"} component={"span"} variant="body1" fontFamily={"inherit"} marginRight={"1rem"}>
							{likes}
						</Typography>}
					</Box>
				</CardActions>
			</Box>
			{post.image && <Box
				component="img"
				sx={{
					height: 200,
					width: 400,
					margin: "1rem",
					borderRadius: "1rem",
					maxHeight: { xs: 200, md: 300 },
					maxWidth: { xs: 200, md: 300 },
				}}
				alt="The house from the offer."
				src={post.image.url}
			/>}
		</Card>
	)
}
