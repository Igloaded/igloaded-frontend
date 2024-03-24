import React, {
	useEffect,
	useState,
} from 'react';
import styles from '../Styles/Subscribe.module.scss';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { RxCross2 } from 'react-icons/rx';
import AnimatedNumber from 'react-awesome-animated-number';
import 'react-awesome-animated-number/dist/index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import background from '../assets/svgs/subscribe_background.svg';
import faqImage from '../assets/svgs/faq_svg.svg';
import { Tooltip } from 'react-tooltip';
import { Collapse } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { vars } from '../../config.js';
import { MdStarBorderPurple500 } from 'react-icons/md';
import Cookies from 'js-cookie';
import {
	modifyAddToEpoch,
	epochCurrent,
	showMsg,
} from '../Reusable.js';

const Subscribe = () => {
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

	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		status: false,
		name: '',
		greeting: '',
		email: '',
		credits: 0,
		planName: '',
	});

	const logout = () => {
		removeCookies();
		navigate('/');
	};

	const removeCookies = () => {
		for (const cookie in Cookies.get()) {
			Cookies.remove(cookie);
		}
	};

	const getUserData = () => {
		if (!Cookies.get('token')) {
			return;
		}
		const email = Cookies.get('email');
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

		axios(options)
			.then((res) => {
				console.log(res.data);
				setUserData({
					status: true,
					name: res.data.data.name,
					greeting: `Hello, ${res.data.data.name}`,
					email: res.data.data.email,
					credits: res.data.data.credits,
					planName: res.data.data.plan.planName,
				});
			})
			.catch((error) => {
				console.log(error);
				if (
					error.response.data.error ==
					'User is blocked'
				) {
					logout();
					showMsg(
						'Your account has been blocked',
						'error'
					);
				} else if (
					error.response.data.error ==
					'The token has expired'
				) {
					logout();
					showMsg(
						'Your session has been expired',
						'error'
					);
				}
			});
	};

	const validatePayment = (
		razorpayPaymentId,
		razorpayOrderId,
		razorpaySignature,
		planData
	) => {
		const { planName, initialAmount, finalAmount } =
			planData;
		const ordeDetails = {
			notifyUser: true,
			email: Cookies.get('email'),
			amount: finalAmount,
			transactionType: 'planpurchase',
			transactionData: {
				tax: getTaxAmount(initialAmount),
				discount: 0,
				total: finalAmount,
				price: initialAmount,
				credits: 0,
				gatewayCharges: getGatewayCharges(
					initialAmount
				),
			},
			orderId: razorpayOrderId,
			plan: {
				planName: planName,
				isExtensionEnabled: true,
				extensionUsernames: [],
			},
		};
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/payment/payment-verify`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: {
				razorpayPaymentId,
				razorpayOrderId,
				razorpaySignature,
				ordeDetails: ordeDetails,
			},
			withCredentials: true,
		};

		axios(options)
			.then((response) => {
				console.log(response);
				const epochTime = epochCurrent('ms');
				if (response.data.status === 'ok') {
					let planData = {
						status: 'success',
						reason: '',
						orderId: razorpayOrderId,
						planName: `${planName} Plan - Monthly`,
						duration: '30 Days',
						planExpiry: modifyAddToEpoch(epochTime, 30),
						amount: finalAmount,
					};
					localStorage.setItem(
						'orderDetails',
						JSON.stringify(planData)
					);
					Cookies.set('orderId', razorpayOrderId, {
						expires: 1 / 96,
					});
					showMsg('Payment Successful', 'success');
					setTimeout(() => {
						window.open(
							`/post/payment/${razorpayOrderId}`,
							'_self'
						);
					}, 2000);
				}
			})
			.catch((error) => {
				console.log(error);
				showMsg('Payment Failed', 'error');
			});
	};

	const openPaymentScreen = (
		initialAmount,
		finalAmount,
		order_id,
		planName
	) => {
		const planData = {
			planName: planName,
			initialAmount: initialAmount,
			finalAmount: finalAmount,
			orderId: order_id,
		};
		var options = {
			key: vars.RAZORPAY_KEY,
			amount: finalAmount,
			currency: 'INR',
			name: 'IGLoaded',
			description: `${planName} Plan Purchase`,
			image:
				'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708870604/StaticAssests/favicon_hxet6p.png',
			order_id: order_id,
			handler: function (response) {
				console.log(response);
				validatePayment(
					response.razorpay_payment_id,
					response.razorpay_order_id,
					response.razorpay_signature,
					planData
				);
			},
			prefill: {
				name: Cookies.get('name'),
				email: Cookies.get('email'),
				contact: '',
			},
			notes: {
				address: '',
			},
			theme: {
				color: '#6762ff',
			},
		};
		var rzp1 = new Razorpay(options);
		rzp1.on('payment.failed', function (response) {
			console.log(response);
			showMsg('Payment Failed', 'error');
		});
		rzp1.open();
	};

	const getTaxAmount = (amount) => {
		let num = Number(amount * 0);
		return Number(Math.ceil(num));
	};

	const getGatewayCharges = (amount) => {
		let num = Number(amount * 0.03);
		return Number(Math.ceil(num));
	};

	const getPayableAmount = (amount) => {
		let finalAmt =
			amount +
			getTaxAmount(amount) +
			getGatewayCharges(amount);
		return Number(finalAmt.toFixed(0));
	};

	const inititatePayment = (
		id,
		price,
		planName
	) => {
		const promocodeData = {
			isPromocodeApplied: false,
			promocode: '',
			discount: 0,
		};
		const paymentData = {
			purchaseId: id,
			creditsAmount: 0,
			price: price,
			tax: getTaxAmount(price),
			gatewayCharges: getGatewayCharges(price),
			finalAmount: getPayableAmount(price),
			discount: 0,
			purchaseType: 'plan',
		};
		const options = {
			method: 'POST',
			url: `${vars.API_URL}/user/payment/initiate`,
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${Cookies.get('token')}`,
			},
			data: JSON.stringify({
				email: Cookies.get('email'),
				paymentData: paymentData,
				promocodeData: promocodeData,
			}),
			withCredentials: true,
		};

		axios(options)
			.then((response) => {
				console.log(response);
				if (
					response.data.status === 'ok' ||
					response.status == 200
				) {
					openPaymentScreen(
						price,
						getPayableAmount(price),
						response.data.id,
						planName
					);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	useEffect(() => {
		getUserData();
		gsap.registerPlugin(ScrollTrigger);
		gsap.to(`.${styles.rightWrapper1}`, {
			y: '-100%',
			scrollTrigger: {
				trigger: `.${styles.rightWrapper1}`,
				start: 'top 30%',
				end: 'bottom 30%',
				scrub: 5,
			},
		});
	}, []);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);
		gsap.to(`.${styles.rightWrapper2}`, {
			y: '-100%',
			scrollTrigger: {
				trigger: `.${styles.rightWrapper2}`,
				start: 'top 30%',
				end: 'bottom 30%',
				scrub: 5,
			},
		});
	}, []);

	const items = [
		{
			key: '1',
			label: 'What is Credit?',
			children: (
				<p>
					A <b>Credit</b> is a balance that can be used
					to purchase a service in IGLOADED. For
					example, you can use credits to view pending
					follow counts, track reels, etc.
				</p>
			),
		},
		{
			key: '2',
			label:
				'If I have purchased a plan, can I change it?',
			children: (
				<p>
					<b>Yes</b>, Immediately after changing, the
					new plan becomes active and the previous plan
					gets discarded. Also the plans are
					Non-Refundable
				</p>
			),
		},
		{
			key: '3',
			label: 'What is a Pending Request?',
			children: (
				<p>
					Pending Request is the exact number (Precise
					value e.g 14,541) of request that is pending
					to be accepted in any private account.
				</p>
			),
		},
		{
			key: '4',
			label:
				'What is `Access to Chrome Web Extension?`',
			children: (
				<p>
					<b>PowerFetcher</b> is a powerful chrome
					extension tool can help you fetch data for
					your account. It can be used to fetch data
					like followers, following, pending requests
					counts. <br />
					<b>NOTE</b>: This requires login with IG in
					the same browser in which you are using
					IGLOADED.
				</p>
			),
		},
		{
			key: '5',
			label: 'Can I get post of Private accounts?',
			children: (
				<p>
					<b>Currently No, </b>IGLOADED doesn't
					supports viewing and downloading private
					posts as of now.
				</p>
			),
		},
		{
			key: '6',
			label:
				'How many usernames are supported with IGLoaded Web Extension?',
			children: (
				<p>
					<b>Only One</b> username is supported with
					IGLoaded Web Extension. Meaning, Data of only
					single account will be made available to you
					which you will provide in{' '}
					<b>Profile -&gt; Web Extension</b>.
				</p>
			),
		},
		{
			key: '7',
			label:
				'Will I get Web extension in free plan?',
			children: (
				<p>
					<b>Unfortunately, No</b> Free Plan doesn't
					get any Web Extension Support. You can
					consider purchasing the plan accordingly.
				</p>
			),
		},
		{
			key: '8',
			label:
				'What If I want to track 2 usernames with IGLoaded Web Extension?',
			children: (
				<p>
					<b>Sure you can!</b> You can consider
					contacting the support team for adding
					another username.
				</p>
			),
		},
		{
			key: '9',
			label: `What is '3 Free Pending Requests' ?`,
			children: (
				<p>
					This Simply means that you can view the exact
					number of pending requests in any private
					account for 3 times for free. After that, you
					will be charged 10 credits per request ( May
					vary according to the plan ).
				</p>
			),
		},
		{
			key: '11',
			label: `Can I Scan Unlimited Requests in the 'Professional Plan' ?`,
			children: (
				<p>
					Yes, You can scan for large number of times,
					But it is recommended to <b>use it wisely</b>{' '}
					and to not spam. If you get found spamming,
					your IG account may get restricted
					temporirily or permanently.
				</p>
			),
		},
	];

	const [subscriptionData, setSubscriptionData] =
		useState([
			{
				id: 1,
				tag: 'Beginner Plan',
				title: 'Free',
				Monthprice: 0,
				Yearprice: 0,
				description: 'For Testing & Figuring Out',
				ChecklistMonth: [
					'100 Post / Story / Profiles',
					'3 Free Pending Requests',
					'10 Credits / Request After Free Limit',
					'Can Download Media',
				],
				UncheckListMonth: [
					'On Demand Support',
					'Track reels',
					'Access to Chrome Web Extension',
				],
			},
			{
				id: 2,
				tag: 'Intermediate Plan',
				title: 'Individual',
				Monthprice: 2999,
				Yearprice: 8999,
				description: 'For Targeted Instagram Pages',
				ChecklistMonth: [
					'450 Post / Story / Profiles / Month',
					'50 Free Pending Requests',
					'5 Credits / Request After Free Limit',
					'Can Download Media',
					'On Demand Support',
					'Track upto 10,000 reels',
				],
				UncheckListMonth: [
					'Access to Chrome Web Extension',
				],
			},
			{
				id: 3,
				tag: (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '0.5rem',
						}}
					>
						{'Most Choosen'}
						<MdStarBorderPurple500 />
					</div>
				),
				title: 'Professional',
				Monthprice: 12999,
				Yearprice: 19999,
				description: 'For Large Instagram Pages',
				ChecklistMonth: [
					'1000 Post / Story / Profiles / Month',
					'199 Free Pending Requests',
					'2 Credits / Request After Free Limit',
					'Can Download Media',
					'On Demand Support',
					'Track upto 45,000 reels',
					'Access to Chrome Web Extension',
				],
				UncheckListMonth: [],
			},
		]);

	const [userTestimonial, setUserTestimonial] =
		useState([
			{
				id: 0,
				image:
					'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708843914/Testimonials/profile-neha.jpg',
				name: 'Neha Sharma',
				designation: 'CEO, Company',
				date: '1st Jan, 2024',
				description:
					'IGLoaded is affordable and feature-packed, what more could you ask for?',
			},
			{
				id: 1,
				name: 'Swastik Mehra',
				image:
					'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708844700/Testimonials/profile-4.jpg',
				designation: 'CEO, Company',
				date: '10th Jan, 2024',
				description:
					'IGLoaded helped me grow my brand and reach new audiences!',
			},
			{
				id: 2,
				name: 'Naman Khanna',
				image:
					'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708844660/Testimonials/240_F_422823992_ZtyrE96o6wGTJcyZolZ6pLRUGHBRCH9c_prx6ev.jpg',
				designation: 'CEO, Company',
				date: '12th Jan, 2024',
				description:
					'IGLoaded is a must-have tool for any IG memer!',
			},
			{
				id: 3,
				name: 'Ayesha Singh',
				image:
					'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708843932/Testimonials/profile-ayesha.jpg',
				designation: 'CEO, Company',
				date: '13th Feb, 2024',
				description:
					"IGLoaded is a lifesaver for tracking my storie's performance!",
			},
			{
				id: 4,
				name: 'Namanjyot Singh',
				image:
					'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708844561/Testimonials/profile-namanjyot.jpg',
				designation: 'CEO, Company',
				date: '10th Feb, 2024',
				description:
					'IGLoaded is affordable and feature-packed, what more could you ask for?',
			},
			{
				id: 5,
				name: 'Rajeev Desai',
				image:
					'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708844484/Testimonials/profile-rajeev.jpg',
				designation: 'CEO, Company',
				date: '08th Feb, 2024',
				description:
					"I hate complicated apps, but this one's a breeze! Everything's easy to understand and use, making it a joy to navigate.",
			},
			{
				id: 6,
				name: 'Sumit Kumar',
				image:
					'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708843960/Testimonials/profile-sumit.jpg',
				designation: 'CEO, Company',
				date: '21st Dec, 2023',
				description:
					"If you need a tool that's easy to use and affordable, IGLoaded is the one for you!",
			},
			{
				id: 7,
				name: 'Rahul Kashyap',
				image:
					'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708844366/Testimonials/profile-rahul.jpg',
				designation: 'CEO, Company',
				date: '18th Dec, 2023',
				description:
					'IGLoaded makes managing my social media presence a breeze!',
			},
			{
				id: 8,
				name: 'Emily Thomas',
				image:
					'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708843886/Testimonials/profile-emily.jpg',
				designation: 'CEO, Company',
				date: '30th Nov, 2023',
				description:
					'IGLoaded helped me stay ahead of the competition! Automate Posts Insights Tracking and much more!',
			},
			{
				id: 9,
				name: 'Pratham Mehra',
				image:
					'https://res.cloudinary.com/dgbqsbo7g/image/upload/v1708845790/Testimonials/profile-pratham.jpg',
				designation: 'CEO, Company',
				date: '19th Jan, 2024',
				description:
					'I can Literally Check the requests and followers count of my account. This one is great!',
			},
		]);

	// useEffect(() => {
	// 	const interval = setInterval(() => {
	// 		setUserTestimonial((testimonials) => [
	// 			...testimonials.slice(1),
	// 			testimonials[0],
	// 		]);
	// 	}, 5000); // Adjust the interval to match the duration of your animation

	// 	return () => clearInterval(interval);
	// }, []);

	const [isAnnually, setisAnnually] =
		useState(false);

	const handleActivatePlan = (
		id,
		price,
		planName
	) => {
		console.log(id, price, planName);
		if (Cookies.get('token') === undefined) {
			showMsg('Please Login to Continue', 'info');
			navigate('/login');
			return;
		}
		if (
			userData.planName != planName &&
			planName != 'Free'
		) {
			inititatePayment(id, price, planName);
		} else {
			showMsg(
				'Cannot change to Free Plan from Paid Plan!',
				'info'
			);
		}
	};

	return (
		<>
			<div className={styles.wrapper}>
				<Header />
				<div className={styles.imageBanner}>
					<img
						src={background}
						alt=''
					/>
				</div>
				<div className={styles.heroSection}>
					<h2>
						Simple Pricing for your <br />
						<span>Complex</span> Needs
					</h2>
					<p>
						Start for free, upgrade when you love it!
					</p>
					<div className={styles.toggleSwitchWrapper}>
						<p>Monthly</p>
						<label
							className={styles.switch}
							data-tooltip-id='checkBox'
						>
							<input
								type='checkbox'
								checked={isAnnually}

								// onChange={(e) => {
								// 	if (e.target.checked) {
								// 		setisAnnually(false);
								// 	} else {
								// 		setisAnnually(true);
								// 	}
								// }}
							/>
							<span className={styles.slider}></span>
						</label>
						<p>Annually</p>
					</div>
					<div className={styles.cardWrapper}>
						{subscriptionData.map((item) => {
							return (
								<div
									key={item.id}
									className={styles.card}
								>
									{item.tag && (
										<span className={styles.tag}>
											{item.tag}
										</span>
									)}
									<p className={styles.title}>
										{item.title}
									</p>
									<div className={styles.price}>
										<FaIndianRupeeSign />
										{!isAnnually ? (
											<AnimatedNumber
												className={styles.number}
												value={item.Monthprice}
												hasComma={true}
												duration={750}
												size={30}
											/>
										) : (
											<AnimatedNumber
												className={styles.number}
												value={item.Yearprice}
												hasComma={true}
												duration={750}
												size={30}
											/>
										)}
									</div>
									<p className={styles.description}>
										{item.description}
									</p>
									<div className={styles.listWrapper}>
										{!isAnnually ? (
											<>
												{item.ChecklistMonth.map(
													(listItem, index) => {
														return (
															<div
																key={index}
																className={styles.listItem}
															>
																<span>
																	<IoCheckmarkSharp />
																</span>
																<p title=''>{listItem}</p>
															</div>
														);
													}
												)}
											</>
										) : (
											<>
												{item.ChecklistYear.map(
													(listItem, index) => {
														return (
															<div
																key={index}
																className={styles.listItem}
															>
																<span>
																	<IoCheckmarkSharp />
																</span>
																<p>{listItem}</p>
															</div>
														);
													}
												)}
											</>
										)}

										{!isAnnually ? (
											<>
												{item.UncheckListMonth.map(
													(listItem, index) => {
														return (
															<div
																key={index}
																className={styles.listItem}
															>
																<span>
																	<RxCross2 />
																</span>
																<p>{listItem}</p>
															</div>
														);
													}
												)}
											</>
										) : (
											<>
												{item.UncheckListYear.map(
													(listItem, index) => {
														return (
															<div
																key={index}
																className={styles.listItem}
															>
																<span>
																	<RxCross2 />
																</span>
																<p>{listItem}</p>
															</div>
														);
													}
												)}
											</>
										)}
									</div>
									{userData.planName !== item.title ? (
										item.title !== 'Free' ? (
											<div
												className={styles.submit}
												onClick={() =>
													handleActivatePlan(
														item.id,
														item.Monthprice,
														item.title
													)
												}
											>
												Buy Plan
											</div>
										) : (
											<div
												className={styles.submit}
												onClick={() =>
													handleActivatePlan(1, 0, 'Free')
												}
											>
												Start Free
											</div>
										)
									) : (
										<div
											className={styles.usedPlan}
											onClick={() => {
												showMsg(
													'Already using this plan!',
													'info'
												);
											}}
										>
											Current Plan
										</div>
									)}
								</div>
							);
						})}
					</div>
					<div className={styles.note}>
						<p>
							<b>Note</b>: This price is exclusive of tax
							and gateway charges
						</p>
					</div>
				</div>
				<div className={styles.testimonialWrapper}>
					<div className={styles.testLeft}>
						<p>Testimonials</p>
						<h2>
							We believe in the <br /> power of community
						</h2>
						<p>
							We are a community of 100+ users and we are
							growing everyday. We are always open to
							feedbacks and suggestions. Some of the
							feedbacks you can see!
						</p>
					</div>
					<div className={styles.testRight}>
						<div className={styles.rightWrapper1}>
							{userTestimonial.map((item) => {
								return (
									<div
										key={item.id}
										className={styles.card1}
									>
										<div className={styles.userInfo}>
											<img
												src={item.image}
												alt=''
											/>
											<p>{item.name}</p>
										</div>
										<p>{item.description}</p>
										<p>{item.date}</p>
									</div>
								);
							})}
						</div>
						<div className={styles.rightWrapper2}>
							{userTestimonial.reverse().map((item) => {
								return (
									<div
										key={item.id}
										className={styles.card2}
									>
										<div className={styles.userInfo}>
											<img
												src={item.image}
												alt=''
											/>
											<p>{item.name}</p>
										</div>
										<p>{item.description}</p>
										<p>{item.date}</p>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className={styles.faqParentWrapper}>
					<div className={styles.bgImage}></div>
					<div className={styles.faqTitle}>
						<img
							src={faqImage}
							alt=''
						/>
						<h2>FAQs</h2>
						<p>Your Questions, Our Answers!</p>
					</div>
					<div className={styles.faqWrapper}>
						<Collapse
							items={items}
							size='large'
							defaultActiveKey={['1']}
						/>
					</div>
				</div>
				<div className={styles.startNowParentWrapper}>
					<div className={styles.startNowWrapper}>
						<h2>
							Let's get started on something great!
						</h2>
						<p>
							Subscribe to any of the above plans and
							start using IGLOADED.
						</p>
						<div
							className={styles.submitbtn}
							onClick={() => navigate('/login')}
						>
							Get started
						</div>
					</div>
				</div>
			</div>
			<Tooltip
				id='checkBox'
				content={'Launching Annual Plans Soon!'}
				place='top'
				style={{
					backgroundColor: 'white',
					color: 'black',
					fontSize: '1rem',
					fontWeight: '500',
				}}
			/>
			<Footer />
		</>
	);
};

export default Subscribe;
