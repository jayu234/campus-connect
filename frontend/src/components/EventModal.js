import React, { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, CircularProgress, IconButton, Modal, TextField, Typography } from '@mui/material'
import ImageIcon from '@mui/icons-material/Image';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import cities from "../data/cities"
import { useDispatch, useSelector } from 'react-redux';
import { createEvent, resetNewEventState } from '../store/eventSlice';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '1px solid #cecece',
    boxShadow: 24,
    borderRadius: '6px',
    p: 4,
    ":focus-visible": { outline: "none" }
};
function EventModal({ open, setOpen }) {
    const [eventData, setEventData] = useState({ title: "", description: "", location: {} });
    const dispatch = useDispatch();
    const { newEvent: { isLoading, success, isError, message } } = useSelector((state) => state.event);

    const [image, setImage] = useState();
    const [imagePreview, setImagePreview] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage({});
        setImagePreview("");
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setImagePreview(reader.result);
                setImage(reader.result);
            }
        };
        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (success) {
            setOpen(false);
            dispatch(resetNewEventState());
        }
    }, [isLoading])

    const handleAnswerSubmit = () => {
        dispatch(createEvent({ ...eventData, image: image }));
    }
    return (
        <Modal
            open={open}
            onClose={() => {
                setOpen(false)
            }}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={style}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={() => { setOpen(false) }}>
                        <CloseRoundedIcon sx={{ width: 20, height: 20 }} />
                    </IconButton>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Typography align="center" fontFamily={"inherit"} fontWeight={500} fontSize={"26px"}>
                        Add Event
                    </Typography>
                </Box>
                <Box sx={{ padding: "0rem 1rem 3rem 1rem" }}>
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            gap: "1rem",
                            marginTop: "1rem",
                        }}
                    >
                        <TextField
                            onChange={(event) => { setEventData({ ...eventData, [event.target.name]: event.target.value }) }}
                            name='title'
                            multiline
                            fullWidth
                            variant="standard"
                            placeholder="Enter title"
                            sx={{ borderRadius: "16px" }}
                            InputProps={{
                                sx: {
                                    "& .MuiInputBase-input": {
                                        textTransform: 'none',
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: "16px"
                                    }
                                }
                            }}
                        />
                        <TextField
                            onChange={(event) => { setEventData({ ...eventData, [event.target.name]: event.target.value }) }}
                            name='description'
                            multiline
                            fullWidth
                            rows={5}
                            variant="standard"
                            placeholder="Enter event details"
                            sx={{ borderRadius: "16px" }}
                            InputProps={{
                                sx: {
                                    "& .MuiInputBase-input": {
                                        textTransform: 'none',
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: "16px"
                                    }
                                }
                            }}
                        />
                        <Autocomplete
                            disablePortal
                            id="city"
                            options={cities}
                            value={cities.find((option) => option.label === eventData.location.label) || null}
                            onChange={(event, newValue) => { setEventData({ ...eventData, location: newValue || null }) }}
                            getOptionLabel={(option) => option.label}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                                <TextField {...params} label="Location *" In />
                            )}
                        />
                    </Box>
                </Box>
                <Box sx={{ marginTop: '0.5rem' }}>
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
                            {isLoading && <CircularProgress
                                size={24}
                                sx={{
                                    position: "absolute",
                                    bottom: "10%",
                                    right: "15%",
                                }}
                            />}
                            <Button disabled={!eventData.title.length || !eventData.description.length || (eventData.location == null) || isLoading} onClick={handleAnswerSubmit} variant='contained' sx={{ textTransform: 'none' }}>Post</Button>
                        </div>
                    </div>
                    {image && imagePreview.length && <div style={{ display: 'flex', width: "100%", overflow: "auto" }}>
                        <Box component={'div'} sx={{ position: 'relative' }}>
                            <img src={imagePreview} alt="Product Preview" style={{ width: "8vmax", margin: "0 0.5vmax" }} />
                        </Box>
                    </div>}
                </Box>

            </Box>
        </Modal>
    )
}

export default EventModal