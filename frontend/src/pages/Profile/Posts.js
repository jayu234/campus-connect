import React from "react"
import { Box, Typography, Button, CircularProgress } from "@mui/material"
import ReplayIcon from '@mui/icons-material/Replay';
import { useDispatch, useSelector } from "react-redux"
import { getMyPosts } from "../../store/postSlice"
import PostItem from "../../components/PostItem";

function Posts() {
	const { loadUser: { data: { _id } } } = useSelector((state) => state.user);
	const { myPosts: { data, isLoading, success, isError } } = useSelector((state) => state.post);
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(getMyPosts(_id))
	}, [dispatch])
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
				return <PostItem key={item._id} post={item} />
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

export default Posts
