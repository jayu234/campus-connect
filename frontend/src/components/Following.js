import { Card, CardContent, CardActions, CardMedia, Grid, Typography, Button, CircularProgress, Box, CardHeader, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowing } from '../store/topicSlice';
import ReplayIcon from '@mui/icons-material/Replay';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePlus, HiOutlineCheck } from 'react-icons/hi';

function Following() {

  const { loadUser: { data: { _id } } } = useSelector((state) => state.user);
  const { allTopics, following: { data, success, isLoading, isError } } = useSelector((state) => state.topic);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [followingTopics, setFollowingTopics] = useState([]);
  const [trendingTopics, setTrendingTopics] = useState(allTopics.data);
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleFollowingBtnChange = async (topicsType, topic, data) => {
    let newTopics;
    const oldTopics = data;
    if (topic.following) {
      newTopics = data.map((item) => (item._id === topic._id) ? { ...item, following: false } : item)
      topicsType === "following" ? setFollowingTopics(newTopics) : setTrendingTopics(newTopics);
      axios.defaults.withCredentials = true
      await axios.post(`${process.env.REACT_APP_BASE_URL}/topic/follow/${topic._id}`)
        // .then(() => {
        //   newTopics = followingTopics.map((item) => (item._id === topic._id) ? { ...item, following: false } : item)
        //   setFollowingTopics(newTopics);
        // })
        .catch(() => {
          topicsType === "following" ? setFollowingTopics(oldTopics) : setTrendingTopics(oldTopics);
          setAlertMessage(`Failed to unfollow ${topic.label}`);
          setOpen(true);
        });
    } else {
      newTopics = data.map((item) => (item._id === topic._id) ? { ...item, following: true } : item)
      topicsType === "following" ? setFollowingTopics(newTopics) : setTrendingTopics(newTopics);
      axios.defaults.withCredentials = true
      await axios.post(`${process.env.REACT_APP_BASE_URL}/topic/follow/${topic._id}`)
        // .then(() => {
        //   newTopics = followingTopics.map((item) => (item._id === topic._id) ? { ...item, following: true } : item)
        //   setFollowingTopics(newTopics);
        // })
        .catch(() => {
          topicsType === "following" ? setFollowingTopics(oldTopics) : setTrendingTopics(oldTopics);
          setAlertMessage(`Failed to follow ${topic.label}`);
          setOpen(true);
        });
    }
  }
  function _renderFollowing(data, isLoading, success, isError) {
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
        <Grid container component={'section'} marginTop={0.75} mb={2} spacing={1} rowSpacing={2}>
          {data.length > 0 ? data.map((topic) => {
            return (
              <React.Fragment key={topic._id}>
                <Grid item xs={12} md={4} sm={6} >
                  <Card sx={{width: {xs: '100%'} , maxWidth: {md: '300', xs: 'auto'}, border: '1px solid #e2e8f0cc', borderRadius: '0.5rem', paddingBottom: { md: '6px' } }}>
                    <CardHeader
                      avatar={
                        <Box component={'img'} src={topic.avatar.url} alt='topic_avatar' sx={{ width: '30px', height: '30px', borderRadius: '20px' }} />
                      }
                      action={
                        <IconButton aria-label="settings" sx={{ width: "26px", height: "26px", borderRadius: '16px', backgroundColor: '#efefef', marginTop: "0.75rem", padding: '0.15rem' }} onClick={() => { handleFollowingBtnChange("trending", topic, data) }}
                        >
                          {topic.following ? <HiOutlineCheck color='lightgreen' /> : <HiOutlinePlus color='blue' />}
                        </IconButton>
                      }
                      title={topic.label}
                      titleTypographyProps={{ fontFamily: 'inherit', fontWeight: '500' }}
                      subheader={topic.doubts.length + topic.posts.length + " articles"}
                      subheaderTypographyProps={{ fontFamily: 'inherit' }}
                      sx={{display: { md: 'none', xs: 'flex', alignItems: 'center', justifyContent: 'center' } }}
                    />
                    <CardMedia
                      component="img"
                      alt={topic.hashtag + '_cover'}
                      height="140"
                      src={topic.avatar.url}
                      onClick={() => { navigate(`/topic/${topic._id}`) }}
                      sx={{ display: { xs: 'none', md: "block" }, cursor: 'pointer' }}
                    />
                    <CardContent sx={{ display: { xs: 'none', md: 'block' } }}>
                      <Typography gutterBottom variant="h6" component="div" fontFamily={"inherit"} fontSize={'16px'}
                        onClick={() => { navigate(`/topic/${topic._id}`) }} sx={{ cursor: 'pointer' }}>
                        {topic.label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" fontFamily={"inherit"}>
                        {topic.description.slice(0, 90).concat("...")}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ display: { md: 'flex', xs: 'none' }, justifyContent: 'space-between', paddingX: '16px' }}>
                      <Button
                        id={topic._id}
                        tabIndex={topic.index}
                        onClick={() => { handleFollowingBtnChange("following",topic, data) }}
                        size="small"
                        variant={topic.following ? 'outlined' : 'contained'}
                        sx={{ textTransform: "none", fontFamily: "inherit" }}
                        disableTouchRipple
                      >
                        {topic.following ? 'Following' : 'Follow'}
                      </Button>
                      <Button size="small" disableTouchRipple sx={{ textTransform: "none", fontFamily: "inherit" }} onClick={() => { navigate(`/topic/${topic._id}`) }} >Learn More</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </React.Fragment>
            )
          }) :
            (
              <Grid item xs={12}>
                <Typography align="center" fontFamily={'inherit'}>No data to display.</Typography>
              </Grid>
            )}
        </Grid>)
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
  useEffect(() => {
    dispatch(getFollowing(_id));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      const temp = data?.map((item) => {
        return {
          ...item,
          following: true
        }
      })
      setFollowingTopics(temp);
    }
  }, [isLoading]);

  useEffect(() => {
    if (allTopics.success) {
      const temp = allTopics.data?.map((topic) => {
        if (topic.followers.includes(_id)) {
          return { ...topic, following: true }
        }
        return { ...topic, following: false }
      })
      setTrendingTopics(temp);
    }
  }, [allTopics.isLoading])
  return (
    <>
      <Grid container component={'div'} direction={"column"} sx={{ padding: { xs: "0 0.75rem", md: "0" } }}>
        <Grid item sx={{ position: 'relative' }}>
          <Typography variant='h5' fontFamily={"inherit"} fontWeight="500" sx={{ fontSize: { xs: "20px", md: '22px' }, margin: { xs: "0", md: "0rem 0rem 1rem" } }}>
            Following
          </Typography>
          {_renderFollowing(followingTopics, isLoading, success, isError)}
        </Grid>
        <Grid item sx={{ display: { xs: 'block', md: 'none' }, position: 'relative' }}>
          <Typography variant='h5' fontFamily={"inherit"} fontWeight="500" sx={{ fontSize: { xs: "20px", md: '22px' }, margin: { xs: "0.75rem 0 0", md: "0rem 0rem 1rem" } }}>
            Trending Topics
          </Typography>
          {_renderFollowing(trendingTopics, allTopics.isLoading, allTopics.success, allTopics.isError)}
        </Grid>
      </Grid>
      {open && <Alert message={alertMessage} severity={'error'} />}
    </>
  )
}

export default Following