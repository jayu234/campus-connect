import React, { useState } from "react"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import { BsHeart, BsHeartFill } from "react-icons/bs"

import { Button, Divider, IconButton } from "@mui/material"
import { Box } from "@mui/system"
import { useSelector } from "react-redux"
import axios from "axios"

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function AnswerItem({ answer }) {
	const { loadUser } = useSelector((state) => state.user);
	const userId = loadUser.data._id;
	const [isLiked, setIsLiked] = useState(answer.likes.includes(userId));
	const [likes, setLikes] = useState(answer.likes.length);
	const handleToggleLikeUnlike = async () => {
		if (isLiked) {
			setIsLiked(false);
			setLikes(likes - 1);
			await axios.post(`${process.env.REACT_APP_BASE_URL}/answer/like/${answer._id}`).catch((err) => {
				setLikes(likes + 1);
				setIsLiked(true);
				console.log("Falied to unlike answer", err);
			});
		} else {
			setIsLiked(true);
			setLikes(likes + 1);
			await axios.post(`${process.env.REACT_APP_BASE_URL}/answer/like/${answer._id}`).catch((err) => {
				setLikes(likes - 1);
				setIsLiked(false);
				console.log("Falied to like answer", err);
			});
		}
	}
	const date = new Date(answer.createdAt);
	return (
		<React.Fragment>
			<Card
				sx={{
					marginTop: { md: "1rem", xs: "0.5rem" },
					width: "100%",
					display: "flex",
					flexDirection: "column",
					boxShadow: "none",
					borderRadius: "16px",
				}}
			>
				<CardHeader
					avatar={
						<Avatar
							src={answer.author.avatar.url}
							aria-label="recipe"
							sx={{ width: { md: "36px", xs: "28px" }, height: { md: "36px", xs: "28px" } }}
						/>
					}
					title={answer.author.firstName + " " + answer.author.lastName}
					subheader={`${answer.author.username} ~ ${months[date.getMonth()]
						} ${date.getDate()}, ${date.getFullYear()}`}
					sx={{ padding: "1rem 1.5rem" }}
					subheaderTypographyProps={{ fontFamily: "inherit", fontSize: { md: "14px", xs: "11px" } }}
					titleTypographyProps={{
						fontFamily: "inherit",
						fontSize: { md: "18px", xs: "12px" },
						fontWeight: "500",
					}}
				/>
				<CardContent sx={{ padding: "0.2rem 1.5rem" }}>
					<Typography
						sx={{
							fontFamily: "inherit",
							fontWeight: "400",
							fontSize: "1.1rem",
							fontSize: { xs: "16px", md: "20px" }
						}}
					>
						{answer.content}
					</Typography>
				</CardContent>
				<CardActions
					sx={{ display: "flex", padding: { md: "0.3rem 2rem", xs: "0.2rem 1.5rem" } }} disableSpacing
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
			</Card>
		</React.Fragment>
	)
}

export default AnswerItem
