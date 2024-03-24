import Cookies from 'js-cookie';
import axios from 'axios';
import { vars } from '../../config.js';

export const checkPlan = async (email) => {
	if (!email || !Cookies.get('token')) {
		throw new Error('Email is required');
	}
	const options = {
		method: 'GET',
		url: `${vars.API_URL}/user/getplan?email=${email}`,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${Cookies.get(
				'token'
			)}`,
		},
		withCredentials: true,
	};

	return new Promise((resolve, reject) => {
		axios(options)
			.then((res) => {
				resolve({ resp: res.data, success: true });
			})
			.catch((error) => {
				console.log(error);
				reject({ error, success: false });
			});
	});
};
