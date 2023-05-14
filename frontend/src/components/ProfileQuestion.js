import React, { useEffect } from "react"
import { Box, Button, CircularProgress, Typography } from "@mui/material"
import ReplayIcon from '@mui/icons-material/Replay';
import ProfileQuestionComponent from "./ProfileQuestionComponent"
import { useDispatch, useSelector } from "react-redux"
import { getMyDoubts } from "../store/doubtSlice"

function ProfileQuestion() {
	const dispatch = useDispatch();
	const {myDoubts: { data, isLoading, success, isError}} = useSelector((state)=>state.doubt);
	const { loadUser: { data: { _id } } } = useSelector((state) => state.user);
	useEffect(()=>{
		dispatch(getMyDoubts(_id));
	},[dispatch])
	return (
		<Box>
			{_renderContent()}
		</Box>
	)
	function _renderContent() {
		if (isLoading) {
			return (
				<Box component={'div'} mt={'1rem'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
					<CircularProgress size={30} />
					<Typography>Loading...</Typography>
				</Box>
			)
		}
		else if (success) {
			return (data.length > 0 ? (data.map((item) => {
				return <ProfileQuestionComponent key={item._id} doubt={item} />
			})) : (
				<Typography align="center" fontFamily={'inherit'}>No data to display.</Typography>
			))
		}
		else if (isError) {
			return (<Box component={'div'} mt={'1rem'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
				<Typography align='center' fontFamily={'inherit'}>Sorry, something went wrong.<br />Please refresh the page and try again.</Typography>
				<Button variant="contained" sx={{ marginTop: "0.5rem", textTransform: 'none', borderRadius: '50px' }} startIcon={<ReplayIcon fontSize='20px' />} onClick={() => { window.location.reload() }}>Refresh</Button>
			</Box>)
		}
	}
}

export default ProfileQuestion
