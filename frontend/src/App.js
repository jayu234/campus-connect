import * as React from "react"
import Home from "./components/Home"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Signup from "./components/SignupPage"
import PageNotFound from "./components/PageNotFound"
import Following from "./components/Following"
import Profile from "./components/Profile"
import ProfileEdit from "./components/ProfileEdit"
import Feed from "./components/Feed"
import Answer from "./components/Answer"
import Events from "./components/Events"
import Topic from "./components/Topic"
import AnswerPage from "./components/AnswerPage"
import EventPage from "./components/EventPage"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "./store/userSlice"
import { Grid } from "react-loader-spinner"

function App() {
	const { isAuthenticated } = useSelector((state) => state.user);
	const { loadUser: { isLoading } } = useSelector((state) => state.user);
	const { signup } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	React.useEffect(() => {
		dispatch(loadUser());
	}, [dispatch, signup])
	function _renderComponent() {
		if (isLoading) {
			return (
				<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
					<Grid
						height="80"
						width="80"
						color="#186bf0"
						ariaLabel="grid-loading"
						radius="12.5"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
					/>
				</div>
			)
		}
		else {
			if (!isAuthenticated) {
				return (<Login />)
			}
			else {
				return (<Home />)
			}
		}
	}
	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={_renderComponent()}>
					<Route exact path="/" element={<Feed />} />
					<Route exact path="/following" element={<Following />} />
					<Route exact path="/answer" element={<Answer />} />
					<Route exact path="/events" element={<Events />} />
					<Route exact path="/topic/:id" element={<Topic />} />
				</Route>
				<Route exact path="/question" element={<AnswerPage />} />
				<Route exact path="/event/:id" element={<EventPage />} />
				<Route exact path="/question/:id" element={<AnswerPage />} />
				{/* <Route exact path="/login" element={<Login />} /> */}
				<Route exact path="/signup" element={<Signup />} />
				<Route exact path="/profile" element={<Profile />} />
				<Route exact path="/profile/edit" element={<ProfileEdit />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</BrowserRouter>
	)
}
export default App
