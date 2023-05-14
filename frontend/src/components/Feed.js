import React from "react"
import {
	Grid,
	Box,
	Typography,
	Avatar,
	TextField,
	CircularProgress,
	Button,
	Divider,
} from "@mui/material"
import ReplayIcon from "@mui/icons-material/Replay"
import LiveHelpIcon from "@mui/icons-material/LiveHelp"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import RateReviewIcon from "@mui/icons-material/RateReview"
import MainModal from "./MainModal"
import PostItem from "./PostItem"
import { useDispatch, useSelector } from "react-redux"
import { getFeedData } from "../store/feedSlice"
import { useNavigate } from "react-router-dom"

function Feed() {
	const [open, setOpen] = React.useState(false)
	const [tabInd, setTabInd] = React.useState(0)
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const {
		feed: { data, isLoading, isError, success },
	} = useSelector((state) => state.feed)
	const {
		loadUser: {
			data: { avatar },
		},
	} = useSelector((state) => state.user)
	React.useEffect(() => {
		dispatch(getFeedData())
	}, [dispatch])
	return (
		<React.Fragment>
			<Grid
				item
				sx={{
					border: "1px solid #e2e8f0cc",
					borderRadius: {md: "0.5rem"},
					backgroundColor: "#fff",
					marginBottom: {md: "1rem", xs: "0.75rem"},
					":hover": { borderColor: "#cfcfcf" },
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						columnGap: "1rem",
						padding: { md: "1.5rem 1.5rem 0.75rem", xs: "0.75rem 0.5rem 0.25rem" },
					}}
				>
					<Box
						mb={2}
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							columnGap: { md: "0.5rem", xs: "0.25rem" },
						}}
					>
						<Avatar alt="profile_pic" src={avatar.url} sx={{ width: { xs: "28px", md: "32px" }, height: { xs: "28px", md: "32px" } }} />
						<Box
							component={"div"}
							sx={{
								width: "100%",
								border: "2px solid #efefef",
								padding: { md: "0.75rem 1rem", xs: "0.5rem" },
								borderRadius: { md: "16px", xs: "12px" },
								marginLeft: { md: "0.75rem", xs: "0.25rem" },
								cursor: "pointer",
							}}
							onClick={() => {
								setTabInd(0)
								setOpen(true)
							}}
						>
							<Typography fontFamily={"inherit"} color={"#979797"} sx={{ fontSize: { xs: "12px", md: "16px" } }} >
								What do you want to ask or share?
							</Typography>
						</Box>
					</Box>
					<Box
						sx={{
							width: "100%",
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							columnGap: "1rem",
						}}
					>
						<Button
							onClick={() => {
								setTabInd(0)
								setOpen(true)
							}}
							fullWidth
							sx={{
								borderRadius: "16px",
								padding: "0.5rem",
								textTransform: "none",
								fontFamily: "inherit",
								fontSize: { xs: "12px", md: "14px" }
							}}
							startIcon={<LiveHelpIcon sx={{ width: { xs: "14px", md: "18px" } }} />}
						>
							Ask
						</Button>
						<Divider orientation="vertical" flexItem />
						<Button
							fullWidth
							sx={{
								borderRadius: "16px",
								padding: "0.5rem",
								textTransform: "none",
								fontFamily: "inherit",
								fontSize: { xs: "12px",  md: "14px" }
							}}
							startIcon={<QuestionAnswerIcon sx={{ width: { xs: "14px", md: "18px" } }} />}
							onClick={() => {
								navigate("/answer")
							}}
						>
							Answer
						</Button>
						<Divider orientation="vertical" flexItem />
						<Button
							onClick={() => {
								setTabInd(1)
								setOpen(true)
							}}
							fullWidth
							sx={{
								borderRadius: "16px",
								padding: "0.5rem",
								textTransform: "none",
								fontFamily: "inherit",
								fontSize: { xs: "12px",  md: "14px" }
							}}
							startIcon={<RateReviewIcon sx={{ width: { xs: "14px", md: "18px" } }} />}
						>
							Post
						</Button>
					</Box>
				</Box>
				{open && <MainModal open={open} tabInd={tabInd} setOpen={setOpen} />}
			</Grid>
			<Box>{_renderContent()}</Box>
		</React.Fragment>
	)

	function _renderContent() {
		if (isLoading) {
			return (
				<Box
					component={"div"}
					mt={"1rem"}
					display={"flex"}
					flexDirection={"column"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<CircularProgress size={30} />
					<Typography>Loading...</Typography>
				</Box>
			)
		} else if (success) {
			return data.length > 0 ? (
				data.map((item) => {
					return (
						<Box key={item._id} sx={{ marginBottom: "1rem" }}>
							<PostItem key={item._id} post={item} />
						</Box>
					)
				})
			) : (
				<Typography align="center" fontFamily={"inherit"}>
					No data to display.
				</Typography>
			)
		} else if (isError) {
			return (
				<Box
					component={"div"}
					mt={"1rem"}
					display={"flex"}
					flexDirection={"column"}
					justifyContent={"center"}
					alignItems={"center"}
				>
					<Typography align="center" fontFamily={"inherit"}>
						Sorry, something went wrong.
						<br />
						Please refresh the page and try again.
					</Typography>
					<Button
						variant="contained"
						sx={{
							marginTop: "0.5rem",
							textTransform: "none",
							borderRadius: "50px",
						}}
						startIcon={<ReplayIcon fontSize="20px" />}
						onClick={() => {
							window.location.reload()
						}}
					>
						Refresh
					</Button>
				</Box>
			)
		}
	}
}

export default Feed
