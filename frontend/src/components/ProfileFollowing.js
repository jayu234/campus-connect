import React from "react"
import {
	Card,
	CardContent,
	CardActions,
	CardMedia,
	Grid,
	Typography,
	Button,
} from "@mui/material"
import { topics } from "../data/topics"

function ProfileFollowing() {
	const temp1 = topics.map((item) => ({ ...item, following: true }))
	const temp2 = topics.map((item) => ({ ...item, following: false }))
	const [followingTopics, setFollowingTopics] = React.useState(temp1)
	const [suggestedTopics, setSuggestedTopics] = React.useState(temp2)
	const handleFollowingBtnChange = (topic) => {
		let newTopics
		if (topic.following) {
			newTopics = followingTopics.map((item) =>
				item._id === topic._id ? { ...item, following: false } : item
			)
		} else {
			newTopics = followingTopics.map((item) =>
				item._id === topic._id ? { ...item, following: true } : item
			)
		}
		setFollowingTopics(newTopics)
	}
	const handleSuggestedTopicChange = (topic) => {
		let newTopics
		if (topic.following) {
			newTopics = suggestedTopics.map((item) =>
				item._id === topic._id ? { ...item, following: false } : item
			)
		} else {
			newTopics = suggestedTopics.map((item) =>
				item._id === topic._id ? { ...item, following: true } : item
			)
		}
		setSuggestedTopics(newTopics)
	}
	return (
		<Grid container component={"section"} mb={2} spacing={1} rowSpacing={2} >
			{followingTopics.map((topic) => {
				return (
					<Grid key={topic._id} item xs={4} sx={{display:'flex', justifyContent:'center'}}>
						<Card
							sx={{
								maxWidth: 270,
								border: "1px solid #e2e8f0cc",
								borderRadius: "0.5rem",
								cursor: "pointer",
							}}
						>
							<CardMedia
								component="img"
								alt="Web Developement"
								height="140"
								image={`/images/${topic.imgName}.jpg`}
							/>
							<CardContent>
								{topic.label}
								<Typography
									variant="body2"
									color="text.secondary"
									fontFamily={"inherit"}
								>
									{topic.description}
								</Typography>
							</CardContent>
							<CardActions
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "flex-end",
								}}
							>
								<Button
									id={topic._id}
									tabIndex={topic._id}
									onClick={() => {
										handleFollowingBtnChange(topic)
									}}
									size="small"
									variant={topic.following ? "outlined" : "contained"}
									sx={{ textTransform: "none", fontFamily: "inherit" }}
									disableTouchRipple
								>
									{topic.following ? "Following" : "Follow"}
								</Button>
								<Button
									size="small"
									sx={{ textTransform: "none", fontFamily: "inherit" }}
								>
									Learn More
								</Button>
							</CardActions>
						</Card>
					</Grid>
				)
			})}
		</Grid>
	)
}

export default ProfileFollowing
	