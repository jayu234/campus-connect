import React from "react"
import { Grid, Box, Avatar, TextField, Button, Divider } from "@mui/material"
import { events } from "../data/events"
import { List, ListItemButton, ListItemIcon, ListItemText, } from "@mui/material"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

function EventPageLeftSidebar({ id }) {
	const { allEvents: { data } } = useSelector((state) => state.event);
	const newEvents = data?.filter((item) => item._id !== id );
	const navigate = useNavigate();
	return (
		<>
			<Box sx={{ marginX: "1rem", marginY: "1rem", fontSize: '1.2rem', fontWeight: '500' }}> 🔥 Events in your Area </Box>
			<Divider />
			<Box>
				{newEvents.map((item, index) => {
					return (
						<ListItemButton
							key={index}
							sx={{ ":hover": { backgroundColor: "#E2E8F0" } }}
							onClick={() => { navigate(`/event/${item._id}`) }}
						>
							<ListItemText
								primary={item.title}
								sx={{ fontSize: "14px" }}
								primaryTypographyProps={{ fontFamily: "inherit" }}
							/>
						</ListItemButton>
					)
				})}
			</Box>
		</>
	)
}

export default EventPageLeftSidebar
