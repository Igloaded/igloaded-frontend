import React, {
	useEffect,
	useState,
} from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/Forgetpass.module.scss';
import {
	AiOutlineEyeInvisible,
	AiOutlineEye,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import earth from '../assets/videos/earth.mp4';
import axios from 'axios';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';
import { vars } from '../../config.js';
import successTick from '../assets/staticAssets/success.png';
import logo from '../assets/IGLOADED_LOGO_WHITE.png';
import { MdArrowBack } from 'react-icons/md';
import Cookies from 'js-cookie';
import bcrypt from 'bcryptjs';
import Transition from '../Transitions';

const ForgetPassword = () => {
	const [passwordVisible, setPasswordVisible] =
		useState(false);
	const [currentState, setCurrentState] =
		useState('register');

	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		name: '',
		email: '',
		password: '',
		Againpassword: '',
	});

	// const [isPageActive, setIsPageActive] = useState(
	// 	!document.hidden
	// );
	// useEffect(() => {
	// 	if (Cookies.get('token')) {
	// 		window.location.href = '/';
	// 	}
	// }, [isPageActive]);

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

	const removeAllCookies = () => {
		Object.keys(Cookies.get()).forEach((key) => {
			Cookies.remove(key);
		});
	};

	const redirect = () => {
		removeAllCookies();
		navigate('/login');
	};

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
		console.log('Resend Mail');
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

	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] =
		useState(false);

	const ClearFields = () => {
		setEmail('');
	};

	const [otpObject, setOtpObject] = useState({
		otp: '',
		timestamp: 0,
	});

	const sendOtp = () => {
		const Options = {
			method: 'POST',
			url: `${vars.API_URL}/user/verifymail`,
			data: {
				email: email,
			},
			withCredentials: true,
		};

		axios(Options)
			.then((res) => {
				if (res.data.status === 'ok') {
					setIsLoading(false);
					setOtpObject({
						otp: res.data.otpvalue,
						timestamp: res.data.timestamp,
					});
					setCurrentState('verification');
					showMsg('OTP sent to your mail', 'success');
				}
			})
			.catch((err) => {
				setIsLoading(false);
				// if (err.response.data) {
				// 	showMsg(err.response.data.message, 'error');
				// }
			});
	};

	const EmailInput = () => {
		if (email != '') {
			setIsLoading(true);
			const Options = {
				method: 'POST',
				url: `${vars.API_URL}/user/verifymail`,
				data: {
					email: email,
				},
				withCredentials: true,
			};

			axios(Options)
				.then((res) => {
					if (res.data.status === 'ok') {
						setIsLoading(false);
						setOtpObject({
							otp: res.data.otpvalue,
							timestamp: res.data.timestamp,
						});
						setCurrentState('verification');
						showMsg('OTP sent to your mail', 'success');
					}
				})
				.catch((err) => {
					console.log(err);
					setIsLoading(false);
					if (err.response.data) {
						showMsg(err.response.data.message, 'error');
					}
				});
		}
	};

	const [maxTries, setMaxTries] = useState(5);

	const verifyOTP = () => {
		if (otpdata != '' && otpdata.length === 4) {
			const decryptedOtp = bcrypt.compareSync(
				String(otpdata),
				String(otpObject.otp)
			);
			const currentTime = new Date().getTime();
			if (
				otpObject.timestamp + 300000 <
				currentTime
			) {
				showMsg('OTP Expired', 'error');
				return;
			}

			if (decryptedOtp) {
				setCurrentState('changepassword');
			} else {
				showMsg('Invalid OTP', 'error');
				setMaxTries(maxTries - 1);
				if (maxTries == 0) {
					showMsg('Maximum tries exceeded', 'error');
					setCurrentState('register');
				}
			}
		}
	};

	const validatePassword = (password) => {
		const regex = /^.{8,}$/;
		return regex.test(password);
	};

	const changepassword = () => {
		if (
			userData.password != '' &&
			userData.Againpassword != '' &&
			userData.password === userData.Againpassword
		) {
			if (validatePassword(userData.password)) {
				const Options = {
					method: 'PATCH',
					url: `${vars.API_URL}/user/forgetpassword`,
					data: {
						newpassword: userData.password,
						email: email,
					},
					withCredentials: true,
				};

				axios(Options)
					.then((res) => {
						if (res.data.status === 'ok') {
							setCurrentState('success');
							showMsg('Password Changed', 'success');
						}
					})
					.catch((err) => {
						console.log(err);
						if (err.response.data) {
							showMsg(
								err.response.data.message,
								'error'
							);
						}
					});
			} else {
				showMsg(
					'Password must be atleast 8 characters long',
					'error'
				);
			}
		} else {
			showMsg('Passwords do not match', 'error');
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
						<h2>Forget Password?</h2>
						<p>
							No worries! Enter your email and we will
							create a new password
						</p>
						<input
							id='email'
							type='email'
							placeholder='Email'
							onChange={(data) => {
								setEmail(data.target.value);
							}}
							value={email}
						/>
						<div
							className={styles.submitbtn}
							onClick={EmailInput}
						>
							Verify Mail
							{isLoading && (
								<PulseLoader
									color='#ffffff'
									size={7}
									margin={2}
								/>
							)}
						</div>
						<p className={styles.signUplabel}>
							Wanna Login?{' '}
							<Link to='/login'>Back to Login</Link>
						</p>
					</div>
				)}
				{currentState === 'verification' && (
					<div className={styles.verificationWrapper}>
						<h2>OTP Verification</h2>
						<p>
							Please Provide the OTP sent to{' '}
							<span className={styles.mailLabel}>
								{email}
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
						<h2>Password Changed</h2>
						<p>
							Your password has been changed
							successfully!
						</p>
						<div
							className={styles.submitbtn}
							onClick={redirect}
						>
							Back to Login
						</div>
					</div>
				)}
				{currentState === 'changepassword' && (
					<div className={styles.changePassWrapper}>
						<h2>Create New Password</h2>
						<div className={styles.passwordWrapper}>
							<input
								type={
									passwordVisible ? 'text' : 'password'
								}
								placeholder='New Password'
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
						<div className={styles.passwordWrapper}>
							<input
								type={
									passwordVisible ? 'text' : 'password'
								}
								placeholder='Again New Password'
								onChange={(data) => {
									setUserData({
										...userData,
										Againpassword: data.target.value,
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
						<div
							className={styles.submitbtn}
							onClick={changepassword}
						>
							Submit
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Transition(ForgetPassword);
