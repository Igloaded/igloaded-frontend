import React, {
	useEffect,
	useState,
} from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import styles from '../Styles/Contact.module.scss';
import { FaInstagram } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';
import { IoSendOutline } from 'react-icons/io5';
import { GoCheckCircle } from 'react-icons/go';
import { IoCallOutline } from 'react-icons/io5';
import contactus from '../assets/staticAssets/contact-us.png';
import { showMsg } from '../Reusable.js';
import { vars } from '../../config.js';
import axios from 'axios';
import Transition from '../Transitions';

const Privacy = () => {
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

	const getCurrentDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hour = date.getHours();
		const minute = date.getMinutes();
		const second = date.getSeconds();
		return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
	};

	const [formData, setFormData] = useState({
		email: '',
		subject: '',
		message: '',
		datetime: getCurrentDate(),
	});
	const validateEmail = (email) => {
		const re =
			/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	const sendMessage = () => {
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/contact/form`,
			headers: {
				'Content-Type': 'application/json',
			},
			data: formData,
			withCredentials: 'true',
		};

		axios(options)
			.then((res) => {
				console.log(res);
				resetForm();
				if (res.data.status === 'ok') {
					showMsg(
						'Message sent successfully',
						'success'
					);
				} else {
					showMsg(
						'An error occured. Please try again later',
						'error'
					);
				}
			})
			.catch((err) => {
				console.log(err);
				resetForm();
				showMsg(
					'An error occured. Please try again later',
					'error'
				);
			});
	};

	const resetForm = () => {
		setFormData({
			email: '',
			subject: '',
			message: '',
		});
	};

	const validateForm = () => {
		if (validateEmail(formData.email)) {
			if (
				formData.subject.length > 0 &&
				formData.subject.length < 50
			) {
				if (
					formData.message.length > 0 &&
					formData.message.length < 300
				) {
					sendMessage();
				} else {
					showMsg('Invalid Message', 'error');
				}
			} else {
				showMsg('Invalid Subject', 'error');
			}
		} else if (formData.email.length === 0) {
			showMsg('Please enter an email', 'error');
		} else {
			showMsg('Please enter a valid email', 'error');
		}
	};
	return (
		<div className={styles.main}>
			<Header />
			<div className={styles.headingWrapper}>
				<h2> IGLoaded / Contact Us</h2>
			</div>
			<div className={styles.contentWrapper}>
				<div className={styles.left}>
					<img
						src={contactus}
						alt=''
					/>
					<h3>Contact Us</h3>
					<p>
						IGLoaded is dedicated to provide you with
						the best service possible. We are always
						available to answer your questions and
						handle any queries you have. Please feel
						free to contact us at any time.
					</p>
					<div className={styles.verifiedName}>
						<h4>Business Verfied Name</h4>
						<div className={styles.nameWrapper}>
							<p>Aditya Ambikaprasad Singh</p>
							<GoCheckCircle />
						</div>
					</div>

					<h4>Address</h4>
					<p>
						Room N.o 106, 1st floor, Vasantdata Patil
						College Incubation Centre, Near LBS Marg,
						Evarad nagar, Sion, Mumbai - 400022
					</p>
					<div className={styles.iconHolder}>
						<div
							className={styles.icon}
							title='contact@igloaded.com'
							onClick={() =>
								(window.location.href =
									'mailto:support@igloaded.com')
							}
						>
							<MdOutlineEmail />
						</div>
						<div
							className={styles.icon}
							title='@ig.loaded'
							onClick={() =>
								window.open(
									'https://instagram.com/ig.loaded',
									'_blank'
								)
							}
						>
							<FaInstagram />
						</div>
					</div>
				</div>
				<div className={styles.right}>
					<h3>Send us a Message</h3>
					<input
						type='text'
						placeholder='Email Address *'
						onChange={(e) =>
							setFormData({
								...formData,
								email: e.target.value,
							})
						}
						value={formData.email}
					/>
					<input
						type='text'
						placeholder='Subject'
						onChange={(e) =>
							setFormData({
								...formData,
								subject: e.target.value,
							})
						}
						value={formData.subject}
					/>
					<textarea
						name=''
						placeholder='Message'
						id=''
						cols='30'
						rows='10'
						onChange={(e) =>
							setFormData({
								...formData,
								message: e.target.value,
							})
						}
						value={formData.message}
					></textarea>

					<div
						className={styles.sendButton}
						onClick={validateForm}
					>
						<p>Send Message</p>
						<IoSendOutline />
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Transition(Privacy);
