import React, { useEffect, useState } from "react"
import Header from "./Header"
import ProfileLeftSidebar from "./ProfileLeftSidebar"
import ProfileRightSidebar from "./ProfileRightSidebar"
import { Grid, Box, CircularProgress, Typography, Button } from "@mui/material"
import AnswerPageLeftSidebar from "./AnswerPageLeftSidebar"
import AnswerPageRightSidebar from "./AnswerPageRightSidebar"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDoubtDetails, getSimilarDoubts } from "../store/doubtSlice"
import ReplayIcon from '@mui/icons-material/Replay';

function AnswerPage() {
	const { doubtDetails: { data, isLoading, success, isError } } = useSelector((state) => state.doubt);
	const dispatch = useDispatch();
	const { id } = useParams();
	useEffect(() => {
		dispatch(getSimilarDoubts(id));
		dispatch(getDoubtDetails(id));
	}, [dispatch, id])
	return (
		<>
			<Header iconShow={false}/>
			<Grid
				container
				spacing={2}
				sx={{
					height: "100%",
					display: "flex",
					backgroundColor: "#f8fafc",
				}}
			>
				<Grid item component={"aside"} xs={3.5} sx={{ marginLeft: "3rem" }}>
					<Box
						sx={{
							position: "sticky",
							top: "20px",
							backgroundColor: "white",
							borderRadius: "1rem",
							border: "1px solid #e2e8f0cc",
							":hover": { borderColor: "#c9c9c9" },
						}}
					>
						<AnswerPageLeftSidebar />
					</Box>
				</Grid>
				<Grid item xs={7}>
					{_renderContent()}
				</Grid>
			</Grid>
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
				<Box>
					<AnswerPageRightSidebar data={data}/>
				</Box>
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

export default AnswerPage
