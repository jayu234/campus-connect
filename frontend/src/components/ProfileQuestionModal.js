import React, { useEffect, useState } from "react"
import { Box, Grid, Modal, Typography, Avatar, TextField, Button, IconButton, CircularProgress } from "@mui/material"
import CloseRoundedIcon from "@mui/icons-material/CloseRounded"
import { useDispatch, useSelector } from "react-redux"
import { createAnswer, resetNewAnswerState } from "../store/answerSlice"

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 600,
	bgcolor: "background.paper",
	border: "1px solid #cecece",
	boxShadow: 24,
	borderRadius: "10px",
	p: 2,
}

function ProfileQuestionModal({ open, setOpen, doubt, answerCount = 0, setAnswerCount }) {
	const [text, setText] = useState("");
	const dispatch = useDispatch();
	const { newAnswer: { isLoading, success, isError, message } } = useSelector((state) => state.answer);
	const handleAnswerSubmit = () => {
		const data = { doubt: doubt._id, content: text }
		dispatch(createAnswer(data));
	}
	useEffect(() => {
		if (success) {
			setOpen(false);
			setAnswerCount(answerCount + 1);
			dispatch(resetNewAnswerState());
		}
	}, [isLoading])
	return (
		<Modal
			open={open}
			onClose={() => {
				setOpen(false)
			}}
			aria-labelledby="keep-mounted-modal-title"
			aria-describedby="keep-mounted-modal-description"
		>
			<Box sx={style}>
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<IconButton onClick={() => { setOpen(false) }}>
						<CloseRoundedIcon sx={{ width: 20, height: 20 }} />
					</IconButton>
				</Box>
				<Box sx={{ padding: "0rem 1rem 3rem 1rem" }}>
					<Grid container>
						<Grid item component={"aside"} xs={1.1}>
							<Avatar
								alt="Profile pic"
								src={doubt.author.avatar.url}
								sx={{ cursor: "pointer" }}
							/>
						</Grid>
						<Grid item xs={7.5} sx={{ marginTop: "0.5rem" }}>
							<Typography variant="body1" fontFamily={"inherit"}>
								{doubt.author.firstName + " " + doubt.author.lastName}
							</Typography>
						</Grid>
					</Grid>

					<Box sx={{ marginTop: "1rem", fontSize: "18px" }}>
						<Typography variant="h6" fontFamily={'inherit'} fontWeight={500}>
							{doubt.content}
						</Typography>
					</Box>

					<Box
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							columnGap: "1rem",
							marginTop: "1rem",
						}}
					>
						<TextField
							onChange={(e) => {
								setText(e.target.value)
							}}
							multiline
							fullWidth
							variant="standard"
							placeholder="Write your answer"
							sx={{ borderRadius: "16px" }}
							InputProps={{
								sx: {
									"& .MuiInputBase-input": {
										textTransform: 'none',
										fontFamily: "'Inter', sans-serif",
										fontSize: "16px"
									}
								}
							}}
						/>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "flex-end",
						columnGap: "1rem",
						marginTop: "0.5rem",
						position: 'relative'
					}}
				>
					<Button
						onClick={() => {
							setOpen(false)
						}}
						variant="text"
						sx={{ textTransform: "none" }}
					>
						Cancel
					</Button>
					{isLoading && <CircularProgress
						size={24}
						sx={{
							position: "absolute",
							bottom: "10%",
							right: "3%",
						}}
					/>}
					<Button
						disabled={!text.length || isLoading}
						onClick={handleAnswerSubmit}
						variant="contained"
						sx={{ textTransform: "none" }}
					>
						Post
					</Button>
				</Box>
			</Box>
		</Modal>
	)
}

export default ProfileQuestionModal
