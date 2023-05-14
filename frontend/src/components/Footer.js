import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

import HomeIcon from "@mui/icons-material/Home"
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes"
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"

const footer = [
	{
		title: "About",
		icon: <HomeIcon sx={{ fontSize: 30 }} />,
	},
	{
		title: "Careers",
		icon: <SpeakerNotesIcon sx={{ fontSize: 30 }} />,
	},
	{
		title: "Teams",
		icon: <SpeakerNotesIcon sx={{ fontSize: 30 }} />,
	},
	{
		title: "Privacy",
		icon: <SpeakerNotesIcon sx={{ fontSize: 30 }} />,
	},
	{
		title: "Acceptance Use",
		icon: <QuestionAnswerIcon sx={{ fontSize: 30 }} />,
	},
	{
		title: "Businesses",
		icon: <QuestionAnswerIcon sx={{ fontSize: 30 }} />,
	},
	{
		title: "Press",
		icon: <QuestionAnswerIcon sx={{ fontSize: 30 }} />,
	},
	{
		title: "Choices",
		icon: <EmojiEventsIcon sx={{ fontSize: 30 }} />,
	},
	{
		title: "Grievance Officer",
		icon: <EmojiEventsIcon sx={{ fontSize: 30 }} />,
	},
]


function Footer() {
	return (
		<Box mt={1} sx={{display: {xs: "none", md: "flex"}, flexGrow: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
			<Box mb={5}>
				{footer.map((item) => {
					return (
						<span key={item.title}>
							<span style={{display: "inline", color: "#475569"}} >{" ● "}</span>
							<Typography
								variant='caption'
								color="grey"
								fontFamily={"inherit"}
								sx={{ marginX: "0.2rem", cursor: "pointer", fontSize: "0.8rem", ":hover": { textDecoration: "underline" } }}
							>
								{item.title}
							</Typography>
						</span>
					)
				})}
			</Box>
			<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: "flex-start", alignItems: "flex-start" }}>
				<Typography variant='caption'
					color="grey"
					component={'span'}
					mb={2}
					fontFamily={"inherit"}
					sx={{ fontSize: "0.8rem", color: "#475569" }} >
					2023 © CampusConnect
				</Typography>
				<Typography variant='caption'
					color="grey"
					component={'span'}
					fontFamily={"inherit"}
					sx={{ fontSize: "0.8rem", color: "#475569" }} >
					Made with ❤️ by developers <br/> just like <em>you.</em>
				</Typography>
			</Box>
		</Box>
	)
}

export default Footer