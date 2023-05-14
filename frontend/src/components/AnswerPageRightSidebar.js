import React from "react"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ThumbUpIcon from "@mui/icons-material/ThumbUp"
import ThumbDownIcon from "@mui/icons-material/ThumbDown"
import { Button, Divider, Menu, MenuItem } from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import ShareIcon from "@mui/icons-material/Share"
import { Box } from "@mui/system"
import ProfileQuestionModal from "./ProfileQuestionModal"
import AnswerPageComponent from "./AnswerPageComponent"
import { useSelector } from "react-redux"

function AnswerPageRightSidebar({ data }) {
	const [open, setOpen] = React.useState(false);
	const { loadUser: { data: { firstName } } } = useSelector((state) => state.user);
	return (
		<>
			{open && (
				<ProfileQuestionModal open={open} tabInd={0} setOpen={setOpen} />
			)}
			<Box>
				<Box
					sx={{
						backgroundColor: "white",
						borderRadius: "1rem",
						border: "1px solid #e2e8f0cc",
						":hover": { borderColor: "#29a9f2" },
					}}
				>
					<Box
						sx={{
							textAlign: "center",
							marginY: "1rem",
							fontSize: "1.5rem",
							fontWeight: "500",
						}}
					>
						{data.content}
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							margin: "1.4rem 1rem 0rem 1rem",
						}}
					>
						<Avatar
							src={data.author.avatar.url}
							aria-label="recipe"
							sx={{ width: "3rem", height: "3rem" }}
						/>
					</Box>
					<Box
						sx={{
							textAlign: "center",
							margin: "0.5rem 1rem 0.3rem 1rem",
							fontSize: "1.2rem",
							fontWeight: "400",
						}}
					>
						{firstName}, can you answer this question?
					</Box>
					<Box
						sx={{
							textAlign: "center",
							margin: "0rem 1rem 1rem 1rem",
							fontSize: "1rem",
							fontWeight: "200",
						}}
					>
						People are searching for a better answer to this question.
					</Box>
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<Button
							variant="contained"
							component="p"
							sx={{
								margin: "0rem 1rem 1.5rem 1rem",
								backgroundColor: "white",
								border: "1px solid #000",
								borderRadius: "20px",
								textTransform: "none",
								color: "black",
								boxShadow: "none",
								transition: "0.4s",
								":hover": { backgroundColor: "#f8fafc", borderColor: "#fff" },
							}}
							onClick={() => {
								setOpen(true)
							}}
						>
							Give Answer
						</Button>
					</Box>
				</Box>

				<Box>
					{data.answers.length > 0 ? data.answers.map((qa, index) => { return <AnswerPageComponent key={index} post={qa} />
					}) : <Typography align="center" mt={4} fontFamily={'inherit'}>Not answerd yet.</Typography>}
				</Box>
			</Box>
		</>
	)
}

export default AnswerPageRightSidebar
