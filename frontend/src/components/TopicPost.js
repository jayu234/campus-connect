import React, { useEffect, useState } from "react"
import { Grid, Box, Avatar, TextField, Button, Divider, Typography } from "@mui/material"
import TopicPostItem from "./TopicPostItem"
import { useSelector } from "react-redux"
import ProfileQuestionComponent from "./ProfileQuestionComponent"
import AnswerPageComponent from "./AnswerPageComponent"
import AnswerPost from "./AnswerPost"

function TopicPost() {
	const { topic: { data } } = useSelector((state) => state.topic);
	const temp = data?.doubts?.map((item) => { return { ...item, type: 'doubt' } });
	function shuffleArray() {
		const array = [].concat(temp).concat(data?.posts);
		return new Promise((resolve, reject) => {
			for (let i = array.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
			}
			resolve(array);
		});
	}
	const [newPosts, setNewPosts] = useState([]);
	useEffect(() => {
		shuffleArray().then((arr) => { setNewPosts(arr) }).catch((err) => { setNewPosts([]); console.log(err); })
	}, [])
	return (
		<>
			<Box>
				{newPosts.length > 0 ? newPosts.map((item) => {
					if (item?.type === "doubt") {
						return <AnswerPost key={item._id} item={item} />
					}
					return <TopicPostItem key={item._id} post={item} />
				}) : <Typography align="center" fontFamily="inherit">
					No data to display.
				</Typography>}
			</Box>
		</>
	)
}

export default TopicPost
