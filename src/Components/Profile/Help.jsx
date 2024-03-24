import React, { useState, useRef } from 'react';
import styles from './Styles/Help.module.scss';
import { Select } from 'antd';
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { vars } from '../../../config.js';
import {
	epochCurrent,
	showMsg,
} from '../../Reusable.js';

const Help = () => {
	const toastProps = {
		position: 'top-right',
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		autoClose: 5000,
		draggable: true,
		theme: 'light',
	};

	const errorMsg = (msg) => {
		toast.error(msg, toastProps);
	};

	const successMsg = (msg) => {
		toast.success(msg, toastProps);
	};

	const handleChange = (value) => {
		setLoggedData((e) => ({
			...e,
			type: value,
		}));
	};

	const [options, setOptions] = useState([
		{
			value: 'Get Help',
			label: 'Help',
		},
		{
			value: 'Request a Feature',
			label: 'Feature Request',
		},
	]);

	const [selectionData, setSelectionData] =
		useState([
			{
				id: 1,
				titleLabel: 'Title',
				descriptionLabel: 'Description',
			},
		]);

	const [isSubmitted, setIsSubmitted] =
		useState(false);

	const [afterSubmit, setAfterSubmit] = useState({
		id: 1,
		title: ``,
		description: ``,
	});

	const [loggedData, setLoggedData] = useState({
		id: 1,
		type: 'Get Help',
		title: '',
		description: '',
	});

	const cleanUp = () => {
		setLoggedData({
			...loggedData,
			id: 1,
			title: '',
			type: 'Help',
			description: '',
		});
	};

	const submitForm = () => {
		const objectData = {
			email: Cookies.get('email'),
			subject: loggedData.title,
			message: loggedData.description,
			datetime: epochCurrent('ms'),
			type: loggedData.type,
		};
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/help/form`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: JSON.stringify(objectData),
			withCredentials: true,
		};

		axios(options)
			.then((res) => {
				if (res.data.status == 'ok') {
					if (loggedData.type === 'Help') {
						successMsg(
							'Your Bug Report has been submitted'
						);
						setAfterSubmit({
							title: (
								<>
									Your <b>Bug Report</b> request has been
									submitted successfully!
								</>
							),
							description: `We will get back to you soon!`,
						});
					} else {
						successMsg(
							'Your Feature Request has been submitted'
						);
						setAfterSubmit({
							title: (
								<>
									Your <b>Feature Request</b> request has
									been submitted successfully!
								</>
							),
							description: `We will get back to you soon!`,
						});
					}
					setIsSubmitted(true);
					cleanUp();
					setTimeout(() => {
						setIsSubmitted(false);
					}, 5000);
				}
			})
			.catch((err) => {
				console.log(err);
				if (err.response.status === 500) {
					showMsg('Something went wrong', 'error');
					cleanUp();
				}
			});
	};

	const Validate = () => {
		if (loggedData.title === '') {
			errorMsg('Please enter a title');
		} else if (loggedData.description === '') {
			errorMsg('Please enter a description');
		} else {
			submitForm();
		}
	};

	return (
		<div className={styles.wrapper}>
			<p>Help</p>
			{!isSubmitted && (
				<div className={styles.reportWrapper}>
					<div className={styles.selectorWrapper}>
						<p>I would like to </p>
						<Select
							defaultValue='Get Help'
							style={{
								width: 'fit-content',
							}}
							onChange={handleChange}
							options={options}
						/>
					</div>
					<p className={styles.titleSmall}>
						{selectionData[0].titleLabel}
					</p>
					<textarea
						placeholder={`Enter a ${selectionData[0].titleLabel}`}
						name=''
						id=''
						cols='30'
						rows='10'
						value={loggedData.title}
						onChange={(e) =>
							setLoggedData({
								...loggedData,
								title: e.target.value,
							})
						}
					></textarea>
					<p className={styles.titleSmall}>
						{selectionData[0].descriptionLabel}
					</p>
					<textarea
						className={styles.descriptionArea}
						placeholder={`Enter a ${selectionData[0].descriptionLabel}`}
						name=''
						id=''
						cols='30'
						rows='10'
						value={loggedData.description}
						onChange={(e) =>
							setLoggedData({
								...loggedData,
								description: e.target.value,
							})
						}
					></textarea>
					<div
						className={styles.submitbtn}
						onClick={() => Validate()}
					>
						Submit
					</div>
				</div>
			)}

			{isSubmitted && (
				<div className={styles.successWrapper}>
					<IoMdCheckmarkCircle />
					<p>{afterSubmit.title}</p>
					<p>{afterSubmit.description}</p>
				</div>
			)}
		</div>
	);
};

export default Help;
