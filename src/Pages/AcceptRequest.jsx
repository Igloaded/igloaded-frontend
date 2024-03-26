import React, {
	useEffect,
	useState,
	useRef,
	useCallback,
} from 'react';
import styles from '../Styles/AcceptRequest.module.scss';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import {
	Modal,
	closeModal,
} from '../Components/Modal';
import { GoArrowRight } from 'react-icons/go';
import { CiCircleCheck } from 'react-icons/ci';
import {
	AiOutlineEyeInvisible,
	AiOutlineEye,
} from 'react-icons/ai';
import { MdVerified } from 'react-icons/md';
import { TbRefresh } from 'react-icons/tb';
import {
	IoCheckmarkSharp,
	IoLogOutOutline,
} from 'react-icons/io5';
import { LuRefreshCcw } from 'react-icons/lu';
import axios from 'axios';
import bgFollower from '../assets/Ig/ig_follower.png';
import { vars } from '../../config.js';

import PuffLoader from 'react-spinners/PuffLoader';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import { Tooltip } from 'react-tooltip';
import { checkPlan } from '../Routes/checkPlan.js';

import Transition from '../Transitions';

const { API_URL } = vars;
const AcceptRequest = () => {
	useEffect(() => {
		window.scrollTo(0, 0);
		getPlanDetails();
	}, []);

	const [planDetails, setPlanDetails] = useState({
		plan: '',
		credits: 0,
	});

	const getPlanDetails = async () => {
		if (!Cookies.get('email')) {
			return;
		}
		const email = Cookies.get('email');
		const res = await checkPlan(email);
		if (res.success) {
			setPlanDetails({
				plan: res.resp.data.plan.planName,
				credits: res.resp.data.credits,
			});
		}
	};

	// useEffect(() => {
	// 	console.log(planDetails);
	// }, [planDetails]);

	useEffect(() => {
		document.documentElement.classList.add(
			styles['homePage']
		);

		return () => {
			document.documentElement.classList.remove(
				styles['homePage']
			);
		};
	}, []);

	const [errorData, setErrorData] = useState({
		title: 'Instagram Login Failed!',
		description: `Please open the Instagram App and complete the security check.`,
		icon: 'warning',
		cancel: false,
		confirmText: 'Okay',
	});

	const ShowModal = (error) => {
		return Modal(error);
	};
	const [passwordVisible, setPasswordVisible] =
		useState(false);
	const [backupVisible, setBackupVisible] =
		useState(false);

	const [code, setCode] = useState(null);

	const [showState, setShowState] =
		useState('login');

	const [userRequestData, setUserRequestData] =
		useState({
			requests: [],
			count: '',
			username: null,
			name: null,
			profilePicture: null,
			followersCount: '',
			followingCount: '',
			postCount: '',
			isVerified: false,
			biolink: [],
		});

	const [userData, setUserData] = useState({
		username: '',
		password: '',
		backupCode: 0,
		timestamp: '',
	});

	const setState = (state) => {
		setShowState(state);
	};

	const validateData = () => {
		if (userData.username === '') {
			const newErrorData = {
				...errorData,
				description: 'Please enter a username',
			};
			setErrorData(newErrorData);
			ShowModal(newErrorData);
		} else if (userData.password === '') {
			const newErrorData = {
				...errorData,
				description: 'Please enter a password',
			};
			setErrorData(newErrorData);
			ShowModal(newErrorData);
		} else {
			getInstagramLogin();
		}
	};

	const getInstagramLogin = async () => {
		setState('loading');
		const options = {
			method: 'POST',
			url: `${API_URL}/track/login`,
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: userData,
			withCredentials: true,
		};
		axios(options)
			.then((res) => {
				getRequests();
			})
			.catch((error) => {
				console.log(error);
				setState('login');
				if (
					error.response.data.message ==
					'Daily scan limit exceeded'
				) {
					const newErrorData = {
						...errorData,
						description: 'Daily scan limit exceeded',
					};
					ShowModal(newErrorData);
				}
				if (
					error.response.data.code === 'invalid_user'
				) {
					const newErrorData = {
						...errorData,
						description: 'Invalid Username or Password',
					};
					ShowModal(newErrorData);
				} else if (
					error.response.data.code ===
					'checkpoint_challenge_required'
				) {
					const newErrorData = {
						...errorData,
						description: `Please open the Instagram App and complete the security check and retry logging In again`,
					};
					ShowModal(newErrorData);
				} else if (
					error.response.data.message ==
					'Error logging in'
				) {
					const newErrorData = {
						...errorData,
						description:
							'Please check your credentials or Backup Code and try again',
					};
					ShowModal(newErrorData);
				} else if (
					error.response.data.message ==
					'Insufficient credits'
				) {
					const newErrorData = {
						title: 'Insufficient credits',
						description:
							error.response.data.messageDetail,
					};
					ShowModal(newErrorData);
				}
			});
	};

	const getRequests = async () => {
		setState('loading');
		const options = {
			method: 'POST',
			url: `${API_URL}/track/checkrequest`,
			data: {
				username: userData.username,
			},
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			withCredentials: true,
		};

		await axios(options)
			.then(async (res) => {
				setUserRequestData((data) => ({
					...data,
					requests: res.data.data.request_list,
					count: res.data.data.request_count,
					username: res.data.data.username,
					name: res.data.data.full_name,
					profilePicture:
						res.data.data.profile_pic_url,
					followersCount: res.data.data.follower_count,
					followingCount:
						res.data.data.following_count,
					postCount: res.data.data.media_count,
					isVerified: res.data.data.is_verified,
					isPrivate: res.data.data.is_private,
				}));
				setState('success');
			})
			.catch((error) => {
				console.log(error);
				console.log(error.response.data.message);
				setErrorData((data) => {
					const updatedErrorData = {
						title:
							error.response.data.message ||
							`Error Occured!`,
						description:
							error.response.data?.messageDetail ||
							error.response.data?.message,
					};
					ShowModal(updatedErrorData);
					return updatedErrorData;
				});
				setState('login');
			});
	};

	const Logout = async () => {
		setShowState('Loggingout');
		const options = {
			method: 'POST',
			data: {
				username: userData.username,
			},
			headers: {
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			url: `${API_URL}/track/logout`,
			withCredentials: true,
		};

		await axios(options)
			.then((res) => {
				if (res.data.success) {
					console.log(res);
					successMsg('Logged Out Successfully');
					setState('login');
				}
			})
			.catch((error) => {
				console.log(error);
				setShowState('login');
				errorMsg('Error Occured' + error.message);
			});
	};

	const toastRef = useRef(null);

	const toastProps = {
		position: 'top-right',
		hideProgressBar: true,
		closeOnClick: true,
		pauseOnHover: true,
		autoClose: 5000,
		draggable: true,
		progress: undefined,
		theme: 'light',
	};

	const updateToast = (message, success) => {
		if (success == true) {
			toast.update(toastRef.current, {
				hideProgressBar: false,
				type: toast.TYPE.SUCCESS,
				render: message,
				autoClose: 5000,
				closeButton: null,
			});
		} else {
			toast.update(toastRef.current, {
				hideProgressBar: false,
				type: toast.TYPE.ERROR,
				render: message,
				autoClose: 5000,
				closeButton: null,
			});
		}
	};

	const errorMsg = (msg) => {
		toast.error(msg);
	};

	const successMsg = (msg) => {
		toast.success(msg);
	};

	const showToast = (message) => {
		toastRef.current = toast(
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-start',
					alignItems: 'center',
				}}
			>
				<PuffLoader
					size={40}
					aria-label='Loading Spinner'
					data-testid='loader'
				/>
				<span style={{ margin: '0 0 0 15px' }}>
					{message}
				</span>
			</div>,
			toastProps
		);
	};

	return (
		<>
			<div className={styles.main}>
				<Header />
				<div className={styles.bgImageWrapper}></div>
				<div className={styles.hero}>
					<img
						src={bgFollower}
						alt=''
					/>
					<h1>
						Large Instagram Page?
						<br />
						Check your requests here
					</h1>
					<p>We've got you covered</p>
				</div>
				{showState === 'login' && (
					<>
						<div className={styles.inputCard}>
							<p className={styles.info}>
								Get exact number of your requests and
								follower count!
							</p>
							<input
								type='text'
								placeholder='Username'
								onChange={(data) => {
									setUserData({
										...userData,
										username: data.target.value,
									});
								}}
							/>
							<div className={styles.passwordWrapper}>
								<input
									type={
										passwordVisible ? 'text' : 'password'
									}
									placeholder='Password'
									onChange={(data) => {
										setUserData({
											...userData,
											password: data.target.value,
										});
									}}
								/>
								{passwordVisible ? (
									<AiOutlineEye
										onClick={() =>
											setPasswordVisible(false)
										}
									/>
								) : (
									<AiOutlineEyeInvisible
										onClick={() => setPasswordVisible(true)}
									/>
								)}
							</div>
							<div className={styles.passwordWrapper}>
								<input
									type={
										backupVisible ? 'text' : 'password'
									}
									placeholder='Backup Code (For 2 Factor Authentication)'
									onChange={(data) => {
										setUserData({
											...userData,
											backupCode: data.target.value,
										});
									}}
								/>
								{backupVisible ? (
									<AiOutlineEye
										onClick={() => setBackupVisible(false)}
									/>
								) : (
									<AiOutlineEyeInvisible
										onClick={() => setBackupVisible(true)}
									/>
								)}
							</div>
							<div
								onClick={validateData}
								className={styles.submitbtn}
							>
								<p>Get Started</p>
								<GoArrowRight />
							</div>
							<p>
								🤫 Don't worry! We'll keep this a secret
							</p>
						</div>
					</>
				)}
				{showState === 'loading' && (
					<div className={styles.loading}>
						<div className={styles.loader}></div>
						<p>Logging you In</p>
						<p>Please wait</p>
					</div>
				)}
				{showState === 'Loggingout' && (
					<div className={styles.loading}>
						<div className={styles.loader}></div>
						<p>Logging Out</p>
						<p>Please wait</p>
					</div>
				)}
				{showState == 'authenticate' && (
					<div
						className={styles.authenticationWrapper}
					>
						<h2 className={styles.heading}>
							2FA Detected
						</h2>
						<p>@_.adityyaa</p>
						<p className={styles.subheading}>
							Please enter code sent to the registered
							Phone number
						</p>

						<input
							type='text'
							placeholder='One Time Password'
							value={code}
							onChange={(e) => setCode(e.target.value)}
						/>

						<div className={styles.buttonSubmit}>
							<p>Submit</p>
							<span>
								<CiCircleCheck />
							</span>
						</div>
					</div>
				)}
				{showState == 'success' && (
					<>
						<div
							id='#profile'
							className={styles.profileWrapper}
						>
							<div className={styles.topsection}>
								<img
									src={
										userRequestData.profilePicture
											? userRequestData.profilePicture
											: ''
									}
									alt=''
								/>
							</div>
							<div className={styles.nameWrapper}>
								<p className={styles.username}>
									{userRequestData.username}
									{userRequestData.isVerified && (
										<MdVerified
											style={{ color: '#0095f6' }}
											data-tooltip-id='verified-og'
										/>
									)}
								</p>
								<Tooltip
									id='verified-og'
									content='Verified'
									place='right'
								/>
								<h2 className={styles.name}>
									{userRequestData.full_name}
								</h2>
								{userRequestData.isPrivate && (
									<span>Private</span>
								)}
								<div className={styles.stats}>
									<div className={styles.stat}>
										<p>{userRequestData.followersCount}</p>
										<p>Followers</p>
									</div>
									<div className={styles.stat}>
										<p>{userRequestData.count}</p>
										<p>Requests</p>
									</div>
									<div className={styles.stat}>
										<p>{userRequestData.followingCount}</p>
										<p>Following</p>
									</div>
								</div>
								<div className={styles.btnWrapper}>
									<div
										className={styles.btn}
										onClick={getRequests}
									>
										<p>Refresh</p>
										<LuRefreshCcw />
									</div>
									<div
										className={styles.btn}
										onClick={Logout}
									>
										<p>Logout</p>
										<IoLogOutOutline />
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			<Footer />
		</>
	);
};

export default Transition(AcceptRequest);
