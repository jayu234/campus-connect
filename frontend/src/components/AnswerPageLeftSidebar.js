import React from "react"
import { Grid, Box, Avatar, TextField, Button, Divider, Typography } from "@mui/material"
import { relatedquestions } from "../data/relatedquestions"
import { List, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function AnswerPageLeftSidebar() {
	const navigate = useNavigate();
	const { similarDoubts: { data } } = useSelector((state) => state.doubt);
	return (
		<>
			<Box sx={{ marginX: "1rem", marginY: "1rem" }}> 🔥 Related Question</Box>
			<Divider />
			<Box sx={{marginBottom: "0.75rem"}}>
				{data.length > 0 ? data?.map((qn, index) => {
					return (
						<ListItemButton
							key={index}
							sx={{ ":hover": { backgroundColor: "#E2E8F0" } }}
							onClick={()=>{navigate(`/question/${qn._id}`)}}
						>
							<ListItemText
								primary={qn.content}
								sx={{ fontSize: "14px" }}
								primaryTypographyProps={{ fontFamily: "inherit" }}
							/>
						</ListItemButton>
					)
				}): <Typography align="center">No data to display.</Typography>}
			</Box>
		</>
	)
}

export default AnswerPageLeftSidebar
