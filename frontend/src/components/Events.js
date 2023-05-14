import React, { useState } from 'react'
import Box from "@mui/material/Box"
import { Button } from "@mui/material"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EventsPost from "./EventsPost"
import EventModal from './EventModal'

function Events() {
	const [open, setOpen] = useState(false);
	return (
		<React.Fragment>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} >
				{open && (
					<EventModal open={open} setOpen={setOpen} />
				)}
				<Box
					sx={{
						display: "flex",
						width: "100%",
						marginY: '1rem',
						fontSize: "1.3rem",
						fontWeight: "600",
						background: "#fff",
						borderRadius: "0.5rem",
						height: "3rem",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					🔥 Upcoming Events
				</Box>
				<Button
					variant="contained"
					sx={{
						width: "100%",
						flexShrink: "4",
						marginX: "1rem",
						backgroundColor: "#2563EB",
						textTransform: "none",
						boxShadow: "none",
						fontFamily: "inherit",
						":hover": { boxShadow: "none" }
					}}
					startIcon={<AddRoundedIcon />}
					onClick={() => { setOpen(true) }}
				>
					Add Event
				</Button>
			</Box>
			<EventsPost />
		</React.Fragment>
	)
}

export default Events