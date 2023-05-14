import React, { useState } from 'react'
import Box from "@mui/material/Box"
import { Button, IconButton } from "@mui/material"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EventsPost from "./EventsPost"
import EventModal from './EventModal'

function Events() {
	const [open, setOpen] = useState(false);
	return (
		<React.Fragment>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: {xs: 'relative'} }} >
				{open && (
					<EventModal open={open} setOpen={setOpen} />
				)}
				<Box
					sx={{
						display: "flex",
						width: "100%",
						marginY: { md: '1rem', xs: '0.5rem' },
						fontSize: { xs: "18px", md: "20px" },
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
						display: { xs: "none", sm: "flex" },
						width: "100%",
						flexShrink: "4",
						marginX: "1rem",
						backgroundColor: "#2563EB",
						textTransform: "none",
						boxShadow: "none",
						fontFamily: "inherit",
						fontSize:  "18px",
						":hover": { boxShadow: "none" }
					}}
					startIcon={<AddRoundedIcon />}
					onClick={() => { setOpen(true) }}
				>
					Add Event
				</Button>
				<IconButton
					variant="contained"
					sx={{
						color: "#fff",
						display: { xs: "flex", sm: "none" },
						visibility: open ? 'hidden' : 'visible',
						position: {xs: "fixed"},
						right: "1rem",
						bottom: "1rem",
						backgroundColor: "#2563EB",
						textTransform: "none",
						fontFamily: "inherit",
					}}
					onClick={() => { setOpen(true) }}
				><AddRoundedIcon/></IconButton>
			</Box>
			<EventsPost />
		</React.Fragment>
	)
}

export default Events