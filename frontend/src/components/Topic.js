import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import CardHeader from "@mui/material/CardHeader"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import { Button, CircularProgress } from "@mui/material"
import CreateIcon from "@mui/icons-material/Create"
import { FiPlus } from "react-icons/fi"
import { BsCheck2, BsLink45Deg } from "react-icons/bs"
import { IoPeopleOutline } from "react-icons/io5"
import { GrArticle } from "react-icons/gr"
import { BsTwitter } from "react-icons/bs"
import ReplayIcon from '@mui/icons-material/Replay';
import TopicPost from "./TopicPost"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getTopicDetails } from "../store/topicSlice"
import axios from "axios"
import Alert from "./Alert"
import MainModal from "./MainModal"

function Topic() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { topic: { data, isLoading, success, isError } } = useSelector((state) => state.topic);
	const { loadUser: { data: { _id } } } = useSelector((state) => state.user);
	const [open, setOpen] = useState(false);
	const [openSnack, setOpenSnack] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");
	const [openModal, setOpenModal] = useState(false);
	const [follow, setFollow] = React.useState(false)
	const [followerCnt, setFollowerCnt] = useState(0);
	const handleFollowingBtnChange = async (follow) => {
		setFollow(!follow);
		if (follow) {
			axios.defaults.withCredentials = true
			await axios.post(`${process.env.REACT_APP_BASE_URL}/topic/follow/${data._id}`).then(()=>{
				setFollowerCnt(followerCnt - 1);
			})
				.catch(() => {
					setAlertMessage(`Failed to unfollow ${data.label}`);
					setOpen(true);
					setFollow(follow);
				})
		}
		else {
			axios.defaults.withCredentials = true
			await axios.post(`${process.env.REACT_APP_BASE_URL}/topic/follow/${data._id}`).then(()=>{
				setFollowerCnt(followerCnt + 1);
			})
				.catch(() => {
					setAlertMessage(`Failed to follow ${data.label}`);
					setOpen(true);
					setFollow(follow);
				})
		}
	}

	useEffect(() => {
		dispatch(getTopicDetails(id));
	}, [dispatch, id])

	useEffect(() => {
		if (success) {
			setFollowerCnt(data.followers.length);
			if (data.followers.includes(_id)) {
				setFollow(true);
			} else {
				setFollow(false);
			}
		}
	}, [isLoading])
	return (
		<>
			{openModal && <MainModal open={openModal} setOpen={setOpenModal} tabInd={0} />}
			{_renderContent()}
			<Box
				sx={{
					display: "flex",
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
				🔥 Popular this week
			</Box>

			{isLoading ? (
				<Box component={'div'} mt={'1rem'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
					<CircularProgress size={30} />
					<Typography>Loading...</Typography>
				</Box>
			) : (<TopicPost />
			)}
			{open && <Alert message={alertMessage} severity={'error'} />}
		</>
	)
	//<--------- Function for rendering content dynamically --------->
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
			return (
				<Box
					sx={{
						height: "250px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", objectFit: "cover", backgroundColor: "white", border: "1px solid #83c8e4", borderRadius: "0.5rem",
						// backgroundImage: `url("/images/topicBG.jpg")`
					}}
				>
					<Box>
						<CardHeader
							avatar={
								<Avatar src={data.avatar.url} aria-label="recipe" sx={{ borderRadius: "7px", width: "65px", height: "65px" }}
								/>
							}
							title={data.label}
							subheader={`#${data.hashtag}`}
							sx={{ padding: "0.5rem 1rem" }}
							subheaderTypographyProps={{
								fontFamily: "inherit",
								fontSize: "15px",
								fontWeight: "100",
							}}
							titleTypographyProps={{
								fontFamily: "inherit",
								fontSize: "27px",
								fontWeight: "800",
							}}
						/>
					</Box>
					<CardActions sx={{ marginTop: "12px" }}>
						<Button
							onClick={() => {
								handleFollowingBtnChange(follow)
							}}
							size="small"
							variant={"outlined"}
							sx={{
								textTransform: "none",
								fontFamily: "inherit",
								height: "37.4px",
								width: "130px",
								marginRight: "10px",
								borderRadius: "20px",
								fontWeight: "500",
								fontSize: "14px",
							}}
							disableTouchRipple
						>
							<Box
								sx={{
									fontSize: "20px",
									display: "flex",
									alignItems: "center",
									marginRight: "5px",
								}}
							>
								{follow ? <BsCheck2 sx={{ fontWeight: "900" }} /> : <FiPlus />}
							</Box>
							{follow ? "Following" : "Follow Tag"}
						</Button>
						<Button
							variant="contained"
							sx={{
								marginX: 1,
								backgroundColor: "#2563EB",
								borderRadius: "20px",
								fontFamily: "inherit",
								textTransform: "none",
								boxShadow: "none",
								":hover": { boxShadow: "none" },
							}}
							startIcon={<CreateIcon fontSize="18" />}
							onClick={() => { setOpenModal(true) }}
						>
							Add An Article
						</Button>
					</CardActions>
					<Box sx={{ marginTop: "8px", display: "flex" }}>
						<Box sx={{ display: "flex", alignItems: "center", marginX: "16px" }}>
							<Box
								sx={{ display: "flex", alignItems: "center", marginRight: "5px" }}
							>
								<IoPeopleOutline />
							</Box>
							{followerCnt} Followers
						</Box>
						<Box sx={{ display: "flex", alignItems: "center", marginX: "16px" }}>
							<Box
								sx={{ display: "flex", alignItems: "center", marginRight: "5px" }}
							>
								<GrArticle />
							</Box>
							{data.posts.length + data.doubts.length} Articles
						</Box>
						<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginX: "16px" }}>
							<a href={`https://twitter.com/intent/tweet?text=${process.env.REACT_APP_HOST}/topic/${data._id}`} rel="noopener noreferrer" target="_blank" aria-label="Share on Twitter"><IconButton sx={{ ":hover": { backgroundColor: "#E2E8F0" } }}><BsTwitter size={20} color="#64748B" /></IconButton></a>
							<IconButton sx={{ ":hover": { backgroundColor: "#E2E8F0" } }} onClick={() => { navigator.clipboard.writeText(`${process.env.REACT_APP_HOST}/topic/${data._id}`); setOpenSnack(true); setTimeout(() => { setOpenSnack(false) }, 3000) }}><BsLink45Deg size={25} color="#64748B" /></IconButton>
						</Box>
					</Box>
					{openSnack && <Alert message={"Link Copied Successfully"} severity={"success"} verticalPos={"bottom"} horizontalPos={"right"} duration={1500} />}
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

export default Topic
