import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import topicReducer from "./topicSlice";
import doubtReducer from "./doubtSlice";
import eventReducer from "./eventSlice";
import postReducer from "./postSlice";
import answerReducer from "./answerSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        feed: feedReducer,
        topic: topicReducer,
        doubt: doubtReducer,
        event: eventReducer,
        post: postReducer,
        answer: answerReducer
    }
})

export default store;