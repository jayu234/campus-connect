import React, { useState } from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Typography from "@mui/material/Typography"
import { Button, Divider, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { BsHeart, BsHeartFill } from "react-icons/bs"

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

function EventPageRightSidebar({ data }) {
	const { loadUser } = useSelector((state) => state.user);
	const userId = loadUser.data._id;
	const [isLiked, setIsLiked] = useState(data.likes.includes(userId));
	const [likes, setLikes] = useState(data.likes.length);
	const navigate = useNavigate();
	const handleToggleLikeUnlike = async () => {
		if (isLiked) {
			setIsLiked(!isLiked);
			setLikes(likes - 1);
			await axios.post(`${process.env.REACT_APP_BASE_URL}/event/like/${data._id}`).catch((err) => {
				setLikes(likes + 1);
				setIsLiked(!isLiked);
				console.log("Falied to unlike post", err);
			});
		} else {
			setIsLiked(!isLiked);
			setLikes(likes + 1);
			await axios.post(`${process.env.REACT_APP_BASE_URL}/event/like/${data._id}`).catch((err) => {
				setLikes(likes - 1);
				setIsLiked(!isLiked);
				console.log("Falied to like post", err);
			});
		}
	}
	const date = new Date(data.createdAt);
	const options = { hour: 'numeric', hour12: true };
	const timeString = date.toLocaleString('en-US', options);
	const [time, period] = timeString.split(' ');
	const formattedTime = `${time} ${period}`;
	return (
		<>
			<Box sx={{ marginBottom: { md: "7rem", xs: "2rem" } }}>
				<Box
					sx={{
						backgroundColor: "white",
						borderRadius: "1rem",
						border: "1px solid #e2e8f0cc"
					}}
				>
					<Box
						sx={{
							textAlign: "center",
							marginY: "1rem",
							marginX: { xs: "1rem", md: "0" },
							fontSize: { md: "1.5rem", xs: "20px" },
							fontWeight: "500",
						}}
					>
						{data.title}
					</Box>
				</Box>

				<Card
					sx={{
						marginTop: "1rem",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						boxShadow: "none",
					}}
				>
					{data.image && <Box
						component="img"
						sx={{
							height: { md: 400, xs: 'auto' },
							width: { md: "100%", xs: '90%' },
							borderRadius: "1rem",
							marginX: { xs: 'auto' },
							marginTop: { xs: '1rem' }
						}}
						alt="Event poster"
						src={data.image.url}
					/>}
					<CardContent sx={{ padding: "0rem 1.5rem", marginTop: "1rem" }}>
						<Typography
							variant="body1"
							color="text"
							sx={{
								fontFamily: "inherit",
								textAlign: {md: "justify", xs: "center"},
								fontSize: { md: "1.25rem", xs: "16px" },
								fontWeight: "500",
								marginY: "0.5rem"
							}}
						>
							{data.title}
						</Typography>
						<Typography
							variant="body1"
							color="text"
							sx={{ fontFamily: "inherit", textAlign: "justify", marginBottom: "0.5rem", fontSize: { md: "16px", xs: "14px" } }}
						>
							{data.description}
						</Typography>
						<Typography
							sx={{
								fontFamily: "inherit",
								color: "black",
								fontSize: { md: "16px", xs: "14px" },
								marginTop: "0.5rem",
							}}
						>
							Time : {formattedTime}
						</Typography>
						<Typography
							sx={{
								fontFamily: "inherit",
								color: "black",
								fontSize: { md: "16px", xs: "14px" },
							}}
						>
							Date : {` ${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`}
						</Typography>
						<Typography
							sx={{
								fontFamily: "inherit",
								color: "black",
								fontSize: { md: "16px", xs: "14px" },
							}}
						>
							Location : {data.location.label}
						</Typography>
					</CardContent>

					<CardActions
						sx={{ display: "flex", padding: "0.3rem 1rem" }}
						disableSpacing
					>
						<Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
							<IconButton color={"black"} onClick={handleToggleLikeUnlike} sx={{ width: { xs: "32px", md: "36px" } }}>
								{isLiked ? <BsHeartFill /> : <BsHeart />}
							</IconButton>
							{likes > 0 && <Typography color={"black"} component={"span"} variant="body1" fontFamily={"inherit"} marginRight={"1rem"} sx={{ textTransform: "none", fontSize: { xs: "14px", md: "16px" }, marginRight: { md: "1rem", xs: "0.5rem" } }}>
								{likes}
							</Typography>}
						</Box>
					</CardActions>
					<Divider />
				</Card>
			</Box>
		</>
	)
}

export default EventPageRightSidebar
