import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.scss';

import {
	BrowserRouter as Router,
	Route,
	Routes,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PrivateMedia from '../src/Pages/PrivateMedia';
import Public from '../src/Pages/PublicDownloader';
import Statistics from '../src/Pages/Statistics';
import Recharge from '../src/Pages/Recharge';
import AcceptRequest from './Pages/AcceptRequest';
import Track from './Pages/TrackReels';
import Subscribe from './Pages/Subscribe';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import ForgetPassword from './Pages/Forgetpassword';
import PrivateDownload from './Pages/PrivateDownload';
import Error from '../src/Pages/Error';
import Home from '../src/Pages/Home';
import Privacy from '../src/Pages/Privacy';
import TermsCond from './Pages/TermsCond';
import RefundPolicy from './Pages/RefundPolicy';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import PostPayment from './Pages/PostPayment';
import Extension from './Pages/Extension';
import UsagePolicy from './Pages/UsagePolicy';

ReactDOM.createRoot(
	document.getElementById('root')
).render(
	<>
		<Router>
			<Routes>
				<Route
					exact
					path='/'
					element={<Home />}
				/>
				<Route
					path='/private/download'
					element={<PrivateDownload />}
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
					path='/private'
					element={<PrivateMedia />}
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
		</Router>
		<ToastContainer />
	</>
);
