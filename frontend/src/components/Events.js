import React, { useEffect, useState } from 'react'
import Box from "@mui/material/Box"
import { Button, CardContent, CardHeader, CardMedia, CircularProgress, IconButton, Tab, Tabs, Typography } from "@mui/material"
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EventModal from './EventModal';
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch, useSelector } from 'react-redux';
import { getAllEvents } from '../store/eventSlice';
import EventsPostItem from './EventsPostItem';
import PropTypes from 'prop-types';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box>
					{children}
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}


function Events() {
	const [open, setOpen] = useState(false);

	const [value, setValue] = React.useState(0);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const { nearbyEvents } = useSelector((state) => state.event);
	const { allEvents: { data, isLoading, isError, message, success } } = useSelector((state) => state.event);
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getAllEvents())
	}, [dispatch])
	return (
		<React.Fragment>
			{open && (
				<EventModal open={open} setOpen={setOpen} />
			)}
			<Box sx={{ display: { md: 'block', xs: 'none' } }}>
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: { xs: 'relative' } }} >
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
							fontSize: "14px",
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
							position: { xs: "fixed" },
							right: "1rem",
							bottom: "1rem",
							backgroundColor: "#2563EB",
							textTransform: "none",
							fontFamily: "inherit",
						}}
						onClick={() => { setOpen(true) }}
					><AddRoundedIcon /></IconButton>
				</Box>
				<Box>
					{_renderContent(data)}
				</Box>
			</Box>
			<Box sx={{ display: { md: 'none', xs: 'block' } }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider', paddingX: "1rem" }}>
					<Tabs value={value} onChange={handleChange} aria-label="events navigation">
						<Tab disableFocusRipple disableTouchRipple label="Nearby Events" {...a11yProps(0)} sx={{ textTransform: 'none', fontFamily: "inherit" }} />
						<Tab disableFocusRipple disableTouchRipple label="Upcoming Events" {...a11yProps(1)} sx={{ textTransform: 'none', fontFamily: "inherit" }} />
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<Box>
						{_renderContent(nearbyEvents.data)}
					</Box>
				</TabPanel>
				<TabPanel value={value} index={1}>
					<Box>
						{_renderContent(data)}
					</Box>
				</TabPanel>
			</Box>
		</React.Fragment>
	)
	function _renderContent(events) {
		if (isLoading) {
			<Box component={'div'} mt={'1rem'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
				<CircularProgress size={30} />
				<Typography>Loading...</Typography>
			</Box>
		}
		else if (success) {
			return (
				events.length > 0 ? (events.map((item) => {
					return (
						<EventsPostItem key={item._id} post={item} />
					)
				})) : (<Typography fontFamily={'inherit'} align={'center'} mt={1}>No data to display.</Typography>)
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

export default Events