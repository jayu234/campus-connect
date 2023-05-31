import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const footer = ["About", "Careers", "Teams", "Privacy Policy", "Businesses", "Bug Bounty", "Students"]

function Footer() {
	return (
		<Box mt={1} sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1, flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }}>
			<Box mb={5}>
				{footer.map((item) => {
					return (
						<span key={item}>
							<span style={{ display: "inline", color: "#475569" }} >{" ● "}</span>
							<Typography
								variant='caption'
								color="grey"
								fontFamily={"inherit"}
								sx={{ marginX: "0.2rem", cursor: "pointer", fontSize: "0.8rem", ":hover": { textDecoration: "underline" } }}
							>
								{item}
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
					Made with ❤️ by developers <br /> just like <em>you.</em>
				</Typography>
			</Box>
		</Box>
	)
}

export default Footer