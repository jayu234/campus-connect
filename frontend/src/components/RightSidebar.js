import React, { useEffect, useState } from 'react'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getNearbyEvents } from '../store/eventSlice';

function RightSidebar() {
  const { nearbyEvents: { data, success, isLoading, isError } } = useSelector((state) => state.event);
  const [eventData, setEventData] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage("Loading...");
    dispatch(getNearbyEvents());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setEventData(data);
      setMessage("");
      if (data.length === 0) {
        setMessage("No data to display.")
      }
    }
    if (isError) {
      setMessage("No data to display.")
      setEventData([]);
    }
  }, [isLoading])
  return (
    <Box sx={{display: {xs: "none", md: "block"}, backgroundColor: '#fff', border: '1px solid #e2e8f0cc', borderRadius: "0.5rem", paddingY: "0.5rem", paddingX: "1rem" }}>
      <Typography variant='h6' fontFamily="inherit" fontWeight={600}>Events & Competition</Typography>
      <List>
        <React.Fragment>
          {eventData.length > 0 ? eventData.map((item) => {
            return (
              <ListItem key={item._id} sx={{ cursor: "pointer", marginY: "0.5rem", borderRadius: "10px", ":hover": { backgroundColor: "#E2E8F0" } }} onClick={()=>{navigate(`/event/${item._id}`)}}>
                <ListItemAvatar><Avatar alt={item.title+'_cover'} src={item.image.url} sx={{ width: 34, height: 34, borderRadius: "6px" }} /></ListItemAvatar>
                <ListItemText primary={item.title} primaryTypographyProps={{ fontFamily: "inherit" }} />
              </ListItem>
            )
          }) : <Typography variant='body2' fontFamily={'inherit'} align={'center'} >{message}</Typography>}
        </React.Fragment>
      </List>
    </Box >
  )
}

export default RightSidebar