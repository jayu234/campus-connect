import React, { useEffect, useState } from "react"
import { Grid, Box, Avatar, TextField, Button, Divider, CircularProgress, Typography } from "@mui/material"
import ReplayIcon from '@mui/icons-material/Replay';
import EventsPostItem from "./EventsPostItem"
import { useDispatch, useSelector } from "react-redux"
import { getAllEvents } from "../store/eventSlice";

function EventsPost() {
	const { allEvents: { data, isLoading, isError, message, success } } = useSelector((state) => state.event);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllEvents())
	}, [dispatch])
	return (
		<>
			<Box>
				{_renderContent()}
			</Box>
		</>
	)
	function _renderContent() {
		if (isLoading) {
			<Box component={'div'} mt={'1rem'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
				<CircularProgress size={30} />
				<Typography>Loading...</Typography>
			</Box>
		}
		else if (success) {
			return (
				data.map((item) => {
					return (
						<EventsPostItem key={item._id} post={item} />
					)
				})
			)
		}
		else if (isError) {
			return (
				<Box component={'div'} mt={'1rem'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
					<Typography align='center'>Sorry, something went wrong.<br />Please refresh the page and try again.</Typography>
					<Button variant="contained" sx={{ marginTop: "0.5rem", textTransform: 'none', borderRadius: '50px' }} startIcon={<ReplayIcon fontSize='20px' />} onClick={() => { window.location.reload() }}>Refresh</Button>
				</Box>
			)
		}
	}
}

export default EventsPost
