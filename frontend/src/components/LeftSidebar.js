import React, { useEffect, useState } from "react"
import { List, ListItemButton, ListItemIcon, ListItemText, Typography, } from "@mui/material"
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { getAllTopics } from "../store/topicSlice";

function LeftSidebar() {
  const { allTopics: { data, success, isLoading, isError } } = useSelector((state) => state.topic);
  const [topicData, setTopicData] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setMessage("Loading...");
    dispatch(getAllTopics());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTopicData(data);
      setMessage("");
    }
    if (isError) {
      setMessage("No data to display.")
      setTopicData([]);
    }
  }, [isLoading])
  return (
    <List sx={{display: {xs: "none", md: "block"},border: '1px solid #e2e8f0cc', borderRadius: "0.5rem", backgroundColor: '#fff', marginBottom: "2rem", height: "51vh", overflowY: "scroll" }}>
      <React.Fragment>
        {topicData?.length > 0 ? data.map((item) => {
          return (
            <ListItemButton key={item.hashtag} sx={{ ":hover": { backgroundColor: "#E2E8F0" } }} onClick={() => { navigate(`/topic/${item._id}`) }}>
              <ListItemIcon sx={{ minWidth: 'auto', marginRight: '1rem' }}>
                <img alt={item.hashtag + '_avatar'} src={item.avatar.url} width='30px' height='30px' style={{ borderRadius: '20px' }} />
              </ListItemIcon>
              <ListItemText primary={item.label} sx={{ fontSize: '14px' }} primaryTypographyProps={{ fontFamily: "inherit" }} />
            </ListItemButton>
          )
        }) : <Typography variant='body2' fontFamily={'inherit'} align={'center'} >{message}</Typography>}
      </React.Fragment>
    </List>
  )
}

export default LeftSidebar
