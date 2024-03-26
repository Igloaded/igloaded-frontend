import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.scss';
import App from './App';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';

const root = ReactDOM.createRoot(
	document.getElementById('root')
);
root.render(
	<>
		<Router>
			<Routes>
				<Route
					path='/*'
					element={<App />}
				/>
			</Routes>
		</Router>
		<ToastContainer />
	</>
);
