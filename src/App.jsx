import React, { useEffect } from 'react';

import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import PrivateMedia from './Pages/PrivateMedia';
import Public from './Pages/PublicDownloader';
import Statistics from './Pages/Statistics';
import Recharge from './Pages/Recharge';
import AcceptRequest from './Pages/AcceptRequest';
import Track from './Pages/TrackReels';
import Subscribe from './Pages/Subscribe';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import ForgetPassword from './Pages/Forgetpassword';
import PrivateDownload from './Pages/PrivateDownload';
import Error from './Pages/Error';
import Home from './Pages/Home';
import Privacy from './Pages/Privacy';
import TermsCond from './Pages/TermsCond';
import RefundPolicy from './Pages/RefundPolicy';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import PostPayment from './Pages/PostPayment';
import Extension from './Pages/Extension';
import UsagePolicy from './Pages/UsagePolicy';

const App = () => {
	const location = useLocation();

	return (
		<>
			<AnimatePresence mode='wait'>
				<Routes
					location={location}
					key={location.pathname}
				>
					<Route
						index
						element={<Home />}
					/>
					<Route
						path='/private/download'
						element={<PrivateDownload />}
					/>
					<Route
						path='/private'
						element={<PrivateMedia />}
					/>
					<Route
						path='/recharge'
						element={<Recharge />}
					/>
					<Route
						path='/public/download'
						element={<Public />}
					/>
					<Route
						path='/statistics'
						element={<Statistics />}
					/>
					<Route
						path='/check-requests'
						element={<AcceptRequest />}
					/>
					<Route
						path='/Login'
						element={<Login />}
					/>
					<Route
						path='/register'
						element={<Register />}
					/>
					<Route
						path='/forgetpassword'
						element={<ForgetPassword />}
					/>
					<Route
						path='/track'
						element={<Track />}
					/>
					<Route
						path='/Subscribe'
						element={<Subscribe />}
					/>
					<Route
						path='/profile'
						element={<Profile />}
					/>
					<Route
						path='/privacy-policy'
						element={<Privacy />}
					/>
					<Route
						path='/terms-and-conditions'
						element={<TermsCond />}
					/>
					<Route
						path='/refund-policy'
						element={<RefundPolicy />}
					/>
					<Route
						path='/usage-policy'
						element={<UsagePolicy />}
					/>
					<Route
						path='/about'
						element={<AboutUs />}
					/>
					<Route
						path='/contact'
						element={<ContactUs />}
					/>
					<Route
						path='/post/payment/:orderId'
						element={<PostPayment />}
					/>
					<Route
						path='/extension/download'
						element={<Extension />}
					/>
					<Route
						path='/*'
						element={<Error />}
					/>
				</Routes>
			</AnimatePresence>
		</>
	);
};

export default App;
//
