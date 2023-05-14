import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Box, Modal, Tabs, Tab, Typography, Avatar, TextField, Button, Divider, IconButton, Menu, MenuItem, Chip, CircularProgress } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import { styled } from '@mui/material/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { createPost } from '../store/postSlice';
import Alert from './Alert';
import { createDoubt, resetNewDoubtState } from '../store/doubtSlice';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {md: 500, xs: 250},
    height: {md: "auto", xs: '70%'},
    bgcolor: 'background.paper',
    border: '1px solid #cecece',
    boxShadow: 24,
    borderRadius: '6px',
    p: {md: 4, xs: 2},
    ":focus-visible": { outline: "none" }
};
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
                <Box sx={{ p: 1 }}>
                    <Typography component={'div'}>{children}</Typography>
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
const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
}));
function MainModal({ open, tabInd, setOpen }) {
    const { loadUser: { data: { avatar, firstName, lastName } } } = useSelector((state) => state.user);
    const { allTopics: { data } } = useSelector((state) => state.topic);
    const { newPost } = useSelector((state) => state.post);
    const { newDoubt } = useSelector((state) => state.doubt);

    const dispatch = useDispatch();
    const [value, setValue] = useState(tabInd);
    const [doubtText, setDoubtText] = useState("");
    const [postTitle, setPostTitle] = useState("");
    const [postDesc, setPostDesc] = useState("");
    const [anchorElDoubt, setAnchorElDoubt] = useState(null);
    const [anchorElPost, setAnchorElPost] = useState(null);

    const [doubtTags, setDoubtTags] = useState([]);
    const [postTags, setPostTags] = useState([]);

    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [openAlert, setOpenAlert] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const openDoubtMenu = Boolean(anchorElDoubt);
    const openPostMenu = Boolean(anchorElPost);

    const handleDoubtTagBtnClick = (event) => {
        setAnchorElDoubt(event.currentTarget);
    };
    const handlePostTagBtnClick = (event) => {
        setAnchorElPost(event.currentTarget);
    };
    const handleDoubtTagBtnClose = () => {
        setAnchorElDoubt(null);
    };
    const handlePostTagBtnClose = () => {
        setAnchorElPost(null);
    };

    const handleToggleDoubtTag = (tag) => {
        if (doubtTags.indexOf(tag) !== -1)
            setDoubtTags((doubtTags) => doubtTags.filter((item) => item !== tag));
        else
            setDoubtTags([...doubtTags, tag]);
    }
    const handleDoubtTagDelete = (chipToDelete) => () => {
        setDoubtTags((doubtTags) => doubtTags.filter((chip) => chip !== chipToDelete));
    };

    const handleTogglePostTag = (tag) => {
        if (postTags.findIndex((item) => item.hashtag === tag.hashtag) !== -1)
            setPostTags((postTags) => postTags.filter((item) => item._id !== tag._id));
        else
            setPostTags([...postTags, tag]);
    }
    const handlePostTagDelete = (chipToDelete) => () => {
        setPostTags((postTags) => postTags.filter((chip) => chip._id !== chipToDelete._id));
    };
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    }

    const handlePostSubmit = () => {
        const temp = postTags.map((item) => item.label);
        const data = { title: postTitle, content: postDesc, tags: temp, images: images };
        dispatch(createPost(data));
    }

    const handleDoubtSubmit = () => {
        const temp = doubtTags.map((item) => item.label);
        const data = { content: doubtText, tags: temp };
        dispatch(createDoubt(data));
    }

    useEffect(() => {
        if (newPost.success) {
            setAlertMessage("Post created!!");
            setAlertSeverity("success");
            setOpenAlert(true);
            setOpen(false);
        } else if (newPost.isError) {
            setAlertMessage(newPost.message);
            setAlertSeverity("error");
            setOpenAlert(true);
        }
    }, [newPost.isLoading])

    useEffect(() => {
        if (newDoubt.success) {
            setAlertMessage("Post created!!");
            setAlertSeverity("success");
            setOpenAlert(true);
            setOpen(false);
            dispatch(resetNewDoubtState());
        } else if (newDoubt.isError) {
            setAlertMessage(newDoubt.message);
            setAlertSeverity("error");
            setOpenAlert(true);
        }
    }, [newDoubt.isLoading])
    return (
        <Modal
            open={open}
            onClose={() => { setOpen(false) }}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <IconButton onClick={() => { setOpen(false) }} ><CloseRoundedIcon sx={{ width: 20, height: 20 }} /></IconButton>
                <Box>
                    <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
                        <Tab label="Ask Doubt" {...a11yProps(0)} sx={{ textTransform: 'none', fontFamily: "inherit" }} />
                        <Tab label="Create Post" {...a11yProps(1)} sx={{ textTransform: 'none', fontFamily: "inherit" }} />
                    </Tabs>
                </Box>
                {/* <----- DOUBT ----> */}
                <TabPanel value={value} index={0}>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', columnGap: '1rem', marginTop: '0.75rem' }}>
                        <Avatar alt='Profile pic' src={avatar.url} sx={{ cursor: "pointer" }} />
                        <TextField onChange={(e) => { setDoubtText(e.target.value) }} multiline fullWidth variant="standard" placeholder='Start your doubt with "How", "What", etc.' sx={{ borderRadius: '16px' }} InputProps={{
                            sx: {
                                "& .MuiInputBase-input": {
                                    textTransform: 'none',
                                    fontFamily: "'Inter', sans-serif",
                                    fontSize: "16px"
                                },
                            }
                        }}/>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', columnGap: '1rem' }}>
                        <Button variant="outlined" size="small" startIcon={<AddIcon />} sx={{ marginTop: "1rem", marginBottom: "0.5rem", borderRadius: '20px', textTransform: 'none', fontFamily: 'inherit' }} onClick={handleDoubtTagBtnClick}>Tag</Button>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorElDoubt}
                            open={openDoubtMenu}
                            onClose={handleDoubtTagBtnClose}
                            MenuListProps={{
                                'aria-labelledby': 'doubt-tag-button',
                            }}
                            PaperProps={{
                                style: {
                                    maxHeight: 48 * 4.5,
                                    width: '18ch',
                                },
                            }}
                        >
                            {data.map((item) => {
                                return (
                                    <MenuItem
                                        key={item._id}
                                        selected={doubtTags.findIndex((doubt) => doubt.hashtag === item.hashtag) !== -1}
                                        onClick={() => { handleToggleDoubtTag(item) }}
                                        sx={{
                                            textTransform: 'none',
                                            fontFamily: 'inherit'
                                        }}
                                    >
                                        {item.hashtag}
                                    </MenuItem>
                                )
                            })}
                        </Menu>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                                listStyle: 'none',
                                p: 0.5,
                                m: 0,
                            }}
                            component="ul"
                        >
                            {doubtTags.map((data) => {
                                return (
                                    <ListItem key={data._id}>
                                        <Chip
                                            label={data.hashtag}
                                            onDelete={handleDoubtTagDelete(data)}
                                        />
                                    </ListItem>
                                )
                            })}
                        </Box>
                    </Box>
                </TabPanel>
                {/* <---- POST ----> */}
                <TabPanel value={value} index={1}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: "column", justifyContent: 'space-between', alignItems: 'flex-start', rowGap: '0.5rem', fontFamily: "'Inter', sans-serif" }}>
                        <Box component={'div'} sx={{ display: "flex", width: "100%", alignItems: "flex-start", columnGap: "0.5rem" }} >
                            <Avatar alt='Profile pic' src={avatar.url} sx={{ width: 30, height: 30, cursor: "pointer" }} />
                            <Typography variant="body2" fontFamily={"inherit"}>{firstName + " " + lastName}</Typography>
                        </Box>
                        <Box component={"div"} sx={{ flexGrow: 1, width: "100%" }}>
                            <TextField onChange={(e) => { setPostTitle(e.target.value) }} fullWidth variant="standard" placeholder='Enter your title' InputProps={{
                                disableUnderline: true, sx: {
                                    "& .MuiInputBase-input": {
                                        textTransform: 'none',
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: "18px"
                                    },
                                }
                            }} />
                            <Divider />
                            <TextField onChange={(e) => { setPostDesc(e.target.value) }} multiline rows={5} fullWidth variant="standard" placeholder='Say something...' InputProps={{
                                disableUnderline: true,
                                sx: {
                                    "& .MuiInputBase-input": {
                                        textTransform: 'none',
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: "16px"
                                    },
                                }
                            }}
                                sx={{
                                    maxHeight: '100px',
                                    marginBottom: '0.75rem'
                                }} />
                        </Box>
                        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: "flex-start", columnGap: '0.5rem' }}>
                            <Button variant="outlined" size="small" startIcon={<AddIcon />} sx={{ marginTop: "8px", borderRadius: '20px', textTransform: 'none', fontFamily: 'inherit' }} onClick={handlePostTagBtnClick}>Tag</Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorElPost}
                                open={openPostMenu}
                                onClose={handlePostTagBtnClose}
                                MenuListProps={{
                                    'aria-labelledby': 'post-tag-button',
                                }}
                                PaperProps={{
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: '18ch',
                                    },
                                }}
                            >
                                {data.map((item) => {
                                    return (
                                        <MenuItem
                                            key={item._id}
                                            selected={postTags.findIndex((post) => post.hashtag === item.hashtag) !== -1}
                                            onClick={() => { handleTogglePostTag(item) }}
                                            sx={{
                                                textTransform: 'none',
                                                fontFamily: 'inherit'
                                            }}
                                        >
                                            {item.hashtag}
                                        </MenuItem>
                                    )
                                })}
                            </Menu>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    flexWrap: 'wrap',
                                    listStyle: 'none',
                                    p: 0.5,
                                    m: 0,
                                }}
                                component="ul"
                            >
                                {postTags.map((data) => {
                                    return (
                                        <ListItem key={data._id}>
                                            <Chip
                                                label={data.hashtag}
                                                onDelete={handlePostTagDelete(data)}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Box>
                </TabPanel>
                <Divider />
                {
                    value === 0 ? <Box sx={{ display: 'flex', justifyContent: 'flex-end', columnGap: '1rem', marginTop: '0.5rem', position: 'relative' }}>
                        <Button onClick={() => { setOpen(false) }} variant='text' sx={{ textTransform: 'none' }}>Cancel</Button>
                        {newDoubt.isLoading && <CircularProgress
                            size={24}
                            sx={{
                                position: "absolute",
                                bottom: "15%",
                                right: "4%",
                            }}
                        />}
                        <Button disabled={!doubtText.length || !doubtTags.length || newDoubt.isLoading} onClick={handleDoubtSubmit} variant='contained' sx={{ textTransform: 'none' }} >Ask</Button>
                    </Box> : <Box sx={{ marginTop: '0.5rem' }}>
                        {/* TODO - image preview */}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div>
                                <input
                                    accept="image/*"
                                    type="file"
                                    id="select-image"
                                    style={{ display: "none" }}
                                    onChange={handleImageChange}
                                    multiple
                                />
                                <label htmlFor="select-image">
                                    <Button component="span" variant='text' sx={{ textTransform: 'none', color: "#616161" }}>
                                        <ImageIcon />
                                    </Button>
                                </label>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <Button onClick={() => { setOpen(false) }} variant='text' sx={{ marginRight: '0.5rem', textTransform: 'none' }}>Cancel</Button>
                                {newPost.isLoading && <CircularProgress
                                    size={24}
                                    sx={{
                                        position: "absolute",
                                        bottom: "10%",
                                        right: "15%",
                                    }}
                                />}
                                <Button disabled={!postTitle.length || !postDesc.length || !postTags.length || newPost.isLoading} onClick={handlePostSubmit} variant='contained' sx={{ textTransform: 'none' }}>Post</Button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', width: "100%", overflow: "auto" }}>
                            {imagesPreview.map((image, index) => (
                                <Box key={index} component={'div'} sx={{ position: 'relative' }}>
                                    {/* <IconButton size='small' sx={{position: 'absolute', top:'5px', left: '5px', backgroundColor: '#efefef', ":hover": {backgroundColor: '#979797'}}} ><DeleteIcon/></IconButton> */}
                                    <img src={image} alt="Product Preview" style={{ width: "8vmax", margin: "0 0.5vmax" }} />
                                </Box>
                            ))}
                        </div>
                    </Box>
                }
                {openAlert && <Alert message={alertMessage} severity={alertSeverity} verticalPos={'bottom'} horizontalPos={'center'} />}
            </Box >
        </Modal >
    )
}

export default MainModal