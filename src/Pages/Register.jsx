import React, {
	useEffect,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Register.module.scss';
import { vars } from '../../config.js';
import {
	AiOutlineEyeInvisible,
	AiOutlineEye,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import earth from '../assets/videos/earth.mp4';
import { showMsg } from '../Reusable.js';
import successTick from '../assets/staticAssets/success.png';
import axios from 'axios';
import { MdArrowBack } from 'react-icons/md';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';
import logo from '../assets/IGLOADED_LOGO_WHITE.png';

import Transition from '../Transitions';

const Register = () => {
	const [passwordVisible, setPasswordVisible] =
		useState(false);
	const [currentState, setCurrentState] =
		useState('register');

	const [otpObj, setOtpObj] = useState({
		otp: '',
		timestamp: 0,
	});

	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		isPolicyAccepted: false,
	});

	const [isPageActive, setIsPageActive] = useState(
		!document.hidden
	);
	useEffect(() => {
		if (Cookies.get('token')) {
			window.location.href = '/';
		}
	}, [isPageActive]);

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

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [otpdata, setOtpData] = useState('');

	const [timer, setTimer] = useState(60);

	const [isTimerActive, setIsTimerActive] =
		useState(false);

	useEffect(() => {
		let time;
		if (isTimerActive && timer > 0) {
			time = setInterval(() => {
				setTimer((currentTimer) => currentTimer - 1);
			}, 1000);
		} else if (timer === 0) {
			setIsTimerActive(false);
			setTimer(60);
		}

		return () => {
			clearInterval(time);
		};
	}, [isTimerActive, timer]);

	const StartTimer = () => {
		setIsTimerActive(true);
	};
	const resendMail = () => {
		sendOtp();
		StartTimer();
	};

	const handleDigits = (e, id) => {
		if (e.target.value.length == 1) {
			if (id === 'otp1') {
				setOtpData(e.target.value);
				document.getElementById('otp2').focus();
			}
			if (id === 'otp2') {
				setOtpData(otpdata + e.target.value);
				document.getElementById('otp3').focus();
			}
			if (id === 'otp3') {
				setOtpData(otpdata + e.target.value);
				document.getElementById('otp4').focus();
			}
			if (id === 'otp4') {
				setOtpData(otpdata + e.target.value);
			}
		} else if (e.target.value.length == 0) {
			if (id === 'otp4') {
				document.getElementById('otp3').focus();
			}
			if (id === 'otp3') {
				document.getElementById('otp2').focus();
			}
			if (id === 'otp2') {
				document.getElementById('otp1').focus();
			}
		}
	};

	const sendOtp = () => {
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/requestotp`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				email: userData.email,
			},
		};

		axios(options)
			.then((result) => {
				if (result.data.status === 'ok') {
					setOtpObj({
						otp: result.data.otpvalue,
						timestamp: result.data.timestamp,
					});
					showMsg('OTP Sent Successfully', 'success');
					setCurrentState('verification');
				} else {
					showMsg('Something went wrong', 'error');
				}
			})
			.catch((err) => {
				if (err.response.data.message) {
					showMsg(err.response.data.message, 'error');
				}
			});
	};

	const validateEmail = (email) => {
		const regex =
			/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return regex.test(email);
	};

	const validatePassword = (password) => {
		const regex = /^.{8,}$/;
		return regex.test(password);
	};

	const registerUser = () => {
		if (
			userData.name == '' ||
			userData.email == '' ||
			userData.password == ''
		) {
			console.log(userData);
			showMsg('Please fill all the fields', 'error');
			return;
		}

		if (
			userData.name.length < 2 ||
			userData.name.length > 20
		) {
			showMsg(
				'Name must be between 2 to 50 characters',
				'error'
			);
			return;
		}

		if (userData.isPolicyAccepted == false) {
			showMsg(
				'Please accept the usage policy',
				'error'
			);
			return;
		}

		if (!validateEmail(userData.email)) {
			showMsg('Incorrect Email Address!', 'error');
			return;
		}

		if (!validatePassword(userData.password)) {
			showMsg(
				'Password must be atleast 8 characters',
				'error'
			);
			return;
		}

		const options = {
			method: 'GET',
			url: `${vars.API_URL}/user/userExist?email=${userData.email}`,
			headers: {
				'Content-Type': 'application/json',
			},
			withCredentials: true,
		};

		axios(options)
			.then((result) => {
				if (result.data.status === 'ok') {
					sendOtp();
					setCurrentState('verification');
				} else {
					showMsg('Something went wrong', 'error');
				}
			})
			.catch((err) => {
				console.log(err);
				if (
					err.response.data.message.toLowerCase() ==
					'User Found'.toLowerCase()
				) {
					showMsg('Account Already Exists!', 'error');
				} else {
					showMsg('Something went wrong', 'error');
				}
			});
	};

	const createUser = () => {
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/register`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				name: userData.name,
				email: userData.email,
				password: userData.password,
			},
		};

		axios(options)
			.then((result) => {
				if (result.data.status === 'ok') {
					setCurrentState('success');
					showMsg('Account created!', 'success');
				}
			})
			.catch((err) => {
				console.log(err);
				if (err.response.data.message) {
					showMsg(err.response.data.message, 'error');
				}
			});
	};

	const [maxTries, setMaxTries] = useState(5);

	const verifyOTP = () => {
		if (otpdata != '' && otpdata.length === 4) {
			const decryptedOtp = bcrypt.compareSync(
				String(otpdata),
				String(otpObj.otp)
			);
			if (decryptedOtp) {
				createUser();
			} else {
				showMsg('Incorrect OTP', 'error');
				setMaxTries(maxTries - 1);
				if (maxTries === 0) {
					setCurrentState('register');
					showMsg(
						'You have reached maximum no. of tries!',
						'error'
					);
				}
			}
		}
	};

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.backHome}
				onClick={() => {
					navigate(-1);
				}}
			>
				<MdArrowBack />
			</div>
			<div className={styles.left}>
				<div className={styles.videoContainer}>
					<video
						autoPlay
						loop
						muted
					>
						<source
							src={earth}
							type='video/mp4'
						/>
					</video>
				</div>
				<div className={styles.bg}></div>
			</div>
			<div className={styles.right}>
				<div className={styles.logo}>
					<img
						src={logo}
						alt=''
					/>
				</div>
				{currentState === 'register' && (
					<div className={styles.main}>
						<h2>Register New Account</h2>
						<p>
							Please enter your details to proceed to our
							dashboard
						</p>
						<input
							id='name'
							type='text'
							placeholder='Name'
							onChange={(data) => {
								setUserData({
									...userData,
									name: data.target.value,
								});
							}}
						/>
						<input
							id='email'
							type='email'
							placeholder='Email'
							onChange={(data) => {
								setUserData({
									...userData,
									email: data.target.value,
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
									onClick={() => setPasswordVisible(false)}
								/>
							) : (
								<AiOutlineEyeInvisible
									onClick={() => setPasswordVisible(true)}
								/>
							)}
						</div>
						<div className={styles.checkBoxWrapper}>
							<input
								type='checkbox'
								checked={userData.isPolicyAccepted}
								onChange={(e) => {
									setUserData({
										...userData,
										isPolicyAccepted: e.target.checked,
									});
								}}
							/>
							<p>
								I agree to the{' '}
								<span
									onClick={() =>
										window.open('/usage-policy', '_blank')
									}
								>
									Usage Policy
								</span>
							</p>
						</div>

						<div
							className={styles.submitbtn}
							onClick={registerUser}
						>
							Sign Up
						</div>
						<p className={styles.signUplabel}>
							Already have an account?{' '}
							<Link to='/login'>Sign In Instead</Link>
						</p>
					</div>
				)}
				{currentState === 'verification' && (
					<div className={styles.verificationWrapper}>
						<h2>OTP Verification</h2>
						<p>
							Please Provide the OTP sent to{' '}
							<span className={styles.mailLabel}>
								{userData.email}
							</span>
						</p>
						<div className={styles.otpWrapper}>
							<input
								id='otp1'
								type='text'
								maxLength='1'
								pattern='\d*'
								onChange={(e) => handleDigits(e, 'otp1')}
							/>
							<input
								id='otp2'
								type='text'
								maxLength='1'
								pattern='\d*'
								onChange={(e) => handleDigits(e, 'otp2')}
							/>
							<input
								id='otp3'
								type='text'
								maxLength='1'
								pattern='\d*'
								onChange={(e) => handleDigits(e, 'otp3')}
							/>
							<input
								id='otp4'
								type='text'
								maxLength='1'
								pattern='\d*'
								onChange={(e) => handleDigits(e, 'otp4')}
							/>
						</div>
						<p className={styles.ResendOtplabel}>
							Didn't receive the OTP?{' '}
							{!isTimerActive ? (
								<span
									className={styles.mailLabel}
									onClick={resendMail}
								>
									Resend OTP
								</span>
							) : (
								<span>{timer} sec left</span>
							)}
						</p>
						<div
							className={styles.submitbtn}
							onClick={verifyOTP}
						>
							<span>Submit</span>
						</div>
					</div>
				)}
				{currentState === 'success' && (
					<div className={styles.successWrapper}>
						<div className={styles.animationContainer}>
							<img
								src={successTick}
								alt=''
							/>
						</div>
						<h2>Registration Successful</h2>
						<p>
							You will be redirected to the login page in
							5 seconds
						</p>
						<div
							className={styles.submitbtn}
							onClick={() => navigate('/login')}
						>
							Back to Login
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Transition(Register);
