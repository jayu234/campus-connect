import * as React from "react"
import { AppBar, Box, Toolbar, IconButton, Typography, Container, Avatar, Button, Tooltip, tooltipClasses, Menu, MenuItem, Zoom, Drawer, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import CreateIcon from "@mui/icons-material/Create"
import { styled } from "@mui/material/styles"
import MenuIcon from '@mui/icons-material/Menu';
import { HiHome, HiOutlineHome, HiClipboardList, HiOutlineClipboardList, HiChatAlt2, HiOutlineChatAlt2 } from "react-icons/hi"
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import MainModal from "./MainModal"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { userLogout } from "../store/userSlice"
import { Instagram, LinkedIn, Twitter } from "@mui/icons-material"

const CustomWidthTooltip = styled(({ className, ...props }) => (
	<Tooltip {...props} classes={{ popper: className }} />
))({
	[`& .${tooltipClasses.tooltip}`]: {
		maxWidth: 500,
		maxHeight: 200,
		fontSize: 14,
	},
})


const settings = ["Profile", "Edit profile", "Logout"]

function Navbar({ iconShow = true, btnShow = true, profileBtn = true }) {
	const [anchorElUser, setAnchorElUser] = React.useState(null);
	const [drawer, setDrawer] = React.useState(false);
	const toggleDrawer = (event, state) => {
		if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		setDrawer(state);
	};
	const dispatch = useDispatch();
	const { loadUser: { data: { avatar } } } = useSelector((state) => state.user);
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};
	const navigate = useNavigate();
	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};
	const handleAction = (setting) => {
		if (setting === "Profile") {
			navigate("/profile");
		}
		if (setting === "Edit profile") {
			navigate("/profile/edit");
		}
		if (setting === "Logout") {
			dispatch(userLogout());
		}
		handleCloseUserMenu();
	}
	const [open, setOpen] = React.useState(false);

	const currPage = useLocation().pathname;
	const isHomePage = currPage === "/";
	const isFollowingPage = currPage === "/following";
	const isAnswerPage = currPage === "/answer";
	const isEventsPage = currPage === "/events";

	const iconBtns = [
		{
			name: "Home",
			icon: (isHomePage ? <HiHome color="#2563EB" fontWeight={400} /> : <HiOutlineHome color="#757575" />),
			link: "/",
			pageLabel: "/"
		},
		{
			name: "Following",
			icon: (isFollowingPage ? <HiClipboardList color="#2563EB" /> : <HiOutlineClipboardList color="#757575" />),
			link: "following",
			pageLabel: "/following"
		},
		{
			name: "Answer",
			icon: (isAnswerPage ? <HiChatAlt2 color="#2563EB" /> : <HiOutlineChatAlt2 />),
			link: "answer",
			pageLabel: "/answer"
		},
		{
			name: "Events",
			icon: (isEventsPage ? <EmojiEventsIcon sx={{ fontSize: { xs: "24px", md: "30px" } }} color={"primary"} /> : <EmojiEventsOutlinedIcon sx={{ fontSize: { xs: "24px", md: "30px" } }} />),
			link: "events",
			pageLabel: "/events"
		},
	]
	return (
		<>
			{open && <MainModal open={open} tabInd={0} setOpen={setOpen} />}
			<AppBar
				position="static"
				sx={{
					marginBottom: { md: "1rem", xs: "0" },
					boxShadow: "none",
					bgcolor: "#FFFFFF",
					border: "1.5px solid #efefef",
				}}
			>
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						{/* <> */}
						<Box component={'a'} href="/" sx={{ display: { md: "flex", xs: "none" } }}>
							<img src="/images/site_logo.png" alt="site_logo" style={{ height: "36px" }} />
						</Box>

						{iconShow && <Box sx={{ visibility: iconShow ? 'visible' : 'hidden', flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={(e) => { toggleDrawer(e, true) }}
								color="#272727"
								sx={{ paddingLeft: { xs: "0" } }}
							>
								<MenuIcon />
							</IconButton>
							<Drawer anchor="left" open={drawer} onClose={(e) => { toggleDrawer(e, false) }}>
								<React.Fragment>
									<img src="/images/site_logo.png" alt="site_logo" style={{ margin: "1rem", height: "25px" }} />
								</React.Fragment>
								<List sx={{ height: "100vh" }}>
									{iconBtns.map((item) => (
										<ListItemButton key={item.name} onClick={(e) => { toggleDrawer(e, false); navigate(`${item.link}`) }}>
											<ListItemIcon sx={{ minWidth: "auto", fontSize: "24px", marginRight: "1rem" }}>
												{item.icon}
											</ListItemIcon>
											<ListItemText primary={item.name} primaryTypographyProps={{ fontFamily: "inherit", fontSize: "14px", fontWeight: currPage === item.pageLabel ? 600 : 400 }} />
										</ListItemButton>
									))}
								</List>
								<Box sx={{ display: "flex", marginLeft: "1rem" }}>
									<IconButton><LinkedIn /></IconButton>
									<IconButton><Twitter /></IconButton>
									<IconButton><Instagram /></IconButton>
								</Box>
								<Typography variant='caption'
									color="grey"
									component={'span'}
									mb={2}
									ml={2}
									fontFamily={"inherit"}
									sx={{ fontSize: "0.7rem", color: "#475569" }} >
									2023 © CampusConnect
								</Typography>
							</Drawer>
						</Box>}
						<Box component={'a'} href="/" sx={{ flexGrow: 1, display: { md: "none", xs: "block" } }} >
							<img src="/images/site_logo.png" alt="site_logo" style={{ height: "25px" }} />
						</Box>
						<Box sx={{ visibility: iconShow ? 'visible' : 'hidden', marginLeft: "2rem", flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{iconBtns.map((item) => (
								<CustomWidthTooltip
									key={item.name}
									title={item.name}
									TransitionComponent={Zoom}
								>
									<IconButton disableTouchRipple onClick={() => { navigate(`${item.link}`) }}
										sx={{ fontSize: "30px", marginX: "0.7rem", borderRadius: '5px', ":hover": { backgroundColor: '#F1F5F9' } }}
									>
										{item.icon}
									</IconButton>
								</CustomWidthTooltip>
							))}
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							{btnShow && <Button
								variant="contained"
								sx={{
									display: { md: "inline-flex", xs: "none" },
									marginX: 2,
									backgroundColor: "#2563EB",
									borderRadius: "20px",
									textTransform: "none",
									boxShadow: "none",
									fontFamily: "inherit",
									visibility: btnShow ? 'visible' : 'hidden',
									":hover": { boxShadow: "none" },
								}}
								onClick={() => {
									setOpen(true)
								}}
								startIcon={<CreateIcon sx={{ fontSize: 18, marginRight: "0.35rem" }} />}
							>
								Ask Doubt
							</Button>}
							<IconButton onClick={handleOpenUserMenu} sx={{ visibility: profileBtn ? 'visible' : 'hidden',p: 0 }}>
								<Avatar alt="profile_pic" src={avatar.url} sx={{ width: { xs: "28px", md: "36px" }, height: { xs: "28px", md: "36px" } }} />
							</IconButton>
							<Menu
								sx={{ mt: { md: '45px', xs: '30px' } }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem disableTouchRipple key={setting} onClick={() => { handleAction(setting) }} sx={{ textTransform: 'none', fontFamily: 'inherit', padding: { xs: "5px 10px", md: "6px 18px" }, minHeight: { md: "48px", xs: "20px" } }}>
										<Typography textAlign="center" fontFamily={"inherit"} sx={{ fontSize: { xs: "0.75rem", sm: "0.85rem", md: "1rem" } }}>{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
		</>
	)
}
export default Navbar
