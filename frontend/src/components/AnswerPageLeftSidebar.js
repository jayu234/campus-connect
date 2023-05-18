import React from "react"
import { Grid, Box, Avatar, TextField, Button, Divider, Typography } from "@mui/material"
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
				{data.length > 0 ? data?.map((item, index) => {
					return (
						<ListItemButton
							key={index}
							sx={{ ":hover": { backgroundColor: "#E2E8F0" } }}
							onClick={()=>{navigate(`/question/${item._id}`)}}
						>
							<ListItemText
								primary={item.content}
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
