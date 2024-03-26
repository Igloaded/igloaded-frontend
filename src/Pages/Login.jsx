import React, {
	useEffect,
	useState,
} from 'react';
import styles from '../Styles/Login.module.scss';
import {
	AiOutlineEyeInvisible,
	AiOutlineEye,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import logo from '../assets/IGLOADED_LOGO_WHITE.png';
import earth from '../assets/videos/earth.mp4';
import { toast } from 'react-toastify';
import axios from 'axios';
import Cookies from 'js-cookie';
import { PulseLoader } from 'react-spinners';
import { vars } from '../../config.js';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import {
	Modal,
	closeModal,
} from '../Components/Modal.jsx';
import Transition from '../Transitions';

const Login = () => {
	const Navigate = useNavigate();
	const [passwordVisible, setPasswordVisible] =
		useState(false);
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});
	const [isPageActive, setIsPageActive] = useState(
		!document.hidden
	);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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
		const handleVisibilityChange = () => {
			setIsPageActive(!document.hidden);
		};

		document.addEventListener(
			'visibilitychange',
			handleVisibilityChange
		);

		return () => {
			document.removeEventListener(
				'visibilitychange',
				handleVisibilityChange
			);
		};
	}, []);

	useEffect(() => {
		if (Cookies.get('token')) {
			window.location.href = '/';
		}
	}, [isPageActive]);

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

	const [isLoading, setIsLoading] =
		useState(false);

	const clearFields = () => {
		setUserData({
			email: '',
			password: '',
		});
	};
	const handleLogin = () => {
		setIsLoading(true);
		if (
			userData.email === '' ||
			userData.password === ''
		) {
			setIsLoading(false);
			return showMsg(
				'Please fill all the fields',
				'error'
			);
		}

		setTimeout(() => {
			axios
				.post(`${vars.API_URL}/user/login`, userData)
				.then((result) => {
					clearFields();
					setIsLoading(false);
					if (result.data.status === 'ok') {
						Cookies.set('token', result.data.token);
						Cookies.set('name', result.data.name);
						Cookies.set('email', result.data.email);
						setTimeout(() => {
							openPage('/public/download');
						}, 1500);
						showMsg('Login Successful', 'success');
					} else {
						showMsg(result.data.message, 'error');
					}
				})
				.catch(function (error) {
					clearFields();
					setIsLoading(false);
					if (error.message == 'Network Error') {
						showMsg('Network Error', 'error');
					}
					if (
						error.response.data.message ==
						'User blocked'
					) {
						Modal({
							title: 'Account Blocked',
							description:
								'Your account has been blocked. Please contact support.',
							icon: 'error',
							cancel: false,
							confirmText: 'Ok',
						});
					} else {
						showMsg(
							error.response.data.message,
							'error'
						);
					}
				});
		}, 500);
	};

	const openPage = (url) => {
		Navigate(url);
	};

	return (
		<div className={styles.wrapper}>
			<div
				className={styles.backHome}
				onClick={() => {
					Navigate(-1);
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
				<div className={styles.main}>
					<h2>Log In</h2>
					<p>
						Please enter your email and password to
						login our dashboard
					</p>
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
						value={userData.email}
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
							value={userData.password}
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
						onClick={handleLogin}
					>
						Sign In
						{isLoading && (
							<PulseLoader
								color='#fff'
								size={7}
								margin={2}
							/>
						)}
					</div>
					<p className={styles.signUplabel}>
						Don't have an account?{' '}
						<Link to='/register'>Sign Up</Link>
					</p>
					<Link
						to='/forgetpassword'
						className={styles.forgetpassLabel}
					>
						Forget Password?
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Transition(Login);
