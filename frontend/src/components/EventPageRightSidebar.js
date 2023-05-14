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
			<Box sx={{ marginBottom: "7rem" }}>
				<Box
					sx={{
						backgroundColor: "white",
						borderRadius: "1rem",
						border: "1px solid #e2e8f0cc",
						":hover": { borderColor: "#29a9f2" },
					}}
				>
					<Box
						sx={{
							textAlign: "center",
							marginY: "1rem",
							fontSize: "1.5rem",
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
					<Box
						component="img"
						sx={{
							height: 400,
							width: "100%",
							borderRadius: "1rem",
						}}
						alt="The house from the offer."
						src={data.image.url}
					/>
					<CardContent sx={{ padding: "0rem 1.5rem", marginTop: "1rem" }}>
						<Typography
							variant="body1"
							color="text"
							sx={{
								fontFamily: "inherit",
								textAlign: "justify",
								fontSize: "1.25rem",
								fontWeight: "500",
								marginY: "0.5rem"
							}}
						>
							{data.title}
						</Typography>
						<Typography
							variant="body1"
							color="text"
							sx={{ fontFamily: "inherit", textAlign: "justify", marginBottom: "0.5rem" }}
						>
							{data.description}
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
						<Typography
							sx={{
								fontFamily: "inherit",
								color: "black",
								fontSize: "1.1rem",
							}}
						>
							Location : {data.location.label}
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
					<Divider />
				</Card>
			</Box>
		</>
	)
}

export default EventPageRightSidebar
