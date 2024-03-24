import React, { useState } from 'react';
import styles from './Styles/TrackingModal.module.scss';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { vars } from '../../../config.js';
import { IoMdCloseCircle } from 'react-icons/io';
import success from '../../assets/staticAssets/success.png';

const TrackingModal = ({ close, data }) => {
	const [loading, setLoading] =
		useState('initial');
	const [errorData, setErrorData] = useState({
		error: false,
		message: '',
	});

	const showMsg = (msg, type) => {
		if (type === 'error') {
			return toast.error(msg);
		} else if (type === 'success') {
			return toast.success(msg);
		} else if (type === 'info') {
			return toast.info(msg);
		} else if (type === 'warning') {
			return toast.warning(msg);
		}
		toast.success(msg);
	};

	const ScheduleReel = () => {
		if (!Cookies.get('token')) {
			setLoading('failure');
			setErrorData({
				error: true,
				message: 'Please Login to continue',
			});
			return;
		}
		if (
			reelData.title === '' ||
			reelData.days === ''
		) {
			showMsg('Please fill all the fields', 'error');
			return;
		}

		if (reelData.days < 1 || reelData.days > 30) {
			showMsg(
				'Days should be between 1 and 30',
				'error'
			);
			return;
		}

		setLoading('loader');
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/track/tracknewreel`,
			headers: {
				Authorization: `Bearer ${Cookies.get(
					'token'
				)}`,
			},
			data: {
				email: Cookies.get('email'),
				shortcode: data.shortcode,
				totalIterations: reelData.days,
				title: reelData.title,
				reelData: {
					uploadDate: data.uploadDate,
					username: data.username,
					views: data.views,
					likes: data.likes,
					plays: data.plays,
					thumbnail: data.thumbnail,
				},
			},
			withCredentials: true,
		};

		axios(options)
			.then((res) => {
				if (res.data.data.success === true) {
					setLoading('success');
					showMsg(res.data.data.message, 'success');
				} else {
					setLoading('failure');
					setErrorData({
						error: true,
						message: res.data.data.message,
					});
					showMsg(res.data.data.message, 'error');
				}
			})
			.catch((err) => {
				setLoading('failure');
				if (err.response.data.data.message) {
					setErrorData(() => ({
						error: true,
						message: err.response.data.data.message,
					}));
					showMsg(
						err.response.data.data.message,
						'error'
					);
				} else {
					showMsg('Something went wrong', 'error');
				}
			});
	};
	const [reelData, setReelData] = useState({
		title: '',
		days: '',
	});

	return (
		<div className={styles.main}>
			{loading == 'initial' && (
				<div className={styles.mainModal}>
					<IoMdCloseCircle onClick={() => close()} />
					<h3>Track Reel - {data.shortcode}</h3>
					<p>
						Start tracking reel to store insights on
						daily basis
					</p>
					<div className={styles.dataModal}>
						<img
							src={data.thumbnail}
							alt=''
						/>
						<div className={styles.configModal}>
							<div className={styles.reelUrl}>
								<p>
									Post Url :{' '}
									<span>
										https://www.instagram.com/reels/
										{data.shortcode}
									</span>
								</p>
							</div>
							<div className={styles.inputWrapper}>
								<p>Give it a good title</p>
								<input
									type='text'
									placeholder='Promotional Reel'
									required
									onChange={(e) =>
										setReelData({
											...reelData,
											title: e.target.value,
										})
									}
									value={reelData.title}
								/>
							</div>
							<div className={styles.inputWrapper}>
								<p>Track for how many days?</p>
								<input
									type='number'
									placeholder='10'
									required
									onChange={(e) =>
										setReelData({
											...reelData,
											days: e.target.value,
										})
									}
									value={reelData.days}
								/>
								<p className={styles.info}>
									Data will get updated once everyday until
									completion
								</p>
							</div>
							<div
								className={styles.submit}
								onClick={ScheduleReel}
							>
								<p>Start Tracking</p>
							</div>
						</div>
					</div>
				</div>
			)}

			{loading == 'loader' && (
				<div className={styles.loading}>
					<div className={styles.loader}></div>
					<p className={styles.title}>
						Scheduling Reel
					</p>
					<p className={styles.info}>Please Wait</p>
				</div>
			)}
			{loading == 'success' && (
				<div className={styles.successWrapper}>
					<div className={styles.success}>
						<img
							src={success}
							alt=''
						/>
						<h3>Success</h3>
						<p>
							Your reel is now scheduled to tracked. You
							can check the insights on your profile
						</p>
						<div
							className={styles.submit}
							onClick={() => close()}
						>
							<p>Close</p>
						</div>
					</div>
				</div>
			)}
			{loading == 'failure' && (
				<div className={styles.successWrapper}>
					<div className={styles.success}>
						<img
							src='https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/red-x-icon.png'
							alt=''
						/>
						<h3>Failed to track!</h3>
						<p>{errorData.message}</p>
						<div
							className={styles.submit}
							onClick={() => close()}
						>
							<p>Close</p>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TrackingModal;
